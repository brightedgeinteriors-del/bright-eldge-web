'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          localStorage.removeItem('admin_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - in real app, this would be an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple hardcoded credentials for demo
        if (email === 'Admin@brightedgeinteriors.in' && password === 'Admin@umair0011.') {
          const userData: User = {
            id: '1',
            email: email,
            name: 'Admin User',
            role: 'admin'
          };
          // Set user first, then save to localStorage
          setUser(userData);
          localStorage.setItem('admin_user', JSON.stringify(userData));
          setIsLoading(false);
          // Force a state update by using setTimeout
          setTimeout(() => {
            resolve(true);
          }, 50);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 500); // Reduced network delay for better UX
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
