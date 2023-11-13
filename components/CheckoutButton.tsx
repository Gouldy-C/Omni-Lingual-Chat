"use client"

import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useState } from "react"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase"
import LoadingSpinner from "./LoadingSpinner"
import { useSubscriptionStore } from "@/store/store"
import ManageAccountButton from "./ManageAccountButton"


function CheckoutButton({id} : {id: string}) {
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
      {id === "Free" ?
        (subscription === null ? <p className="w-60 mb-6 text-center font-bold">Current Subscription</p>: "")
          :
        subscription?.items[0].price.id === id  ?
          <ManageAccountButton/>
          :
          isLoadingSubscription || loading ?
            <LoadingSpinner/>
            :
            <Button 
              className="shadow-md w-60 mb-6 rounded-xl"
              variant="secondary"
              onClick={() => createCheckoutSession()}>
              Purchase Plan
            </Button>
      }
    </>
)
}

export default CheckoutButton