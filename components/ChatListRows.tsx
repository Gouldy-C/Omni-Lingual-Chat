"use client"

import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers"
import { ChatMembers } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import CreateChatButton from "./CreateChatButton"
import { MessagesSquare } from "lucide-react"
import ChatListRow from "./ChatListRow"


function ChatListRows( {initialChats} : {initialChats: ChatMembers[]}) {
  const {data:session} = useSession()

  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!),
    {
      initialValue: initialChats,
    }
  )

  if (members?.length === 0){
    return (
      <div className="flex flex-col justify-center items-center pt-40 space-y-2">
        <MessagesSquare className="h-10 w-10"/>
        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">Get Started By Creating You First Chat!</h2>
        <CreateChatButton isLarge/>
      </div>
    )
  }


  return (
    <div className="">
      {members?.map((member, i) => (
        <ChatListRow key={member.chatId} chatId={member.chatId}/>
      ))}

    </div>
  )
}

export default ChatListRows