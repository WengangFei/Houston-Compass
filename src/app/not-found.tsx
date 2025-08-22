import Link from 'next/link';
import { FaFaceSadCry } from "react-icons/fa6";
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaFaceSadCry className=" text-yellow-400 my-12" size={80}/>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Paren level not found page!</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}