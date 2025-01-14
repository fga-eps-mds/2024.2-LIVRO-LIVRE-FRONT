import { Box, Center, Stack } from '@chakra-ui/react';
import ProfileEditForm from './ProfileEditForm';
import ProfileEditHeader from '../NotFound/ProfileEditHeader';

function ProfileEdit() {
  return (
    <Box padding='40px'>
      <Center>
        <Stack gap={'40px'} width='100%'>
          <ProfileEditHeader />
          <ProfileEditForm />
        </Stack>
      </Center>
    </Box>
  );
}

export default ProfileEdit
