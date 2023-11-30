import { authOptions } from "@/authOptions"
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers"
import { getDocs } from "firebase/firestore"
import { getServerSession } from "next-auth"
import ChatListRows from "./ChatListRows"


async function ChatList() {

  const session = await getServerSession(authOptions)

  const chatSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  )


  const initialChats = chatSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }))

  return (
    <div>
      <h1 className="text-5xl text-center font-extrabold p-5 drop-shadow-md">Chats</h1>
      <ChatListRows initialChats={initialChats}/>
    </div>
  )
}

export default ChatList