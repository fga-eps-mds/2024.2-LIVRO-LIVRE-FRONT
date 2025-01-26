import React, { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import QRCodeReader from "../../../components/ui/QRcodeReader"
const QRcodeCamera: React.FC = () => {
  const [qrResult, setQrResult] = useState<string>("");

  const handleQRResult = (result: string) => {
    setQrResult(result);
  };

  return (
    <Box textAlign="center" p={5} bg="gray.100" minH="100vh">
      <VStack gap={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Leitor de QR Code
        </Text>
        <center> 
        <QRCodeReader onResult={handleQRResult} />
        </center>
        <Text fontSize="2x1" fontWeight="bold" >
          Aponte a câmera para o QR Code do livro para acessá-lo.
        </Text>
        {qrResult && (
          <Text fontSize="lg" color="green.500" fontWeight="bold">
            Resultado: {qrResult}
          </Text>
          
        )}
      </VStack>
    </Box>
  );
};

export default QRcodeCamera;
