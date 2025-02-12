import { Flex, Stack, Text } from '@chakra-ui/react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useNavigate } from 'react-router';

function SignUpHeader() {
  const navigate = useNavigate();
  return (
    <Stack gap='20px'>
      <Flex align='center' onClick={() => navigate('/perfil')}>
        <BsArrowLeftShort size={20}/>
        <Text textStyle='md'>Voltar</Text>
      </Flex>
      <Text textStyle={'3xl'} fontWeight={'semibold'} color={'blue.100'}>Editar perfil</Text>
    </Stack>
  );
}

export default SignUpHeader
