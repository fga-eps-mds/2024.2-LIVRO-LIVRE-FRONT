import { useState, useEffect } from "react";
import { Box, Grid, Button, Image, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  description: string;
  coverImage: string;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>("http://localhost:3001/books");
        setBooks(response.data);
      } catch (err) {
        setError("Erro ao buscar os livros.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!books.length) return <p>Nenhum livro encontrado.</p>;

  return (
    <Box p={4}>
      <Grid templateColumns="1fr" gap={6} justifyItems="center"> 
        {books.map((book) => (
          <VStack key={book.id} gap={3} align="center">
            <Image 
              src={book.coverImage} 
              alt={`Capa do livro ${book.title}`} 
              boxSize="200px" 
              objectFit="cover" 
              borderRadius="md"
            />
            <Text fontSize="lg" fontWeight="bold">{book.title}</Text>
            <Button
              onClick={() => navigate(`/pegaremprestado/${book.id}`)}
              bg="#FF8800"
              colorScheme="blue"
              size="md"
            >
              Ver Livro
            </Button>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
}

export default BookList;
