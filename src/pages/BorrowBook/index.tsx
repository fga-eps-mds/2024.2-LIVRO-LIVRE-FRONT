import { Box, Button, Heading, Flex, Image } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';


function BorrowBook() {
  return (
    <Box>
      <Box as="header" bg="#D9D9D9" color="black" px={8} py={10}>
        <Flex justify="space-between" align="center"></Flex>
        <Flex justify="center" align="center" h="100%">
        <Image src="/logo.png" alt="Logo" boxSize="100px" />
        </Flex>

       


      </Box>




      <NavBar />
    </Box>
  );
}

export default BorrowBook;
