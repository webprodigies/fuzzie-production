import React from 'react'
import Sidebar from '@/components/sidebar'
import InfoBar from '@/components/infobar'
import UserCreator from '@/components/auth/user-creator'
import AuthDebug from '@/components/global/auth-debug'

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <AuthDebug />
      <UserCreator />
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {props.children}
      </div>
    </div>
  )
}

export default Layout
