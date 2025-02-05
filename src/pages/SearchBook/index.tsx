import { Box, Center, Stack } from '@chakra-ui/react';
import SearchBookHeader from './SearchBookHeader';
import SearchBookGrid from './SearchBookGrid';
import { NavBar } from '../../components/NavBar';

function SearchBook() {

    return (
        <Box padding='40px'>
            <Center>
                <Stack gap={'40px'} width={{base:'400px', lg:'700px'}}>
                    <SearchBookHeader />
                    <SearchBookGrid />
                </Stack>
                <NavBar />
            </Center>
        </Box>
    );
}

export default SearchBook