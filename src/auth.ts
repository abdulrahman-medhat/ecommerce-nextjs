import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
  export const authOption :AuthOptions = {

  providers: [
    CredentialsProvider({
      name: "ShoppingCart",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          }
        )

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Login failed")
        }

        return {
          id: data.user._id,
          user: data.user,
          token: data.token
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      return session
    }
  }
}
