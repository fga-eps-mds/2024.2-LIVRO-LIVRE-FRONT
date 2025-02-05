
import { Separator, Text, Grid, Image, Heading, Container, Stack, Box } from '@chakra-ui/react';
import { Rating } from "../../../components/ui/rating"
import { useEffect, useState } from 'react';
import SearchBookPagination from '../SearchBookPagination';
import SearchBookForm from '../SearchBookForm';
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogActionTrigger }
    from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

//~ dados ficticios
const initialBooks = Array.from({ length: 110 }, (_, i) => ({  
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
    const [books, setBooks] = useState<Book[]>([]); // Livros exibidos na página atual
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const itemsPerPage = 20; // Número de itens por página

    const [filteredBooks, setFilteredBooks] = useState<Book[]>(initialBooks); // Livros filtrados
    const [searchQuery, setSearchQuery] = useState(''); // Texto de pesquisa

    const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controle do popup


    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage); // Total de páginas com base nos livros filtrados

    // Atualizar a lista de livros exibidos quando a página ou os livros filtrados mudarem
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setBooks(filteredBooks.slice(startIndex, endIndex));

    }, [currentPage, filteredBooks]);

    // Atualizar os livros filtrados quando a pesquisa muda
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = initialBooks.filter(
            book =>
                book.titulo.toLowerCase().includes(lowerCaseQuery) ||
                book.autor.toLowerCase().includes(lowerCaseQuery)
        );
        filteredBooks.sort((a, b) =>
            b.rating - a.rating || a.autor.localeCompare(b.autor)
        );
        setFilteredBooks(filtered);
        setCurrentPage(1); // Voltar para a primeira página ao filtrar
        if (filtered.length === 0) setIsDialogOpen(true);
    }, [searchQuery]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setFilteredBooks(initialBooks); // Restaura os livros para o estado inicial
        setSearchQuery(''); // Limpa o campo de pesquisa
    };

    return (
        <>
            <Stack gap={3} maxHeight={'55vh'}>
                <SearchBookForm handlePageChange={handleSearchChange} />
                <Separator />
                <Box overflowY={'scroll'}> 
                    <Grid
                        templateColumns={{ base: "repeat(2, 1fr)", lg: 'repeat(3, 1fr)' }}
                        gap={'4'} alignItems={'center'}>
                        {books.map((book) => (
                            <Container
                                key={book.id}
                                width={{ base: '150px', lg: '200px' }}
                                bg={'gray.100'}
                                p={'10px'}
                                shadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
                                borderRadius={'4px'}
                                justifySelf={'center'}
                                height={{ base: '210px', lg: '250px' }}>
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

            <DialogRoot
                onOpenChange={closeDialog}
                open={isDialogOpen}
                closeOnInteractOutside={false}
                placement={"center"}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nenhum Livro Encontrado</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Text>
                            Nenhum livro encontrado para a pesquisa realizada. Tente outros termos.
                        </Text>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={closeDialog}>OK</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>

        </>
    );
}

export default SearchBookGrid;
