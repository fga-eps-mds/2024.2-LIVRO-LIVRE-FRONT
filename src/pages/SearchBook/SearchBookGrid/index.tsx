import { Separator, Text, Grid, Image, Heading, Container, Stack, Box } from '@chakra-ui/react';
import { Rating } from "../../../components/ui/rating"
import { useEffect, useState } from 'react';
import SearchBookPagination from '../SearchBookPagination';

//~ dados ficticios
const initialBooks = Array.from({ length: 48 }, (_, i) => ({  //~ array com tipo uma struct com os dados dos livros ue serão puxados do back end
    id: i,
    titulo: `Título do Livro ${i + 1}`,
    autor: `Autor ${i + 1}`,
    rating: Math.random() * 5,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}));

interface Book {
    id: number;
    titulo: string;
    autor: string;
    rating: number;
    imageUrl: string;
}

function SearchBookGrid() {
    //~ use State dos livros para manipular 
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = 20; // Número de itens por página
    const totalItems = initialBooks.length; // Total de itens (mock ou do back)
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        //~ Função para ordenar livros pelo rating
        const sortedBooks = [...initialBooks].sort((a, b) => b.rating - a.rating);
        setBooks(sortedBooks);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedBooks = initialBooks.slice(startIndex, endIndex);
        setBooks(paginatedBooks);
    }, [currentPage]); //~ Executa apenas uma vez ao carregar

    return (
        <Stack gap={3}>
            <Separator />
            <Box maxHeight={'520px'} overflowY={'scroll'}>
                <Grid templateColumns={"repeat(2, 1fr)"}
                    gap={'4'} alignItems={'center'}>
                    {books.map((book) => (   //~ renderiza um container por cada item do array books e usa os dados de cada item 
                        <Container key={book.id} //^ chave única para o react renderizar os conteudos e não dar warning 
                            width={'150px'} bg={'gray.100'} p={'10px'} shadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
                            borderRadius={'4px'} justifySelf={'center'} height={'260px'}>
                            <Image
                                src={book.imageUrl}
                                alt={"Capa do Livro " + book.titulo}
                            />
                            <Heading size={'lg'} mt={'2'} >{book.titulo}</Heading>
                            <Text textStyle={'sm'}>{book.autor}</Text>
                            <Rating readOnly allowHalf defaultValue={book.rating} size={'xs'} colorPalette={'yellow'} />
                        </Container>
                    ))}

                </Grid>
            </Box>

            <SearchBookPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </Stack>
    );
}

export default SearchBookGrid

