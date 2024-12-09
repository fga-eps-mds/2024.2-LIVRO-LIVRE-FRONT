import { Box, Center, Stack } from '@chakra-ui/react';
import RecoverPasswordForm from './RecoverPasswordForm';
import RecoverPasswordHeader from './RecoverPasswordHeader';

function RecoverPassword() {
  return (
    <Box padding='40px'>
      <Center>
        <Stack gap={'40px'}>
          <RecoverPasswordHeader />
          <RecoverPasswordForm />
        </Stack>
      </Center>
    </Box>
  );
}

export default RecoverPassword
