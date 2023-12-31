"use client"

import { db } from "@/firebase"
import { useSubscriptionStore } from "@/store/store"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import ManageAccountButton from "./ManageAccountButton"
import { Button } from "./ui/button"


function CheckoutButton({id, generatePortalLinkAction} : {id: string, generatePortalLinkAction: () => Promise<string | void>}) {
  const {data:session} = useSession()
  const [loading,setLoading] = useState(false)
  const subscription = useSubscriptionStore((state) => state.subscription)

  const isLoadingSubscription = subscription === undefined
  


  const createCheckoutSession = async () => {
    if (!session?.user.id) return

    setLoading(true)

    const docRef = await addDoc(collection(db, 'customers' ,session.user.id, 'checkout_sessions'), {
      price: id,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    })
    return onSnapshot(docRef, snap =>{
      const data = snap.data()
      const url = data?.url
      const error = data?.error
  
      if (error) {
        console.log(error);
        alert(`An Error Occured: ${error.message}`)
        setLoading(false)
      }

      if (url) {
        window.location.assign(url)
        setLoading(false)
      }
    })
  }

  return (
    <>
      {(isLoadingSubscription || loading) && <LoadingSpinner/>}
      {id === "Free" ?
        (subscription === null ? <p className="w-60 mb-6 text-center font-bold">Current Subscription</p>: "")
          :
        !(subscription)  ?
          <Button 
            className="shadow-md w-60 mb-6 rounded-xl bg-oasis-100 text-black"
            variant="outline"
            onClick={() => createCheckoutSession()}>
            Purchase Plan
          </Button>
          :
          <ManageAccountButton generatePortalLinkAction={generatePortalLinkAction} current={subscription.price.id === id}/>
      }
    </>
)
}

export default CheckoutButton