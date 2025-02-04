import Home from '../src/pages/Home';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { defaultSystem } from "@chakra-ui/react"

test("Renders the Home component", () => {
    render(
        <ChakraProvider value={defaultSystem}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </ChakraProvider>
    );
    
    expect(screen.getByRole('button', { name: /Ir para Leitor de QR Code/i })).toBeInTheDocument();
    expect(screen.getByAltText('QR Code')).toBeInTheDocument();
});

test("Navigates to /qrcode on button click", () => {
    render(
        <ChakraProvider value={defaultSystem}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/qrcode" element={<div>QR Code Page</div>} />
                </Routes>
            </MemoryRouter>
        </ChakraProvider>
    );
    
    const button = screen.getByRole('button', { name: /Ir para Leitor de QR Code/i });
    fireEvent.click(button);
    
    expect(screen.getByText('QR Code Page')).toBeInTheDocument();
});
