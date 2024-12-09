import { Link } from 'react-router';
import { Center, Link as ChakraLink, Separator, Stack, Text } from '@chakra-ui/react';

function LoginButton() {
  return (
    <Center width={'100%'}>
      <Stack gap={'25px'} width={'100%'}>
        <Separator />
        <Text
          textAlign={'center'}
          color={'blue.100'}
        >
          Já possui uma conta? <ChakraLink color={'green.100'}><Link to='/login'>Faça login aqui</Link></ChakraLink>
        </Text>
      </Stack>
    </Center>
  );
}

export default LoginButton
