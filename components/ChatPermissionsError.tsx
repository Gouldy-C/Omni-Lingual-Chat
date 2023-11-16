import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Button } from "./ui/button"
import Link from "next/link"


function ChatPermissionsError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Permission Error</AlertTitle>
      <AlertDescription className="flex">
        <p>
          You do not have permission to access that chat!
          <br />
          <span className="font-bold">Please ask a chat admin to add you to the chat.</span>
        </p>

        <Link href={"/chat"} replace>
          <Button variant={"destructive"}>Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default ChatPermissionsError