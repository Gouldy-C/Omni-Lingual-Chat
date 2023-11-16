"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession } from "next-auth/react"
import * as z  from "zod"
import { useToast } from "./ui/use-toast"
import useAdminId from "@/hooks/useAdminId"
import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { PlusCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import ShareLink from "./ShareLink"
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers"
import { ToastAction } from "@radix-ui/react-toast"
import { getUserByEmailRef } from "@/lib/converters/Users"


const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

function InviteUser({chatId} : {chatId:string}) {
  const {data:session} = useSession()
  const { toast } = useToast()
  const adminId = useAdminId({chatId})
  const subscription = useSubscriptionStore((state) => state.subscription)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [openInviteLink, setOpenInviteLink] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user.id) return

    toast({
      title: "Sending Invite",
      description: "Please wait while we send the invite..."
    })

    const noOfUsersInChat = ((await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()).length)
    
    const isPro = subscription?.role === "pro" && subscription.status === "active"

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "Free and Basic plan limit exceeded",
        description: "You have exceeded the plan limit for number of users in a single chat. Please upgrade to Pro to add more users to this chat!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}>
            Upgrade to Pro
          </ToastAction>
        )
      })
      return
    }
    const querySnapshot = await getDocs(getUserByEmailRef(values.email))

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description: "Please enter a valid member email address",
        variant: "destructive"
      })
      return
    } else {
      form.reset

      const user = querySnapshot.docs[0].data()

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id,
        email: user.email,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      }).then(() => {

        setOpen(false)

        toast({
          title: "User Added to the Chat",
          description: "the user was added to the chat successfully!",
          className: "bg-green-600 text-white",
          duration: 3000,
        })

        setOpenInviteLink(true)
        
      })
    }
  }

  return (
    <>
    
    {adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="bg-oasis-100 text-black">
            <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User To Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this chat!{" "}
                <span className="text-alizarin-crimson-700 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="johndoe@gmail.com" {...field}/>
                      </FormControl>
                    </FormItem>
                  )}/>
                <Button variant={"ghost"} className="ml-auto sm:w-fit w-full bg-oasis-100 dark:bg-tiber-950" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}/>
      </>
    )}
  </>
  )
}

export default InviteUser