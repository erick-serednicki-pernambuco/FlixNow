import { createContext, useState, ReactNode } from 'react';
import { login, logout } from './AuthService';

interface AuthContextProps {
  userId: string | null;
  logado: boolean;
  handleLogin: (email: string, senha: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  userId: null,
  logado: false,
  handleLogin: async () => {},
  handleLogout: async () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

type UserCurrent = {
  userId: string | null;
  logado: boolean;
};

const current: UserCurrent = {
  userId: null,
  logado: false,
};

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserCurrent>(current);

  async function handleLogin(email: string, senha: string) {
    try {
      const id = await login(email, senha);
      setCurrentUser({ userId: id, logado: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async function handleLogout() {
    await logout();
    setCurrentUser({ userId: null, logado: false });
  }

  const contexto: AuthContextProps = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contexto}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;