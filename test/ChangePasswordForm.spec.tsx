import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../src/hooks/useAuth.tsx';
import { useNavigate } from 'react-router';
import ChangePasswordForm from '../src/pages/ChangePassword/ChangePasswordForm/index.tsx';
import React from 'react';
import '@testing-library/jest-dom'
import { 
  ChakraProvider, 
} from '@chakra-ui/react';
import { system } from '@chakra-ui/react/preset';

// Mockando as dependências
jest.mock('../src/hooks/useAuth');
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  useLocation: () => ({
    search: '?token=test-token',
  }),
}));

describe('ChangePasswordForm', () => {
  const mockChangePassword = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ changePassword: mockChangePassword });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should be render the button', () => {
    render(
      <>
        <ChakraProvider value={system}> 
          <ChangePasswordForm />
        </ChakraProvider>
      </>
    );

    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alterar senha/i })).toBeDisabled();
  });

  it.skip('should show the messages of error of try to send null fields', async () => {
    render(
    <>
      <ChakraProvider value={system}> 
        <ChangePasswordForm />
      </ChakraProvider>
    </>
    );

    const button = screen.getByRole('button', { name: /alterar senha/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
    });
  });

  it('should to able the button when the fields is not null', async () => {
    render(
      <>
      <ChakraProvider value={system}> 
        <ChangePasswordForm />
      </ChakraProvider>
    </>
    );

    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: 'password123' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /alterar senha/i })).not.toBeDisabled();
    });
  });

  it.skip('should call changePassword and moving to login welcome', async () => {
    // Mock para o retorno do changePassword
    mockChangePassword.mockResolvedValueOnce(undefined);
  
    // Mock do contexto de autenticação se necessário
    const mockToken = 'test-token';
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    jest.spyOn(require('../src/hooks/useAuth.tsx'), 'AuthContext').mockReturnValue({
      token: mockToken,
    });
  
    render(
      <ChakraProvider value={system}>
        <ChangePasswordForm />
      </ChakraProvider>
    );
  
    // Simula alteração nos campos de senha
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: 'password123' },
    });
  
    // Simula clique no botão
    const button = screen.getByRole('button', { name: /alterar senha/i });
    fireEvent.click(button);
  
    // Aguarda e valida as chamadas
    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith('password123', 'test-token');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

});