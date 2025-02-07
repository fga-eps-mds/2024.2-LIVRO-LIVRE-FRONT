import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BorrowBookButton from '../src/pages/BorrowBook/BorrowButton'; 
import { ChakraProvider } from '@chakra-ui/react';
import { toaster } from "../src/components/ui/toaster";
import { useNavigate } from 'react-router';
import { defaultSystem } from "@chakra-ui/react";
import React from 'react';


jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));


jest.mock("../src/components/ui/toaster", () => ({
  toaster: {
    create: jest.fn(),
  },
}));

const mockBook = {
  id: 1,
  title: "Livro de Teste",
  author: "Autor Teste",
  rating: 4.5,
  description: "Descrição do livro de teste",
  coverImage: "https://via.placeholder.com/150",
  status: "Available", 
};

describe('BorrowButton', () => {
  it('Tem que renderizar o botão com texto correto', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BorrowBookButton book={mockBook} />
      </ChakraProvider>
    );

    expect(screen.getByText('Pegar Emprestado')).toBeInTheDocument();
  });

  it('Mostrar toaster de success quando realizar empréstimo', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  
    render(
      <ChakraProvider value={defaultSystem}>
        <BorrowBookButton book={mockBook} />
      </ChakraProvider>
    );
  
    fireEvent.click(screen.getByText('Pegar Emprestado'));
  
    await waitFor(() => expect(screen.getByText('Deseja realizar esse empréstimo?')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Confirmar'));
  
  
    await waitFor(() => expect(toaster.create).toHaveBeenCalledWith({
      title: "Empréstimo Realizado",
      type: "success",
    }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  
  
   
 
  

  it('Desabilitar botão qaundo livro NotAvailble', () => {
    const unavailableBook = { ...mockBook, status: "NotAvailable" };
  
    render(
      <ChakraProvider value={defaultSystem}>
        <BorrowBookButton book={unavailableBook} />
      </ChakraProvider>
    );
  
    const disabledButton = screen.getByText('Livro indisponível');
    expect(disabledButton).toBeInTheDocument();
    expect(disabledButton).toBeDisabled();
  })});