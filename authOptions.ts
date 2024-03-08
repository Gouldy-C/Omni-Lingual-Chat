import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { adminAuth, adminDb } from "@/firebase-admin"



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session: async ({session, token}) => {
      if (session?.user){
        if (token.sub) {
          session.user.id = token.sub
          const firebaseToken = await adminAuth.createCustomToken(token.sub)
          session.firebaseToken = firebaseToken
        }
      }
      return session
    },
    jwt: ({user, token}) => {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
  },
  adapter: FirestoreAdapter(adminDb),
} satisfies NextAuthOptions
