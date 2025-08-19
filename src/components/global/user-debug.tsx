'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function UserDebug() {
  const { user, isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    if (isLoaded) {
      console.log('🔍 User Debug Info:')
      console.log('Is loaded:', isLoaded)
      console.log('Is signed in:', isSignedIn)
      console.log('User ID:', user?.id)
      console.log('User email:', user?.emailAddresses?.[0]?.emailAddress)
      console.log('User name:', user?.firstName, user?.lastName)
      console.log('Clerk Publishable Key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
    }
  }, [user, isLoaded, isSignedIn])

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-800 text-white p-2 rounded text-xs z-50">
        <div>Not signed in</div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>User ID: {user?.id}</div>
      <div>Email: {user?.emailAddresses?.[0]?.emailAddress}</div>
    </div>
  )
}
