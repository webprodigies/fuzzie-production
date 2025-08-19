'use client'
import React, { useEffect, useState } from 'react'
import { Search, Bell, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UserButton } from '@clerk/nextjs'
import { useBilling } from '@/providers/billing-provider'
import { onPaymentDetails } from '@/app/(main)/(pages)/billing/_actions/payment-connecetions'
import clsx from 'clsx'

type Props = {}

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling()
  const [searchQuery, setSearchQuery] = useState('')

  const onGetPayment = async () => {
    const response = await onPaymentDetails()
    if (response) {
      setTier(response.tier!)
      setCredits(response.credits!)
    }
  }

  useEffect(() => {
    onGetPayment()
  }, [])

  return (
    <div className="navbar-minimal flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-minimal pl-10 h-9"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Credits */}
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">
            {tier === 'Unlimited' ? '∞' : credits}
          </span>
          {tier !== 'Unlimited' && (
            <span className="text-xs ml-1">
              / {tier === 'Free' ? '10' : '100'}
            </span>
          )}
        </div>

        {/* Actions */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button className="btn-ghost h-9 w-9 p-0">
                <Bell className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button className="btn-ghost h-9 w-9 p-0">
                <Settings className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User */}
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            }
          }}
        />
      </div>
    </div>
  )
}

export default InfoBar