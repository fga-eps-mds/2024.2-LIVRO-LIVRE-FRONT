import { Box, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

function QRbutton() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/qrcode');
  };

  return (
    <Box position="absolute" top="10px" right="10px">
      <Button
        aria-label="Ir para Leitor de QR Code"
        onClick={handleRedirect}
        size="sm"
        variant="outline"
        colorScheme="blue"
        borderRadius="full"
        bg="Green"
      >
        <Image src="/qrcode.jpeg" boxSize="20px" alt="QR Code" />
      </Button>
    </Box>
  );
}

export default QRbutton;
