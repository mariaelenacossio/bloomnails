'use client'

import React, { useState } from 'react'
import { Menu, Bell, User, ChevronDown } from 'lucide-react'

interface TopBarProps {
  setSidebarOpen: (open: boolean) => void
}

const TopBar: React.FC<TopBarProps> = ({ setSidebarOpen }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  
  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning'
    if (currentHour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side - Mobile menu + Greeting */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}, Sofia 🌸
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Right side - Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">Sofia Martinez</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Your Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Settings
                </a>
                <div className="border-t border-gray-200 my-2"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar