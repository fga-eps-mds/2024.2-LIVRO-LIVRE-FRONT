import { Box, Center, Text, Stack } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';
import DeleteProfileDialog from './DeleteProfileDialog';
import { useAuth } from '../../hooks/useAuth';

function Profile() {
  
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <Box>
      <Box padding='40px' width='100%'>
        <Center>
          <Stack gap='40px' width='100%'>
            <Text textStyle='3xl' fontWeight='semibold' color='blue.100'>Perfil</Text>
            <Stack>
              <Button
                type="submit"
                width={'100%'}
                size={'2xl'}
                bg={'green.100'}
                fontWeight={'semibold'}
                onClick={() => navigate('/perfil/editar')}
              >
                Editar conta
              </Button>
              <DeleteProfileDialog />
              <Button
                type="submit"
                width={'100%'}
                size={'2xl'}
                bg={'red.100'}
                fontWeight={'semibold'}
                onClick={() => {
                  signOut();
                  navigate('/login');
                }}
              >
                Sair
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Box>
      
      <NavBar />
    </Box>
  );
}

export default Profile
