import { Box, Center, Stack } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';
import LoginButton from './LoginButton';
import SignUpHeader from './SignUpHeader';

function SignUp() {
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
