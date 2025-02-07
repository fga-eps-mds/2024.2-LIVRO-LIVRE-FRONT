import BackButton from '../src/pages/QRcode/backbutton';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { defaultSystem } from "@chakra-ui/react";


jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn()
}));

test("Renders the BackButton component", () => {
    render(
        <ChakraProvider value={defaultSystem}>
            <MemoryRouter>
                <BackButton />
            </MemoryRouter>
        </ChakraProvider>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText('Voltar')).toBeInTheDocument();
});

test("Navigates to / on button click", () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router'), 'useNavigate').mockReturnValue(mockNavigate);
    
    render(
        <ChakraProvider value={defaultSystem}>
            <MemoryRouter>
                <BackButton />
            </MemoryRouter>
        </ChakraProvider>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
});
