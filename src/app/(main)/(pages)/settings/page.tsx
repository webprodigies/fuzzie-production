import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { db, ensureDbConnection } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

type Props = {}

const Settings = async (props: Props) => {
  const authUser = await currentUser()

  console.log('authUser:', authUser)
  if (!authUser) return null

  try {
    await ensureDbConnection()
    const user = await db.user.findUnique({ where: { clerkId: authUser.id } })
    
    const removeProfileImage = async () => {
      'use server'
      try {
        await ensureDbConnection()
        const response = await db.user.update({
          where: {
            clerkId: authUser.id,
          },
          data: {
            profileImage: '',
          },
        })
        return response
      } catch (error) {
        console.error('❌ Error removing profile image:', error)
        throw new Error('Failed to remove profile image')
      }
    }

    const uploadProfileImage = async (image: string) => {
      'use server'
      try {
        await ensureDbConnection()
        const id = authUser.id
        const response = await db.user.update({
          where: {
            clerkId: id,
          },
          data: {
            profileImage: image,
          },
        })
        return response
      } catch (error) {
        console.error('❌ Error uploading profile image:', error)
        throw new Error('Failed to upload profile image')
      }
    }

    const updateUserInfo = async (name: string) => {
      'use server'
      try {
        await ensureDbConnection()
        const updateUser = await db.user.update({
          where: {
            clerkId: authUser.id,
          },
          data: {
            name,
          },
        })
        return updateUser
      } catch (error) {
        console.error('❌ Error updating user info:', error)
        throw new Error('Failed to update user info')
      }
    }

    return (
      <div className="flex flex-col gap-4">
        <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
          <span>Settings</span>
        </h1>
        <div className="flex flex-col gap-10 p-6">
          <div>
            <h2 className="text-2xl font-bold">User Profile</h2>
            <p className="text-base text-white/50">
              Add or update your information
            </p>
          </div>
          <ProfilePicture
            onDelete={removeProfileImage}
            userImage={user?.profileImage || ''}
            onUpload={uploadProfileImage}
          />
          <ProfileForm
            user={user}
            onUpdate={updateUserInfo}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('❌ Error loading settings:', error)
    return (
      <div className="flex flex-col gap-4">
        <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
          <span>Settings</span>
        </h1>
        <div className="p-6">
          <p className="text-red-500">Error loading settings. Please try again.</p>
        </div>
      </div>
    )
  }
}

export default Settings
