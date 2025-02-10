import {  render, screen  } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import '@testing-library/jest-dom'
import { system } from '@chakra-ui/react/preset';
import RecoverPasswordHeader from '../src/pages/ChangePassword/ChangePasswordHeader/index.tsx';
import { ChakraProvider } from '@chakra-ui/react';
//import { extendTheme } from '@chakra-ui/theme-tools';

// Configura um tema vazio para evitar erros relacionados ao contexto do Chakra
//const mockTheme = extendTheme({});
// problema de importação 
describe('RecoverPasswordHeader', () => {
  it.skip('should render the component correctly', () => {
    render(
      <ChakraProvider  value={system} > // use theme in chakraprovider
        <RecoverPasswordHeader />
      </ChakraProvider>
    );

    const title = screen.getByText('Nova senha');
    expect(title).toBeInTheDocument();

    const description = screen.getByText('Deseja criar uma nova senha? Insira sua senha e confirme-a.');
    expect(description).toBeInTheDocument();
  });
});