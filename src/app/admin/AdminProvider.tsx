'use client';

import { AuthProvider } from './context/AuthContext';

interface AdminProviderProps {
  children: React.ReactNode;
}

export default function AdminProvider({ children }: AdminProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
