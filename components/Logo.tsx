"use client"

import LogoImage  from "@logos/ol-logo.svg"
import Image from "next/image"
import Link from "next/link"



export default function Logo() {
  return (
    <Link href={"/"} prefetch={false} className="overflow-hidden">
      <div className=" flex items-end w-68 h-12">
        <Image
          priority={true}
          src={LogoImage}
          alt="Logo Image"
          className="dark:filter dark:invert mx-2 my-auto"
          height={35}/>
        <h1 className="text-3xl font-bold first-letter:text-4xl">
          Omni-
        </h1>
        <h1 className="text-3xl font-bold first-letter:text-4xl">
          {" "}Lingual
        </h1>
      </div>
    </Link>
  )
}
