import { HStack, Separator, Center } from '@chakra-ui/react';
import { 
    PaginationItems,
    PaginationNextTrigger, 
    PaginationPrevTrigger, 
    PaginationRoot
 } from '../../../components/ui/pagination';

interface SearchBookPaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void; // Função para atualizar a página
}

function SearchBookPagination({ currentPage, totalPages, handlePageChange }: SearchBookPaginationProps) {
    return (
        <Center>
            <PaginationRoot
                page={currentPage}
                count={totalPages}
                pageSize={1}
                onPageChange={(e) => handlePageChange(e.page)}
            >
                <Separator mb={'10px'} />
                <HStack>
                    <PaginationPrevTrigger     />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </Center>
    );
}

export default SearchBookPagination;
