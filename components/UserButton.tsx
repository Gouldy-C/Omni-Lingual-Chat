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
import { useSubscriptionStore } from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { StarIcon } from "lucide-react";


export default function UserButton({session}:{session : Session | null}) {

  const subscription = useSubscriptionStore((state) => state.subscription)

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
        
        {subscription === undefined ?
          <DropdownMenuLabel>
            <LoadingSpinner/>
          </DropdownMenuLabel> :
        subscription?.role === "pro" ?

          <DropdownMenuLabel className="flex items-center space-x-1 text-pink-500 animate-pulse">
            <StarIcon fill="rgb(244 114 182)"/>
            <p>PRO</p>
          </DropdownMenuLabel>
          : subscription?.role &&
          <DropdownMenuLabel>
            <p>{subscription.role[0].toUpperCase() + subscription.role.slice(1)}</p>
          </DropdownMenuLabel>


        }

        <DropdownMenuItem  onClick={() => push("/register")} className=" cursor-pointer">
            Manage Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className=" cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}