import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { Box, Button, VStack, Text } from "@chakra-ui/react";

interface QRCodeReaderProps {
  onResult: (result: string) => void;
}



const QRCodeReader: React.FC<QRCodeReaderProps> = ({ onResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const qrCodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

    const requestCameraPermission = async (): Promise<boolean> => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Permissão da câmera concedida.");
        return true;
      } catch (err) {
        console.error("Permissão da câmera negada:", err);
        setError("Permissão da câmera foi negada.");
        return false;
      }
    };

  const startScanner = async () => {
    try {
      requestCameraPermission();
      setIsScanning(true);
      setError(null); 

      const hasCamera = await Html5Qrcode.getCameras();
      if (hasCamera.length === 0) {
        throw new Error("Nenhuma câmera foi encontrada no dispositivo.");
      }

      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 60,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scanner.render(
        (decodedText: string) => {
          console.log("Código lido:", decodedText);
          onResult(decodedText); 
      
          
          if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
            window.location.href = decodedText; 
          } else {
            console.warn("Texto lido não é um link válido:", decodedText);
          }
      
          scanner.clear(); 
          setIsScanning(false); 
        },
        (scanError) => {
          console.warn("Erro ao escanear QR Code:", scanError);
        }
      );
      
      qrCodeScannerRef.current = scanner;
    } catch (err) {
      setError(
        "Erro ao acessar a câmera. Verifique se as permissões foram concedidas."
      );
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (qrCodeScannerRef.current) {
      qrCodeScannerRef.current.clear();
      qrCodeScannerRef.current = null;
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => stopScanner(); 
  }, []);

  return (
    <VStack gap={4} align="center">
      <Box 
  id="reader"
  display={isScanning ? "block" : "none"}
  border="2px solid green"
  borderRadius="lg"
  width="300px"
  height="300px"
  boxShadow="lg"
  mx="auto"
></Box>

      {!isScanning ? (
        <Button 
        bg="#FF8800"
        colorScheme="#FF8800" 
        onClick={startScanner}
        >
          Iniciar Leitura
        </Button>
      ) : (
        <Button 
        bg="#FF8800"
        colorScheme="#FF8800" 
        onClick={stopScanner}>
          Parar Leitura

        </Button>
      )}
      {error && (
        <Text color="red.500" fontWeight="bold">
          {error}
        </Text>
      )}
    </VStack>
  );
};

export default QRCodeReader;
