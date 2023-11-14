import { authOptions } from "@/authOptions"
import ChatInput from "@/components/ChatInput"
import { getServerSession } from "next-auth"


async function ChatPage() {
  const session = await getServerSession(authOptions)





  return (
    <>
    {/* {admin controls} */}

    {/* {Chat Members} */}

    {/* {Chat Messages} */}

    {/* {Chat Input} */}
      <ChatInput chatId={"chatId"}/>
    </>
  )
}

export default ChatPage