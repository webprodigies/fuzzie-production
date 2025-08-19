'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { handleUserSignup } from '@/lib/user-actions'

export default function UserCreator() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [hasCreatedUser, setHasCreatedUser] = useState(false)

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !hasCreatedUser) {
      console.log('🎉 User detected! Creating user in database...')
      console.log('User details:', {
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        externalAccounts: user.externalAccounts
      })
      
      const createUser = async () => {
        try {
          const result = await handleUserSignup(user)
          if (result.success) {
            console.log('✅ User created in database successfully!')
            setHasCreatedUser(true)
          } else {
            console.error('❌ Failed to create user in database:', result.error)
            // Don't set hasCreatedUser to false so it can retry
          }
        } catch (error) {
          console.error('❌ Error creating user:', error)
          // Don't set hasCreatedUser to false so it can retry
        }
      }

      createUser()
    }
  }, [isLoaded, isSignedIn, user, hasCreatedUser])

  // Debug logging
  useEffect(() => {
    if (isLoaded) {
      console.log('🔍 UserCreator Debug:', {
        isLoaded,
        isSignedIn,
        userId: user?.id,
        email: user?.emailAddresses?.[0]?.emailAddress,
        hasCreatedUser
      })
    }
  }, [isLoaded, isSignedIn, user, hasCreatedUser])

  return null // This component doesn't render anything
}
