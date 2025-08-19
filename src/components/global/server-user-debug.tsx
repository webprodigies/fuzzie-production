import { currentUser } from '@clerk/nextjs'

export default async function ServerUserDebug() {
  const user = await currentUser()
  
  console.log('🔍 Server-side User Debug Info:')
  console.log('Current user:', user)
  console.log('User ID:', user?.id)
  console.log('User email:', user?.emailAddresses?.[0]?.emailAddress)
  console.log('User name:', user?.firstName, user?.lastName)

  if (!user) {
    return (
      <div className="fixed bottom-4 left-4 bg-red-800 text-white p-2 rounded text-xs z-50">
        <div>Server: Not signed in</div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 bg-green-800 text-white p-2 rounded text-xs z-50">
      <div>Server: {user.id}</div>
      <div>Email: {user.emailAddresses?.[0]?.emailAddress}</div>
    </div>
  )
}
