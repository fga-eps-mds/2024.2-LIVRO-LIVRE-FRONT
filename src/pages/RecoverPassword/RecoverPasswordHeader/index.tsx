import { Stack, Text } from '@chakra-ui/react';

function RecoverPasswordHeader() {
  return (
    <Stack gap={'5px'}>
      <Text textStyle={'3xl'} fontWeight={'semibold'} color={'blue.100'}>Recuperação de Senha</Text>
      <Text color={'blue.100'}>Para recuperar o acesso a sua conta, vamos enviar um código para seu e-mail.</Text>
    </Stack>
  );
}

export default RecoverPasswordHeader
