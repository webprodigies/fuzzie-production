'use client'

import { SignUp, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { handleUserSignup } from '@/lib/user-actions'
import { useRouter } from 'next/navigation'

export default function SignupWrapper() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [hasCreatedUser, setHasCreatedUser] = useState(false)

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !hasCreatedUser) {
      console.log('🎉 User signed in! Creating user in database...')
      
      const createUser = async () => {
        try {
          const result = await handleUserSignup(user)
          if (result.success) {
            console.log('✅ User created in database successfully!')
            setHasCreatedUser(true)
            // Redirect to dashboard after successful user creation
            router.push('/dashboard')
          } else {
            console.error('❌ Failed to create user in database:', result.error)
            // Still redirect even if database creation fails
            router.push('/dashboard')
          }
        } catch (error) {
          console.error('❌ Error creating user:', error)
          router.push('/dashboard')
        }
      }

      createUser()
    }
  }, [isLoaded, isSignedIn, user, hasCreatedUser, router])

  return <SignUp />
}
