import { Box, Center, Stack } from '@chakra-ui/react';
import SignInForm from './SignInForm';
import SignUpButton from './SignUpButton';
import SignInHeader from './SignInHeader';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

function SignIn() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/inicio');
  }, [isAuthenticated])

  return (
    <Box padding='40px'>
      <Center>
        <Stack gap={'40px'}>
          <SignInHeader />
          <SignInForm />
          <SignUpButton />
        </Stack>
      </Center>
    </Box>
  );
}

export default SignIn
