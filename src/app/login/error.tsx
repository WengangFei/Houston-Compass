'use client';
 
import Image from 'next/image';
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center my-24">
      <Image
        src="/login-error.gif"
        alt="login-error"
        width={260}
        height={260}
        className="rounded-lg my-8"
      />
      <h2 className="text-center text-red-500 font-bold md:text-xl">
        Phone number or password is incorrect!
      </h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}