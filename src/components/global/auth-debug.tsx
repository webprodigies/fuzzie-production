'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function AuthDebug() {
  const { user, isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    console.log('🔍 Auth Debug:', {
      isLoaded,
      isSignedIn,
      userId: user?.id,
      email: user?.emailAddresses?.[0]?.emailAddress,
      pathname: window.location.pathname
    })
  }, [isLoaded, isSignedIn, user])

  if (!isLoaded) {
    return (
      <div className="fixed top-4 left-4 bg-yellow-800 text-white p-2 rounded text-xs z-50">
        Loading...
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="fixed top-4 left-4 bg-red-800 text-white p-2 rounded text-xs z-50">
        Not signed in - Redirecting to sign-in
      </div>
    )
  }

  return (
    <div className="fixed top-4 left-4 bg-green-800 text-white p-2 rounded text-xs z-50">
      <div>Signed in: {user?.emailAddresses?.[0]?.emailAddress}</div>
      <div>User ID: {user?.id}</div>
      <div>Path: {window.location.pathname}</div>
    </div>
  )
}
