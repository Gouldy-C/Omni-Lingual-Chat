import { Dispatch, SetStateAction } from "react"
import { useToast } from "./ui/use-toast"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Copy } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"


function ShareLink({chatId, isOpen , setIsOpen} : {chatId:string, isOpen:boolean, setIsOpen:Dispatch<SetStateAction<boolean>>}) {

  const {toast} = useToast()
  const host = window.location.host

  const linkToChat = process.env.NODE_ENV !== 'development' ?
    `http://${host}/chat/${chatId}`
    :
    `https://${host}/chat/${chatId}`
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(linkToChat)
      console.log("Copied to clipboard")

      toast({
        title: "Copied Successfully",
        description: "Share this link with people you have added to send them straight to this chat!",
        className: "bg-green-600 text-white",
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Copy className="mr-2"/>
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Share Link
          </DialogTitle>
          <DialogDescription>
            Anyone who has been
            <span className=" text-alizarin-crimson-700 font-bold"> Added To This Chat</span>{" "}
            can use this link!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={linkToChat} readOnly/>
          </div>
          <Button
            type="submit"
            onClick={() => copyToClipboard()}
            size="sm"
            className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4"/>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant={"ghost"} className="bg-oasis-100 dark:bg-tiber-950">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareLink