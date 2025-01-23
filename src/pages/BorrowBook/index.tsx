import { Box, Grid } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';
import BorrowBookHeader from './BorrowBookHeader';
import BorrowBookLivro from './BorrowBookLivro';
import BorrowButton from './BorrowButton';

const book = {
  title: "Curupira, O guardião da floresta",
  author: "Saci-Pererê",
  rating: 4.5,
  description: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum.",
  coverImage: "/logo.png",
  status: "Available"
};

function BorrowBook() {
  return (
    <Box>
      <BorrowBookHeader />
      <Grid
        templateColumns="1fr"
        gap={8}
        justifyItems="center"
        alignItems="center"
        p={4}
      >
        <BorrowBookLivro book={book}/>
        <BorrowButton book={book}/>
      </Grid>
     <NavBar />
    </Box>
  );
}

export default BorrowBook;
