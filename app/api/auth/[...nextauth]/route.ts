import NextAuth from "next-auth";
import { authOptions } from "./authOptions"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
