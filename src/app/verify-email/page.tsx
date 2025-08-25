'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


// when use click the email verification link from registered email, it will redirect to this page
export default function VerifyEmailPage() {

    const [status, setStatus] = useState("Verifying email...");
    const searchParams = useSearchParams();
    const router = useRouter();
    

    useEffect(() => {
        const token = searchParams.get("token") ?? "";
        const email = searchParams.get("email") ?? "";
        // fetch the email verification token from DB
        fetch(
        `/api/verify-email?token=${token}&email=${encodeURIComponent(email)}`
        ).then((res) => {res.json();
        }).then(data=>{
                setStatus('Email verified successfully!');
                setTimeout(() => {
                router.push("/login");
            }, 3000);
        }).catch((err)=>{
            setStatus('Email verified failed!');
        })
        
    },[status,searchParams])
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {status === "Verifying email......" ? (
        <>
          <Image
            src="/verify-email.gif"
            alt="verify-email"
            width={400}
            height={400}
          />
          <p className="tet-xl font-bold text-green-500 text-center">
            {status}
          </p>
        </>
      ) : (
        <>
          <Image
            src="/email-verified.gif"
            alt="verify-email"
            width={400}
            height={400}
          />
          <p className="tet-xl font-bold text-green-500 text-center my-4">
            Redirect you to login page in 3 seconds...
          </p>
        </>
      )}
    </div>
  );
}
