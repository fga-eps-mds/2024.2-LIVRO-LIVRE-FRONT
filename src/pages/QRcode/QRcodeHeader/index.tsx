import { Box, Flex, Image } from "@chakra-ui/react";


const  QRcodeHeader= () => {

    
  
    return (
      <Box as="header" bg="#D9D9D9" color="black" px={20} py={4}>
        <Flex  align="left">
          <Flex justify="center" flex="1">
            <Image src="/logo.jpeg" alt="Logo" boxSize="50px" />
          </Flex>
        </Flex>
      </Box>

      
    );
  };

  export default QRcodeHeader