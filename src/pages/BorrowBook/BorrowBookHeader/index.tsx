import { Box, Flex, Image } from '@chakra-ui/react';

const BorrowBookHeader = () => (
  <Box>
    <Box as="header" bg="#D9D9D9" color="black" px={20} py={4}>
      <Flex justify="center" align="center">
        <Image src="/logo.jpeg" alt="Logo" boxSize="50px" />
      </Flex>
    </Box>
  </Box>
);

export default BorrowBookHeader;
