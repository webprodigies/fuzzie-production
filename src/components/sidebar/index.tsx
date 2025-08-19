'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'

type Props = {}

const MenuOptions = (props: Props) => {
  const pathName = usePathname()

  return (
    <nav className="sidebar-minimal flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b">
        <Link href="/" className="text-lg font-semibold text-[var(--accent-color)]">
          f
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        <TooltipProvider>
          <div className="flex flex-col gap-2 px-2">
            {menuOptions.map((menuItem) => (
              <Tooltip key={menuItem.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={menuItem.href}
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-lg transition-colors mx-auto',
                      {
                        'bg-[var(--accent-color)] text-white': pathName === menuItem.href,
                        'text-muted-foreground hover:text-foreground hover:bg-muted': pathName !== menuItem.href,
                      }
                    )}
                  >
                    <menuItem.Component selected={pathName === menuItem.href} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm">
                  {menuItem.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </nav>
  )
}

export default MenuOptions