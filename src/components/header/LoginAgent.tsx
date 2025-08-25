'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Image from 'next/image';
import { RiLogoutCircleLine } from "react-icons/ri";


export default function LoginAgent() {

  const { data: session, status } = useSession();

  type Providers = Awaited<ReturnType<typeof getProviders>>;
  const [providers, setProviders] = useState<Providers>(null);

  useEffect(()=>{
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })()
  },[]);



console.log('session=>',session)
  return (
    <div className="hidden md:block">
      {status === "authenticated" && (
        <div className="flex items-center gap-4">
          <button className="hover:cursor-pointer hover:scale-105">
            <Image
              src={session.user?.image ?? "/logo.webp"}
              alt={session.user?.name ?? "User"}
              width={45}
              height={45}
              className="rounded-full"
            />
          </button>

          <button
            onClick={() => signOut()}
            className="rounded-lg text-center text-xs text-black hover:text-gray-500 hover:cursor-pointer"
          >
            <RiLogoutCircleLine size={40} />
          </button>
        </div>
      )}
      {status === "unauthenticated" && (
        <>
          {providers ? (
            Object.values(providers)
              .filter((provider) => provider.type !== "credentials")
              .map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="hover:scale-125 hover:cursor-pointer rounded-md px-1 py-1 text-center text-sm"
                >
                  <Image
                    src={`/${provider.name}.png`}
                    alt={provider.name}
                    width={30}
                    height={30}
                    className="rounded-lg"
                  />
                </button>
              ))
          ) : (
            <div className="flex items-center gap-4 mb-2">
              {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-gray-200 animate-pulse rounded-full "
                />
              ))}
            </div>
          )}
          <Link href="/login">
            <p className="text-white bg-blue-500 mb-2 text-xs hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-1 py-1 text-center">
              Login or Signup
            </p>
          </Link>
        </>
      )}
      {status === "loading" && (
        <div className="flex items-center gap-4 mb-2">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gray-200 animate-pulse rounded-full "
            />
          ))}
        </div>
      )}
    </div>
  );
}
