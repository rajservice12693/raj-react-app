import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      try {
        const storedUser = sessionStorage.getItem('userName');
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid session data
        sessionStorage.removeItem('userName');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (username: string) => {
    try {
      sessionStorage.setItem('userName', username);
      setUser(username);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving user to session:', error);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('userName');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
