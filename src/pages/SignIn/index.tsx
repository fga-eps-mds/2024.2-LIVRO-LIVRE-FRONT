import { Box, Center, Stack } from '@chakra-ui/react';
import SignInForm from './SignInForm';
import SignUpButton from './SignUpButton';
import SignInHeader from './SignInHeader';

function SignIn() {
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
