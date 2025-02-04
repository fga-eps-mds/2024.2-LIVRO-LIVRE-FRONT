import { Box } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';
import QRbutton  from './QRcodeButton'

function Home() {

  return (
    <Box>
      <NavBar />
      <QRbutton />
    </Box>
  );
}

export default Home;
