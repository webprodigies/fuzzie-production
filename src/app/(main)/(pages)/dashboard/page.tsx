import React from 'react'
import UserCreator from '@/components/auth/user-creator'
import BillingDashboard from '../billing/_components/billing-dashboard'

const DashboardPage = () => {
  console.log('🔍 Dashboard page is rendering')
  
  return (
    <div className="flex flex-col gap-4 relative">
      <UserCreator />
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Dashboard
      </h1>
      <div className="p-6">
        <p className="text-lg mb-6">Welcome to your dashboard!</p>
        <p className="text-sm text-gray-500 mb-8">If you can see this, the dashboard is working.</p>
        
        {/* Subscription Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
          <BillingDashboard />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
