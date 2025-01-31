import { Box, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { NavBar } from '../../components/NavBar';

function Home() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/qrcode');
  };

  return (
    <Box position="relative">
      <NavBar />
      <Box position="absolute" top="16px" right="16px">
        <Button
          aria-label="Ir para Leitor de QR Code"
          onClick={handleRedirect}
          size="sm"
          variant="outline"
          colorScheme="blue"
          borderRadius="full" 
        >
          <Box as="span" >
            <Image src="/qrcode.jpeg" boxSize="20px" alt="QR Code" />
          </Box>
      
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
