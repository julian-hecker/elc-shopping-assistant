import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import {
  BarCodeScannedCallback,
  Constants,
} from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useBarCodeScanner, useSound, useSpeech } from '../../hooks';
import { Text, View } from '../Themed';

const useTensorflowModel = <Model,>(
  loadModel?: () => Promise<Model>,
) => {
  const [model, setModel] = useState<Model>();
  const [backend, setBackend] = useState<string>();
  useEffect(() => {
    const initTf = async () => {
      await tf.ready();
      setModel(await loadModel?.());
      setBackend(tf.getBackend());
    };
    initTf();
  }, []);
  return { backend, model };
};

const TensorCamera = cameraWithTensors(Camera);

export const Scanner = () => {
  const { scanned, setScanned, hasPermission } = useBarCodeScanner();
  const { speak } = useSpeech();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const { playSound: playConfirm } = useSound(
    require('../../assets/audio/beep.mp3'),
  );
  const { backend, model } = useTensorflowModel(() =>
    mobilenet.load({ version: 2, alpha: 1.0 }),
  );
  const [prediction, setPrediction] = useState<string>('');

  const barCodeTypes = [
    Constants.BarCodeType.ean13,
    Constants.BarCodeType.ean8,
    Constants.BarCodeType.upc_a,
    Constants.BarCodeType.upc_e,
    Constants.BarCodeType.upc_ean,
    Constants.BarCodeType.qr,
  ];

  useEffect(() => {
    speak(prediction);
  }, [prediction]);

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    data,
    type,
  }) => {
    setTimeout(() => setScanned(false), 5000);
    setScanned(true);
    if (!barCodeTypes.filter((item) => !!item).includes(type)) return;
    playConfirm();
    navigation.push('Product Info', { barcode: data, type });
  };

  const handleCameraStream = (
    images: IterableIterator<tf.Tensor3D>,
  ) => {
    let frame = 0;
    const loop = async (): Promise<void> => {
      await (async () => {
        if (!backend || !model) return;
        const image = images.next().value;
        if (!image) return;
        frame++;
        if (frame % 60 !== 0) return;

        const predictions = await model.classify(image);
        const topPredictions = predictions
          .sort(({ probability: a }, { probability: b }) => b - a)
          .filter(({ probability }) => probability > 0.5);
        const prediction = topPredictions?.[0];

        console.log(prediction, predictions);

        !!prediction && setPrediction(prediction.className);

        tf.dispose([image]);
      })();
      requestAnimationFrame(loop);
    };
    loop();
  };

  if (
    hasPermission === null ||
    hasPermission === false ||
    !isFocused ||
    !backend
  ) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <TensorCamera
        barCodeScannerSettings={{
          barCodeTypes,
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
        onCameraReady={undefined}
        // tensor camera props
        cameraTextureWidth={1080}
        cameraTextureHeight={1920}
        resizeWidth={200}
        resizeHeight={150}
        resizeDepth={3}
        autorender={true}
        useCustomShadersToResize={false}
        onReady={handleCameraStream}
      />
      <Text style={{ textAlign: 'center', margin: 10 }}>
        {prediction}
      </Text>
    </View>
  );
};

/**
 * === Resources ===
 * https://www.bam.tech/article/how-to-recognize-real-time-object-in-reactnative-for-dummies
 * https://dev.to/josethz00/introduction-to-text-to-speech-and-speech-recognition-using-react-native-3oi
 * https://github.com/tensorflow/tfjs
 * https://github.com/tensorflow/tfjs-models
 */
