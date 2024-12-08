'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

import useApi from './useApi';
import { toaster } from '../components/ui/toaster';

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface EditProfileParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  oldPassword?: string;
  newPassword?: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  signOut: () => void;
  signUp: (userToSignUp: SignUpParams) => Promise<boolean>;
  signIn: (userToSignIn: SignInParams) => Promise<boolean>;
  editProfile: (id: string, profileToEdit: EditProfileParams) => Promise<boolean>;
  recoverPassword: (email: string) => Promise<boolean>;
  changePassword: (password: string, token: string) => Promise<boolean>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    signUp: authSignUp,
    signIn: authSignIn,
    editProfile: authEditProfile,
    recoverPassword: authRecoverPassword,
    changePassword: authChangePassword,
  } = useApi();

  const localToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('@livrolivre:token')
      : null;
  const [token, setToken] = useState<string | null>(
    localToken ? localToken : null,
  );

  async function signUp(userToSignUp: SignUpParams): Promise<boolean> {
    const { data } = await authSignUp(userToSignUp);
    if (!data.accessToken) {
      toaster.create({
        title: 'Erro ao criar conta',
        description: 'Verifique os campos e tente novamente.',
        type: 'error',
      })
      return false;
    };
    setToken(data.accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('@livrolivre:token', data.accessToken);
    }
    return true;
  }

  async function signIn(userToSignIn: SignInParams): Promise<boolean> {
    const { data } = await authSignIn(userToSignIn);
    if (!data.accessToken) {
      toaster.create({
        title: 'Erro ao realizar login',
        description: 'Verifique os campos e tente novamente.',
        type: 'error',
      })
      return false;
    };
    setToken(data.accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('@livrolivre:token', data.accessToken);
    }
    return true;
  }

  async function recoverPassword(email: string): Promise<boolean> {
    const { data } = await authRecoverPassword(email);
    if (data.id) {
      toaster.create({
        title: 'E-mail enviado para recuperação de senha!',
        type: 'success',
      })
      return true;
    };
    toaster.create({
      title: 'Erro ao requisitar recuperação de senha',
      description: 'Verifique os campos e tente novamente.',
      type: 'error',
    })
    return false;
  }

  async function changePassword(password: string, token: string): Promise<boolean> {
    const { data } = await authChangePassword(password, token);
    if (data.id) {
      toaster.create({
        title: 'Senha alterada com sucesso! Você será redirecionado para o login...',
        type: 'success',
      })
      return true;
    };
    toaster.create({
      title: 'Erro ao alterar a senha',
      description: 'Verifique os campos e tente novamente.',
      type: 'error',
    })
    return false;
  }

  async function editProfile(id: string, profileToEdit: EditProfileParams): Promise<boolean> {
    const { data } = await authEditProfile(id, profileToEdit);
    if (data.id) {
      toaster.create({
        title: 'Perfil editado com sucesso!',
        type: 'success',
      })
      return true;
    };
    toaster.create({
      title: 'Erro ao editar perfil',
      description: 'Verifique os campos e tente novamente.',
      type: 'error',
    })
    return false;
  }

  function signOut(): void {
    typeof window !== 'undefined'
      ? localStorage.removeItem('@livrolivre:token')
      : null;
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        signOut,
        signUp,
        editProfile,
        signIn,
        recoverPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}