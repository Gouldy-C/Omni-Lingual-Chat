"use client"

import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"


function UpgradeBanner() {
  const subscription = useSubscriptionStore((state) => state.subscription)
  const isPro = subscription?.role === "pro" && subscription.status === "active"
  const router = useRouter()
  
  if (subscription === undefined || isPro) return (
    <></>
  )

  return (
    <Button
      className="w-full rounded-none bg-gradient-to-r from-teal-700 to-cyan-600 text-center text-white px-5 py-2 hover:from-indigo-700 hover:to-fuchsia-700 hover:shadow-md hover:opacity-75 transition-all"
      onClick={() => router.push("/register")}>
        Upgrade to {subscription === null && "Basic or"} Pro for More Features!
    </Button>
  )
}

export default UpgradeBanner