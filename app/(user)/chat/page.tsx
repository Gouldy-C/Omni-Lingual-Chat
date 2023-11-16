import ChatList from "@/components/ChatList"
import ChatPermissionsError from "@/components/ChatPermissionsError"


type Props = {
  params: {}
  searchParams: {
    error: string
  }
}

function page({searchParams: {error}}: Props ) {
  return (
    <div>

      {error === "permissions" && (
        <div className="m-2">
          <ChatPermissionsError/>
        </div>
      )}

      <ChatList/>
    </div>
  )
}

export default page