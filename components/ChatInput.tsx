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
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Mic, StopCircle } from "lucide-react"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  textarea: z.string().max(1000),
})

declare global {
  interface Window {
    webkitSpeechRecognition:any,
  }
}
interface SpeechEvent{
  results: [  { [y:string]: {transcript: string} } ]
}


function ChatInput({chatId} : {chatId:string}) {
  const {data:session} = useSession()
  const subscription = useSubscriptionStore((state) => state.subscription)
  const isPremium = (subscription?.role === "pro" || subscription?.role === "basic") && subscription.status === "active"
  const {toast} = useToast()
  const router = useRouter()

  const textareaRef =  useRef<any>(null)
  

  const [listening, setListening] = useState(false)
  const recognitionRef =  useRef<any>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textarea: "",
    }
  })

  const startRecord = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
    } else {
      toast({
        title: "Speech to Text Not Supported",
        description: "Your browser doesn't support speech to text. Try: Google Chrome, Safari, or Microsoft Edge",
        className: "text-black flex flex-col",
        variant:"destructive"
      })
      return
    }
    setListening(true)
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResult = true
    
    recognitionRef.current.onresult = (event: SpeechEvent) => {
      const toAdd = event.results[event.results.length - 1][0].transcript
      const prev = form.getValues().textarea
      form.setValue('textarea', !(prev === "") ? `${prev}${toAdd}` : toAdd)
    }
    recognitionRef.current.onend = () => {
      setListening(false)
    }
    recognitionRef.current.start()
  }
  
  const stopRecord = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setListening(false)
  }
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    stopRecord()
    const tempValue = values.textarea.trim()
    if (values.textarea.length === 0) {
      return
    }
    if (!session?.user) {
      return
    }
    form.reset()

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map((doc) => doc.data()).length
    if (!isPremium && messages > 10){
      toast({
        title: "Tier Limit For Messages",
        description: "Reached tier limit for messages, you can not create anymore messages in this chat!",
        className: "text-black flex flex-col",
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

  useEffect(() => {
    stopRecord()
  }, [])

  
  useEffect(() => {
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'

  }, [form.watch("textarea")])
  

  return (
    <div className="sticky bottom-0 px-1">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 rounded-t-xl max-w-5xl mx-auto bg-white border p-2 items-end">
            <FormField
              control={form.control}
              name="textarea"
              render={({ field }) => (
                <FormItem className="flex-1 flex justify-center items-center self-start">
                  <FormControl>
                    <Textarea
                      rows={1}
                      className={`border-none text-[15px] bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 dark:text-black resize-none sm:text-lg min-h-[10px] p-1 hide-scroll px-3 `}
                      placeholder="Message in Any language..."
                      {...field}
                      ref={textareaRef}/>
                  </FormControl>
                </FormItem>
              )}/>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                {
                  listening ? 
                  <Button type="button" onClick={() => stopRecord()} className="bg-red-400 text-black animate-pulse rounded-full hover:opacity-50 w-10 p-0">
                    <StopCircle />
                  </Button>
                  :
                  <Button type="button" onClick={() => startRecord()} className="bg-white text-black rounded-full hover:bg-gray-200 w-10 p-0">
                    <Mic />
                  </Button>
                }
                <Button type="submit" className="bg-contessa-700 text-white">
                  Send
                </Button>
              </div>
          </form>
      </Form>
    </div>
  )
}

export default ChatInput