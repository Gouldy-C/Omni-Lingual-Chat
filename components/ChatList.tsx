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
      <ChatListRows initialChats={initialChats}/>
    </div>
  )
}

export default ChatList