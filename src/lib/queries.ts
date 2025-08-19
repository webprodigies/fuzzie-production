import { db, ensureDbConnection } from '@/lib/db'

export interface CreateUserData {
  clerkId: string
  email: string
  name?: string
  profileImage?: string
}

export const createUserInDatabase = async (userData: CreateUserData) => {
  try {
    console.log('🔍 Creating user in database:', userData)
    
    // Connect to database
    await ensureDbConnection()
    
    // Create or update user
    const user = await db.user.upsert({
      where: { clerkId: userData.clerkId },
      update: {
        email: userData.email,
        name: userData.name || '',
        profileImage: userData.profileImage || '',
      },
      create: {
        clerkId: userData.clerkId,
        email: userData.email,
        name: userData.name || '',
        profileImage: userData.profileImage || '',
      },
    })
    
    console.log('✅ User created/updated successfully:', user.id)
    return { success: true, user }
    
  } catch (error) {
    console.error('❌ Error creating user:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const getUserFromDatabase = async (clerkId: string) => {
  try {
    await ensureDbConnection()
    const user = await db.user.findUnique({
      where: { clerkId }
    })
    return { success: true, user }
  } catch (error) {
    console.error('❌ Error getting user:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
