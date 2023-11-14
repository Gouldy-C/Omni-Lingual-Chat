"use client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const formSchema = z.object({
  input: z.string().max(1000),
})

function ChatInput({chatId} : {chatId:string}) {
  const {data:session} = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    }
  })

  return (
    <div>ChatInput</div>
  )
}

export default ChatInput