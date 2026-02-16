import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authOption } from "../../../../../auth"

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }