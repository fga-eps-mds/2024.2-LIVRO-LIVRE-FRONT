import { Box,Image } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
      <Box position="absolute" top={4} left={4}>
        <Button
          bg="green"
          color="white"
          size="sm"
          borderRadius="50%"
          width="50px"
          height="50px"
          onClick={handleBack}
          _hover={{ bg: "darkgreen" }}
        >
          <Box as="span">
            <Image src="/botao-voltar.png" boxSize="20px" alt="Voltar" />
          </Box>
        </Button>
      </Box>
    
  );
};

export default BackButton ;
