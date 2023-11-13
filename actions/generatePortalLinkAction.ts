"use server"
import { authOptions } from "@/authOptions"
import { adminDb } from "@/firebase-admin"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Stripe } from "stripe"



export async function generatePortalLinkAction() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion:"2023-10-16"})
  const session = await getServerSession(authOptions)

  if (!session?.user.id) return console.error("No user found")
  const {
    user: {id},
    } = session

  const returnUrl = process.env.NODE_ENV === "development" ?
    process.env.NEXTAUTH_URL + "/register"
    :
    process.env.NEXTAUTH_URL + "/register"

  const doc = await adminDb.collection("customers").doc(id).get()

  if (!doc.data) return console.error("No customer record with userId:", id)

  const stripeId = doc.data()!.stripeId

  try {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnUrl,
    })
    
    console.log(stripeSession.url)
    redirect(stripeSession.url)
  } catch (error) {
    return console.error('Error creating billing portal session:', error);
  }
}