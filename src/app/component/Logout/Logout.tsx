"use client"

import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogOut() {
  return (
    <>
                          <DropdownMenuItem  onClick={()=> signOut({
                        callbackUrl:"/"
                      })}>Logout 

                      </DropdownMenuItem>

    
    </>
  )
}
