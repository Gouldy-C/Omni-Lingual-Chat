"use server"

import { authOptions } from "@/authOptions"
import { adminDb } from "@/firebase-admin"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { Stripe } from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion:"2023-10-16"})


export async function generatePortalLinkAction() {
  const session = await getServerSession(authOptions)
  const host = headers().get('host')

  if (!session?.user.id) return console.error("No user found")
  
  const {
    user: {id},
    } = session

  const returnUrl = process.env.NODE_ENV === "development" ?
    `http://${host}/register`
    :
    `https://${host}/register`

  const doc = await adminDb.collection("customers").doc(id).get()

  if (!doc.data) return console.error("No customer record with userId:", id)

  const stripeId = doc.data()!.stripeId

  try {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnUrl,
    })
    
    return stripeSession.url
  } catch (error) {
    console.error('Error creating billing portal session:', error);
  }
  return "/register"
}