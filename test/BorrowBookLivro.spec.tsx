import { render, screen } from '@testing-library/react';
import  BorrowBookLivro  from '../src/pages/BorrowBook/BorrowBookLivro';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { defaultSystem } from "@chakra-ui/react";

const mockBook = {
  id: 1,
  title: "Livro de Teste",
  author: "Autor Teste",
  rating: 4.5,
  description: "Uma descrição de exemplo para o livro.",
  coverImage: "https://via.placeholder.com/150"
};

describe('BorrowBookLivro', () => {
  it('should render book information correctly', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BorrowBookLivro book={mockBook} />
      </ChakraProvider>
    );

    
    expect(screen.getByText(/Livro de Teste/)).toBeInTheDocument();
    
   
    expect(screen.getByText(/Autor Teste/)).toBeInTheDocument();

    
    expect(screen.getByText(/Uma descrição de exemplo para o livro./)).toBeInTheDocument();

    
    const image = screen.getByAltText(/Capa do livro Livro de Teste/);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');

 
    expect(screen.getByRole('img')).toBeInTheDocument(); 
  });
});
