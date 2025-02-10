import { Box } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';
import QRbutton  from './QRcodeButton'
import BookList from './MostrarLivros';
import HomeHeader from './HomeHeader';

function Home() {

  return (
    <Box>
      <HomeHeader />
      <QRbutton />
      <BookList />
      <NavBar />
    </Box>
  );
}

export default Home;
