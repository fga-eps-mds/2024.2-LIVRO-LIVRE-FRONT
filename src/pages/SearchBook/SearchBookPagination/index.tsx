import { HStack, Separator } from '@chakra-ui/react';
import { 
    PaginationItems,
    PaginationNextTrigger, 
    PaginationPrevTrigger, 
    PaginationRoot
 } from '../../../components/ui/pagination';



function SearchBookPagination() {
    return (
        <PaginationRoot count={20} pageSize={2} defaultPage={1}>
            <Separator />
            <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
            </HStack>
        </PaginationRoot>
    );
}

export default SearchBookPagination
