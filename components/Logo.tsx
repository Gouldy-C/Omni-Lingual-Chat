"use client"

import LogoImage  from "@logos/ol-logo.svg"
import Image from "next/image"
import Link from "next/link"



export default function Logo() {
  return (
    <Link href={"/"} prefetch={false} className="overflow-hidden">
      <div className=" flex items-end w-68 h-12">
        <Image
          priority
          src={LogoImage}
          alt="Logo Image"
          className="dark:filter dark:invert my-1 mx-2"
          height={40}/>
        <h1 className="text-3xl font-bold">
          Omni Lingual
        </h1>
      </div>
    </Link>
  )
}
