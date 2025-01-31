
import { NavBar } from '../../components/NavBar';
import { Box } from "@chakra-ui/react";
import QRcodeHeader from './QRcodeHeader';
import QRcodeCamera from './QRcodeCamera';



function QRcode() {


  return (
    <Box>
        <QRcodeHeader />
        <QRcodeCamera/>
        
     <NavBar />
    </Box>
  );
}

export default QRcode;
