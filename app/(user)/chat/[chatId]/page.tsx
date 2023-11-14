import { authOptions } from "@/authOptions"
import { getServerSession } from "next-auth"


async function ChatPage() {
  const session = await getServerSession(authOptions)





  return (
    <>
    {/* {admin controls} */}

    {/* {Chat Members} */}

    {/* {Chat Messages} */}

    {/* {Chat Input} */}
      <ChatInput/>
    </>
  )
}

export default ChatPage