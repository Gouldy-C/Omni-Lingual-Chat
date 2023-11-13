"use client";

import { subscriptionRef } from "@/lib/converters/subscription";
import { Subscription } from "@/lib/types";
import { useSubscriptionStore } from "@/store/store";
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


const checkForActiveSubscription = (subs : QuerySnapshot<Subscription, DocumentData>) => {
  const check = subs.docs.filter((sub) => sub.data().status === "active")
  if (check.length > 0) { return check[check.length - 1].data() as Subscription}
  else { return null }
}


function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);
  
  useEffect(() => {
    if (!session) return;

    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
        if (snapshot.empty) {
          setSubscription(null);
          return;
        } else {
          setSubscription(checkForActiveSubscription(snapshot) as Subscription | null)
        }
      },
      (error) => {
        console.log("Error getting the document: ", error);
      }
    );
  }, [session, setSubscription]);

  return <>{children}</>;
}

export default SubscriptionProvider;
