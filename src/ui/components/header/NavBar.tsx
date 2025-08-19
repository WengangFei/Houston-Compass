import Image from 'next/image'
import React from 'react'
import LoginAgent from './LoginAgent'
import HeaderSearchBar from './HeaderSearchBar'
import clsx from "clsx";

import { Noto_Sans_JP } from "next/font/google";
import MobilBred from './MobilBred';

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"], // you can choose other weights too
  variable: "--font-noto-sans-jp",
});


export default function NavBar() {
  return (
    <div className="bg-primary p-2 flex flex-col items-center  md:p-4 md:flex-row md:justify-between  ">
      {/* Left side: logo + text */}
      <MobilBred />
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.webp"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className={clsx(notoSansJP.className, "text-xl font-bold text-blue-600 ")}>
          Houston 帮
        </p>
      </div>

      {/* Right side: search + login */}
      <div className="flex w-full mt-4 md:w-auto items-center justify-center md:justify-end md:gap-60">
        <HeaderSearchBar />
        <LoginAgent />
      </div>
    </div>

  )
}
