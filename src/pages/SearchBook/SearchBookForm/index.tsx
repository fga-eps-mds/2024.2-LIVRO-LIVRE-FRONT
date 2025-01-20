import { Input, Center, Box } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import { InputGroup } from '../../../components/ui/input-group';

function SearchBookForm() {
    return (
        <Box gap={'5px'} mt={'15px'} >
           <Center>
           <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
             <Input  type="text" placeholder="Digite o nome, autor ou tema do livro desejado." />
           </InputGroup>
           </Center>
        </Box>
    );
}

export default SearchBookForm

