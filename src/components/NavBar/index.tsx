import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { Button } from '../ui/button';
import { BsHouse, BsBell, BsBook, BsPerson } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router';
import { CiSearch } from 'react-icons/ci';

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedTab = location.pathname.replace('/', '');
  const tabs = [
    { label: 'Início', value: 'inicio', icon: <BsHouse /> },
    { label: 'Empréstimos', value: 'emprestimos', icon: <BsBook /> },
    { label: 'Procurar Livros', value: 'pesquisar-livro', icon: <CiSearch /> },
    { label: 'Avisos', value: 'avisos', icon: <BsBell /> },
    { label: 'Perfil', value: 'perfil', icon: <BsPerson /> },
  ];

  return (
    <Box position="fixed" overflowX="auto" width="100%" bottom="0" boxShadow="2xl">
      <Center>
        <Flex width={'100%'} justifyContent={'space-between'} padding={'20px'}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant="plain"
              onClick={() => navigate('/' + tab.value)}
              color={selectedTab === tab.value ? 'blue.100' : ''}
            >
              <Stack align="center">
                {tab.icon}
                <Text textAlign="center">{tab.label}</Text>
              </Stack>
            </Button>
          ))}
        </Flex>
      </Center>
    </Box>
  );
};
