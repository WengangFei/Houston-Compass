'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Image from 'next/image';



export default function LoginAgent() {

  const { data: session } = useSession();
  type Providers = Awaited<ReturnType<typeof getProviders>>;
  const [providers, setProviders] = useState<Providers>(null);
  useEffect(()=>{
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })()
  },[])

  return (
    <div className="hidden md:block">
      {
        !session ? (
          <>
          {providers &&
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
          }
          <Link href="/login">
            <p className="text-white bg-blue-500 mb-2 text-xs hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-1 py-1 text-center">
              Login or Register
            </p>
          </Link>
          </>
        ):(
          <button
          onClick={() => signOut()}
          className="hover:scale-125 hover:cursor-pointer rounded-md px-1 py-1 text-center text-sm"
          >
            Sign Out
          </button>
        )
      }
    </div>
  );
}
