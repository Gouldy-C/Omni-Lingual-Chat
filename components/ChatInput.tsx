"use client"
import { limitedMessagesRef, messagesRef } from "@/lib/converters/Message"
import { User } from "@/lib/types"
import { useSubscriptionStore } from "@/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  input: z.string().max(1000),
})

function ChatInput({chatId} : {chatId:string}) {
  const {data:session} = useSession()
  const subscription = useSubscriptionStore((state) => state.subscription)
  const isPremium = (subscription?.role === "pro" || subscription?.role === "basic") && subscription.status === "active"
  const {toast} = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const tempValue = values.input.trim()
    form.reset()
    if (values.input.length === 0) {
      return
    }
    if (!session?.user) {
      return
    }

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map((doc) => doc.data()).length
    if (!isPremium && messages > 10){
      toast({
        title: "Tier Limit For Messages",
        description: "Reached tier limit for messages, you can not create anymore messages in this chat!",
        className: "text-black",
        variant:"destructive",
        duration: 3000,
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}>
            Upgrade to Basic or Pro
          </ToastAction>
        )
      })
      return
    }

    const userToStore: User = {
      id: session.user.id,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    }

    addDoc(messagesRef(chatId), {
      input: tempValue,
      timestamp: serverTimestamp(),
      user: userToStore,
    })
  }

  return (
    <div className="sticky bottom-0 px-1">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 rounded-t-xl max-w-5xl mx-auto bg-white border p-1">
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="border-none bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 dark:text-black"
                      placeholder="Message in Any language..."
                      {...field}/>
                  </FormControl>
                </FormItem>
              )}/>
              <Button type="submit" className="bg-contessa-700 text-white">
                Send
              </Button>
          </form>
      </Form>
    </div>
  )
}

export default ChatInput