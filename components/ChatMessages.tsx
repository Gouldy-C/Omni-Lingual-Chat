"use client"

import { sortedMessagesRef } from "@/lib/converters/Message"
import { Message } from "@/lib/types"
import { useLanguageStore } from "@/store/store"
import { MessageCircleIcon } from "lucide-react"
import { Session } from "next-auth"
import { createRef, useEffect } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import LoadingSpinner from "./LoadingSpinner"
import UserAvatar from "./UserAvatar"


function ChatMessages({chatId, session , initialMessages} : {chatId:string, session: Session | null, initialMessages: Message[]}) {
  const language = useLanguageStore((state) => state.language)
  const messagesEndRef = createRef<HTMLDivElement>()

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId), {
      initialValue: initialMessages
    }
  )
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages, messagesEndRef])

  return (
    <div className="m-5 mb-7 p-2 bg-oasis-100 dark:bg-tiber-950 rounded-xl">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center items-center p-20 rounded-xl space-y-2 bg-oasis-100 font-extralight text-center dark:text-black">
          <MessageCircleIcon className="h-10 w-10"/>
          <h2>
            <span className="font-bold">
              Invite A Friend
            </span> &{" "}
            <span className="font-bold">
              Send your first message in Any language
            </span>{" "}
            below to get started!
          </h2>
          <p>AI will automatically detect and translate the messages for you!
          </p>
        </div>
      )}

      {messages?.map((message) => {
        const isSender = message.user.id === session?.user.id

        return (
          <div key={message.id} className="flex my-2 items-end ">
            <div 
              className={`flex flex-col relative space-y2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                  isSender ?
                    'ml-auto bg-white dark:bg-black/30 rounded-br-none'
                    :
                    'bg-contessa-500 dark:bg-contessa-700 rounded-bl-none'
                }`}>
              <p
                className={`text-xs italic line-clamp-1 ${
                  isSender ? 'text-right' : 'text-left'}`}>
                {message.user.name.split(" ")[0]}
              </p>

              <div className="flex flex-col font-semibold text-sm sm:text-base">
                <p>
                  {message.translated?.[language] || message.input}
                </p>
                {!message.translated && <LoadingSpinner/>}
              </div>
            </div>
            
            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${!isSender && "-order-1"}`}/>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages