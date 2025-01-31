import { useState, useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar';
import BorrowBookHeader from './BorrowBookHeader';
import BorrowBookLivro from './BorrowBookLivro';
import BorrowButton from './BorrowButton';
import { useParams } from 'react-router';
import axios from 'axios';

function BorrowBook() {
  const { id } = useParams<{ id: string }>(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError('Erro ao buscar o livro.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Livro não encontrado.</p>;

  return (
    <Box>
      <BorrowBookHeader />
      <Grid templateColumns="1fr" gap={8} justifyItems="center" alignItems="center" p={4}>
        <BorrowBookLivro book={book} />
        <BorrowButton book={book} />
      </Grid>
      <NavBar />
    </Box>
  );
}

export default BorrowBook;
