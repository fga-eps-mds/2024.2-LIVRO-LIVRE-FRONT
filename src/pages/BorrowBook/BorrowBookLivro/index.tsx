import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Rating } from "../../../components/ui/rating";

interface Book {
  title: string;
  author: string;
  rating: number;
  description: string;
  coverImage: string;
}

const BorrowBookLivro = ({ book }: { book: Book }) => (
  <Box maxW="100%" p={4}>
    <Flex justify="center" align="center" mb={8}>
      <Image 
        src={book.coverImage} 
        alt={`Capa do livro ${book.title}`} 
        boxSize="150px" 
        objectFit="cover" 
        mr={8} 
      />
      <Box maxW="400px">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>{`Título: ${book.title}`}</Text>
        <Text fontSize="lg" mb={4}><strong>Autor:</strong> {book.author}</Text>
        
        
        <Box mt={4}>
          <Text fontSize="lp" fontWeight="bold" mb={2}>Avaliação:</Text>
          <Rating 
            readOnly allowHalf defaultValue={book.rating} size={'xs'} colorPalette={'yellow'} 
          />
        </Box>
      </Box>
    </Flex>

    <Flex px={8} py={2}>
      <Box maxW="400px">
        <Text fontSize="md">
          <strong>Descrição:</strong> {book.description}
        </Text>
      </Box>
    </Flex>
  </Box>
);

export default BorrowBookLivro;
