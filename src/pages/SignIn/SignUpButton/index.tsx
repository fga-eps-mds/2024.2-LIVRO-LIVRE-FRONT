import { Link } from 'react-router';
import { Center, Link as ChakraLink, Separator, Stack, Text } from '@chakra-ui/react';

function SignUpButton() {
  return (
    <Center width={'100%'}>
      <Stack gap={'25px'} width={'100%'}>
        <Separator />
        <Text
          textAlign={'center'}
          color={'blue.100'}
        >
          Criar conta <ChakraLink color={'green.100'}><Link to='/cadastro'>Faça seu cadastro aqui</Link></ChakraLink>
        </Text>
      </Stack>
    </Center>
  );
}

export default SignUpButton
