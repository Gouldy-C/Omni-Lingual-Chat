import ChatList from "@/components/ChatList"


type Props = {
  params: {}
  searchParams: {
    error: string
  }
}

function page({searchParams: {error}}: Props ) {
  return (
    <div>
      {/* {chat permission error} */}

      <ChatList/>
    </div>
  )
}

export default page