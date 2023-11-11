"use client"

import { MessageSquarePlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function CreateChatButton() {

  const chatId = "abc"
  const router = useRouter()
  const createChat = async () => {


    router.push(`/chat/${chatId}`)
  }

  return (
    <Button variant={"ghost"} onClick={() => createChat()} className="px-2 rounded-full dark:hover:bg-slate-900">
      <MessageSquarePlusIcon/>
    </Button>
  )
}
