'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

import useApi from './useApi';

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  signOut: () => void;
  signUp: (userToSignUp: SignUpParams) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { signUp: authSignUp } = useApi();

  const localToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('@livrolivre:token')
      : null;
  const [token, setToken] = useState<string | null>(
    localToken ? localToken : null,
  );

  async function signUp(userToSignUp: SignUpParams) {
    const { data } = await authSignUp(userToSignUp);
    if (!data.accessToken) return;
    setToken(data.accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('@livrolivre:token', data.accessToken);
    }
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