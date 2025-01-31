import { Box, Flex, Image } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";


const  QRcodeHeader= () => {
    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate("/");
    };
  
    return (
      <Box as="header" bg="#D9D9D9" color="black" px={20} py={4}>
        <Flex justify="space-between" align="center">
          <Button
            bg="green"
            color="white"
            size="sm"
            borderRadius="50%"
            width="40px"
            height="40px"
            onClick={handleBack}
            _hover={{ bg: "darkgreen" }}
          >
            ←
          </Button>
          <Flex justify="center" flex="1">
            <Image src="/logo.jpeg" alt="Logo" boxSize="50px" />
          </Flex>
        </Flex>
      </Box>
    );
  };

  export default QRcodeHeader