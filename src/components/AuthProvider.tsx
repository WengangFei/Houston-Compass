'use client';

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function AuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
}
