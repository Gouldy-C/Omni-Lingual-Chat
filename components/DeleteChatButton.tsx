"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
import useAdminId from "@/hooks/useAdminId"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"


function DeleteChatButton({chatId, deleteChatId} : {chatId:string, deleteChatId: ({chatId} : {chatId:string}) => void}) {
  const {data:session} = useSession()
  const [open, setOpen] = useState(false)
  const {toast} = useToast()
  const router = useRouter()
  const adminId = useAdminId({chatId})

  const handleOnClick = async (chatId: string) => {
    if (!(adminId === session?.user.id)) return
    try {
      deleteChatId({chatId})
      router.replace("/chat")
      toast ({
        title: "Chat Successfully Deleted",
        description: "The Chat was permanently deleted and you are being redirected to the chats page",
        duration: 4000
      })
    } catch (err) {
      toast ({
        title: "Error Deleting Chat",
        description: "There was an error deleting the chat, please try again",
        duration: 3000
      })
      console.log(err);
    } finally {
      setOpen(false)
    }
  }

  return (
    session?.user.id === adminId && (
      <Dialog
        onOpenChange={(open) => setOpen(open)}
        open={open}
        defaultOpen={open}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>
            Delete Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Are you sure?
            </DialogTitle>
            <DialogDescription>
              This action will delete the chat for all users permanently!
            </DialogDescription>
          </DialogHeader>
          <div className="space-x-2 flex">
            <Button
              onClick={() => {handleOnClick(chatId)}}
              variant={"destructive"}
              className="flex-1">
              Delete Permanently
            </Button>
            <Button
              onClick={() => {setOpen(false)}}
              variant={"outline"}
              className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}

export default DeleteChatButton