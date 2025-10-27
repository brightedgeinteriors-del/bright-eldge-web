'use client';

import AdminProvider from '../AdminProvider';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
}
