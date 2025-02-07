import { NavBar } from '../../components/NavBar';
import { Box } from "@chakra-ui/react";
import QRcodeHeader from './QRcodeHeader';
import QRcodeCamera from './QRcodeCamera';
import BackButton from './backbutton';



function QRcode() {


  return (
    <Box>
        <QRcodeHeader />
        <BackButton />
        <QRcodeCamera/>
        
     <NavBar />
    </Box>
  );
}

export default QRcode;
