import { Input, Stack, Separator, Center } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import { InputGroup } from '../../../components/ui/input-group';

function SearchBookForm() {
    return (
        <Stack gap={'5px'} align-items={'center'} justifyContent={'center'}>
            <Separator />
           <Center>
           <InputGroup flex="0.9" startElement={<IoSearchOutline />}>
             <Input type="text" placeholder="Digite o nome, autor ou tema do livro que deseja." />
           </InputGroup>
           </Center>
        </Stack>
    );
}

export default SearchBookForm

