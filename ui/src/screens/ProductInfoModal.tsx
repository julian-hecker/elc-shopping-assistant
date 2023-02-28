import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';

import { Screen, Text, View } from '../components/Themed';
import { useSpeech, usetGetDocFromHTML } from '../hooks';
import { RootStackScreenProps } from '../types';

function getDataFromDocument(doc: Document) {
  const title = doc.querySelector('.product-details h4')?.textContent;
  const desc = doc.querySelector(
    '.product-meta-data .product-text',
  )?.textContent;
  const attrs = Array.from(
    doc.querySelector('#product-attributes')?.children ?? [],
  )?.map((li) => li.textContent);
  // also add a link to corresponding page
  const image = (
    doc.querySelector('#largeProductImage img') as HTMLImageElement
  )?.src;

  if (title || desc || image) return { title, desc, image, attrs };
}

export function ProductInfoModal({
  navigation,
  route,
}: RootStackScreenProps<'Product Info'>) {
  const { barcode, type } = route.params;
  const { speak } = useSpeech();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const { getDocFromHTML } = usetGetDocFromHTML();

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    navigation.setOptions({ title: 'Loading Product...' });
    (async () => {
      let result = '';
      try {
        const html = await fetch(
          `https://www.barcodelookup.com/${barcode}`,
        ).then((res) => res.text());
        const doc = getDocFromHTML(html);
        const data = getDataFromDocument(doc);
        if (!data?.title) return (result = 'Product Not Found');
        setData(data);
        result = data.title;
      } catch (err) {
        console.error(err);
        result = 'Product Lookup Failed';
      } finally {
        navigation.setOptions({ title: result });
        setIsLoading(false);
        speak(result);
      }
    })();
  }, [barcode]);

  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (!data) return <Text>Product Not Found</Text>;

  return (
    <Screen scrolling style={styles.screen}>
      {data?.title ? <Text>{data.title}</Text> : null}
      {data?.desc ? <Text>{data.desc}</Text> : null}
      {data?.image ? (
        <Image
          source={{ uri: data.image }}
          style={{
            width: '100%',
            minHeight: 300,
            marginVertical: 16,
          }}
          resizeMode="contain"
        />
      ) : null}
      {data.attrs
        ? data.attrs.map((attr: string) => (
            <Text key={attr}>• {attr}</Text>
          ))
        : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
  },
});
