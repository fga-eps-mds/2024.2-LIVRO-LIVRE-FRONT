import { Box, Center, Stack } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';
import LoginButton from './LoginButton';
import SignUpHeader from './SignUpHeader';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/inicio');
  }, [isAuthenticated])

  return (
    <Box padding='40px'>
      <Center>
        <Stack gap={'40px'}>
          <SignUpHeader />
          <SignUpForm />
          <LoginButton />
        </Stack>
      </Center>
    </Box>
  );
}

export default SignUp
