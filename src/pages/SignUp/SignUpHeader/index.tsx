import { Stack, Text } from '@chakra-ui/react';

function SignUpHeader() {
  return (
    <Stack gap={'5px'}>
      <Text textStyle={'3xl'} fontWeight={'semibold'} color={'blue.100'}>Cadastre-se</Text>
      <Text color={'blue.100'}>Insira seus dados para fazer parte e começar a utilizar o Livro Livre</Text>
    </Stack>
  );
}

export default SignUpHeader
