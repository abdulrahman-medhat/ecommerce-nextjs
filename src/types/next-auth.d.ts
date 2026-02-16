import { DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

interface UserInterface {
  id: string
  name: string
  email: string
}

// Augment Session
declare module "next-auth" {
  interface Session {
    user: UserInterface
    accessToken?: string
  }

  interface User extends DefaultUser {
    user: UserInterface
    token: string
  }
}

// Augment JWT
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserInterface
    accessToken: string
  }
}