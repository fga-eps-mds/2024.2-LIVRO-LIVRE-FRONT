import { Box, Center, Stack } from '@chakra-ui/react';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePasswordHeader from './ChangePasswordHeader';

function ChangePassword() {
  return (
    <Box padding='40px'>
      <Center>
        <Stack gap={'40px'}>
          <ChangePasswordHeader />
          <ChangePasswordForm />
        </Stack>
      </Center>
    </Box>
  );
}

export default ChangePassword
