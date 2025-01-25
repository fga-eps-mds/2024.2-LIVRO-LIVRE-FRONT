
import { NavBar } from '../../components/NavBar';
import { Box } from "@chakra-ui/react";
import QRcodeHeader from './QRcodeHeader';
import QRcodeCamera from './QRcodeCamera';



function QRcode() {


  return (
    <Box>
        <QRcodeHeader />
        <QRcodeCamera/>
    s
     <NavBar />
    </Box>
  );
}

export default QRcode;
