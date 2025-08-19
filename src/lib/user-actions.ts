'use client'

export const createUserInDatabase = async (userData: {
  clerkId: string
  email: string
  name?: string
  profileImage?: string
}) => {
  try {
    console.log('🔍 Calling create-user API with:', userData)
    
    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const result = await response.json()
    
    if (result.success) {
      console.log('✅ User created successfully:', result.user)
      return { success: true, user: result.user }
    } else {
      console.error('❌ Failed to create user:', result.error)
      return { success: false, error: result.error }
    }
    
  } catch (error) {
    console.error('❌ Error calling create-user API:', error)
    return { success: false, error: 'Network error' }
  }
}

// Function to be called after successful Clerk signup
export const handleUserSignup = async (user: any) => {
  if (!user) {
    console.error('❌ No user data provided')
    return { success: false, error: 'No user data' }
  }
  
  console.log('🔍 Processing user data:', {
    id: user.id,
    email: user.emailAddresses?.[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    externalAccounts: user.externalAccounts
  })
  
  const userData = {
    clerkId: user.id,
    email: user.emailAddresses?.[0]?.emailAddress || '',
    name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
    profileImage: user.imageUrl || '',
  }
  
  console.log('🔍 Prepared user data for database:', userData)
  
  return await createUserInDatabase(userData)
}
