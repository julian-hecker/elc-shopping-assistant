import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  BarCodeScannedCallback,
  Constants,
} from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useBarCodeScanner, useSound } from '../../hooks';
import { View } from '../Themed';

export const Scanner = () => {
  const { scanned, setScanned, hasPermission } = useBarCodeScanner();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const { playSound: playConfirm } = useSound(
    require('../../assets/audio/beep.mp3'),
  );

  const barCodeTypes = [
    Constants.BarCodeType.ean13,
    Constants.BarCodeType.ean8,
    Constants.BarCodeType.upc_a,
    Constants.BarCodeType.upc_e,
    Constants.BarCodeType.upc_ean,
    Constants.BarCodeType.qr,
  ];

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

  if (
    hasPermission === null ||
    hasPermission === false ||
    !isFocused
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
    <Camera
      barCodeScannerSettings={{
        barCodeTypes,
      }}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

/**
 * === Resources ===
 * https://www.bam.tech/article/how-to-recognize-real-time-object-in-reactnative-for-dummies
 * https://dev.to/josethz00/introduction-to-text-to-speech-and-speech-recognition-using-react-native-3oi
 * https://github.com/tensorflow/tfjs
 * https://github.com/tensorflow/tfjs-models
 */
