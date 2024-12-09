import { Stack, Text } from '@chakra-ui/react';

function RecoverPasswordHeader() {
  return (
    <Stack gap={'5px'}>
      <Text textStyle={'3xl'} fontWeight={'semibold'} color={'blue.100'}>Nova senha</Text>
      <Text color={'blue.100'}>Deseja criar uma nova senha? Insira sua senha e confirme-a.</Text>
    </Stack>
  );
}

export default RecoverPasswordHeader
