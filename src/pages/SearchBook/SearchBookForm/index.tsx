import { Input, Center, Box } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import { InputGroup } from '../../../components/ui/input-group';
import { useState } from 'react';

interface SearchBookFormProps {
  handlePageChange: (query: string) => void;
}

function SearchBookForm({ handlePageChange }: SearchBookFormProps) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageChange(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Box gap={'5px'} mt={'15px'}>
      <Center>
        <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
          <Input
            type="text"
            placeholder="Digite o nome, autor ou tema do livro desejado."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </Center>
    </Box>
  );
}

export default SearchBookForm;
