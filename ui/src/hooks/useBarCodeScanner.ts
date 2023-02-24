import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';

export function useBarCodeScanner() {
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } =
        await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  return { scanned, setScanned, hasPermission };
}
