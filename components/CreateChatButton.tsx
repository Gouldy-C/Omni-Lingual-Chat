"use client"

import { MessageSquarePlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import { useSubscriptionStore } from "@/store/store"
import { v4 as uuidv4 } from "uuid"
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers"
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { ToastAction } from "./ui/toast"

export default function CreateChatButton({isLarge} : {isLarge?: boolean}) {
  const {data: session} = useSession()
  const [loading, setLoading] = useState(false)
  const {toast} = useToast()
  const subscription = useSubscriptionStore((state) => state.subscription)
  const router = useRouter()

  const isPro = subscription?.role === "pro" && subscription.status === "active"

  const createNewChat = async () => {
    if (!session?.user.id) return
    setLoading(true)
    toast({
      title: "Creating a new chat...",
      description: "We are creating your new chat!",
      className: "bg-orange-100 text-black",
      duration: 3000,
    })

    const numberChats = (await getDocs(chatMembersCollectionGroupRef(
      session?.user.id))).docs.map((doc) => doc.data()).length

    if ( !isPro && numberChats >= 2) {
      toast({
        title: "Chat Limit Reached",
        description: "You have reach the limit for number of allowed chats on your subscription tier!",
        variant: "destructive",
        duration: 4000,
        className:"flex flex-col",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}>
            Upgrade to Pro
          </ToastAction>
        ),
      })
      return
    }

    const chatId = uuidv4()

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    }).then(() => {
      toast({
        title: "Success",
        description: "Chat Created",
        className: "bg-green-600/60 text-white",
        duration: 2000,
      })
      router.push(`/chat/${chatId}`)
    }).catch((error) => {
      toast({
        title: "Error",
        description: "There was an error creating your chat!",
        variant: "destructive",
      })
      console.log(error.message);
    }).finally(()=> {
      setLoading(false)
    })
  }

  const styleBtn = isLarge ? "outline" : "ghost"

  return (
    <Button variant={"ghost"} onClick={() => createNewChat()} className={`px-2 rounded-full   hover:scale-110 ${isLarge && "bg-livid-brown-950 px-4 text-white duration-200 hover:bg-livid-brown-950 hover:text-white"}`}>
      {isLarge ? "Create A New Chat" : <MessageSquarePlusIcon/>}
    </Button>
  )
}
