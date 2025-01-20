import { Box, Center, Stack } from '@chakra-ui/react';

import SearchBookHeader from './SearchBookHeader';
import SearchBookForm from './SearchBookForm';
import SearchBookGrid from './SearchBookGrid';
import SearchBookPagination from './SearchBookPagination';
import { NavBar } from '../../components/NavBar';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function SearchBook() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate('/inicio');
    }, [isAuthenticated])

    return (
        <Box padding='40px'>
            <Center>
                <Stack gap={'40px'}>
                    <SearchBookHeader />
                    <SearchBookForm />
                    <SearchBookGrid />
                    <SearchBookPagination />
                </Stack>
                <NavBar />
            </Center>
        </Box>
    );
}

export default SearchBook