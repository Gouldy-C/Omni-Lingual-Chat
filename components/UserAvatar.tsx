import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils"
import Image from "next/image";



export default function UserAvatar(
  {name, image, className}
  :
  {name?: string | null, image?: string | null, className?: string}) {


  return (
    <>
      <Avatar className={cn("bg-white text-slate-900 cursor-pointer mx-1 hover:scale-110 duration-300", className)}>
        {image && (
          <Image
            src={image} 
            alt={"Avatar Image"}
            width={40}
            height={40}
            className="rounded-full"/>
        )}
        <AvatarFallback className="dark:bg-white dark:text-slate-900 font-bold text-lg bg-slate-900 text-white">
          {name && name.split(" ").map((n) => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <span className="sr-only">Avatar Image</span>
    </>
  )
}
