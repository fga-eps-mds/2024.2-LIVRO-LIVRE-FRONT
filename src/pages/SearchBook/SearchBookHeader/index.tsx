import { Stack, Center } from '@chakra-ui/react';

function SearchBookHeader() {
    return (
        <Stack gap={'5px'}>
            <Center>
                <img width={'150px'} src="./logo.png" alt="Logo Livro Livre"/>
            </Center>
        </Stack>
    );
}

export default SearchBookHeader
