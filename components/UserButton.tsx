"use client"

import { Session } from "next-auth";
import UserAvatar from "./UserAvatar";
import { DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
        DropdownMenuLabel } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'


export default function UserButton({session}:{session : Session | null}) {

  const { push } = useRouter()
  // subscription listener
  if (!session) return (
    <Button onClick={() => signIn()}>
      Sign In
    </Button>
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name} image={session.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Hello, {session.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuItem  onClick={() => push("/register")} className=" cursor-pointer">
            My Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className=" cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}