'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  UserCheck, 
  CreditCard, 
  Image, 
  Mail, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'appointments', name: 'Appointments', icon: Calendar, href: '/dashboard/appointments' },
  { id: 'technicians', name: 'Technicians', icon: Users, href: '/dashboard/technicians' },
  { id: 'services', name: 'Services', icon: Scissors, href: '/dashboard/services' },
  { id: 'clients', name: 'Clients', icon: UserCheck, href: '/dashboard/clients' },
  { id: 'payments', name: 'Payments', icon: CreditCard, href: '/dashboard/payments' },
  { id: 'media', name: 'Media / Gallery', icon: Image, href: '/dashboard/media' },
  { id: 'campaigns', name: 'Campaigns', icon: Mail, href: '/dashboard/campaigns' },
  { id: 'settings', name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white shadow-xl">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-pink-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Bloom Nails
                </h2>
                <p className="text-xs text-gray-500">Beauty Studio</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-pink-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-pink-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Bloom Nails
                </h2>
                <p className="text-xs text-gray-500">Beauty Studio</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-pink-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar