'use client'

import React, { useState } from 'react'
import { Save, Building, Clock, Mail, CreditCard, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const SettingsPage: React.FC = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Bloom Nails Beauty Studio',
    address: '123 Beauty Lane, Salon City, SC 12345',
    phone: '(555) 123-4567',
    email: 'info@bloomnails.com',
    website: 'www.bloomnails.com',
    timezone: 'America/New_York',
  })

  const [bookingRules, setBookingRules] = useState({
    leadTime: 24,
    cancelWindow: 2,
    maxAdvanceBooking: 60,
    bufferTime: 15,
  })

  const [integrations, setIntegrations] = useState({
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: '••••••••••••••••',
    instagramConnected: true,
    emailProvider: 'mailgun',
  })

  const handleSaveBusinessInfo = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Business information updated successfully')
    } catch (error) {
      toast.error('Failed to update business information')
    }
  }

  const handleSaveBookingRules = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Booking rules updated successfully')
    } catch (error) {
      toast.error('Failed to update booking rules')
    }
  }

  const handleSaveIntegrations = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Integrations updated successfully')
    } catch (error) {
      toast.error('Failed to update integrations')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your salon's configuration and preferences</p>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-pink-100 rounded-xl">
            <Building className="h-5 w-5 text-pink-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={businessInfo.phone}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={businessInfo.email}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={businessInfo.website}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={businessInfo.timezone}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, timezone: e.target.value }))}
              className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveBusinessInfo}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Booking Rules */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Booking Rules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="leadTime">Minimum Lead Time (hours)</Label>
            <Input
              id="leadTime"
              type="number"
              value={bookingRules.leadTime}
              onChange={(e) => setBookingRules(prev => ({ ...prev, leadTime: parseInt(e.target.value) }))}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum time before appointment can be booked</p>
          </div>

          <div>
            <Label htmlFor="cancelWindow">Cancellation Window (hours)</Label>
            <Input
              id="cancelWindow"
              type="number"
              value={bookingRules.cancelWindow}
              onChange={(e) => setBookingRules(prev => ({ ...prev, cancelWindow: parseInt(e.target.value) }))}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum time before appointment to allow cancellation</p>
          </div>

          <div>
            <Label htmlFor="maxAdvanceBooking">Max Advance Booking (days)</Label>
            <Input
              id="maxAdvanceBooking"
              type="number"
              value={bookingRules.maxAdvanceBooking}
              onChange={(e) => setBookingRules(prev => ({ ...prev, maxAdvanceBooking: parseInt(e.target.value) }))}
            />
            <p className="text-xs text-gray-500 mt-1">Maximum days in advance clients can book</p>
          </div>

          <div>
            <Label htmlFor="bufferTime">Buffer Time (minutes)</Label>
            <Input
              id="bufferTime"
              type="number"
              value={bookingRules.bufferTime}
              onChange={(e) => setBookingRules(prev => ({ ...prev, bufferTime: parseInt(e.target.value) }))}
            />
            <p className="text-xs text-gray-500 mt-1">Time between appointments for cleanup</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveBookingRules}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-xl">
            <CreditCard className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
        </div>

        <div className="space-y-6">
          {/* Stripe */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Stripe Payment Processing</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stripePublicKey">Public Key</Label>
                <Input
                  id="stripePublicKey"
                  value={integrations.stripePublicKey}
                  onChange={(e) => setIntegrations(prev => ({ ...prev, stripePublicKey: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="stripeSecretKey">Secret Key</Label>
                <Input
                  id="stripeSecretKey"
                  type="password"
                  value={integrations.stripeSecretKey}
                  onChange={(e) => setIntegrations(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-gray-600" />
                <h3 className="font-medium text-gray-900">Instagram Integration</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  integrations.instagramConnected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {integrations.instagramConnected ? 'Connected' : 'Disconnected'}
                </span>
                <Button size="sm" variant="outline">
                  {integrations.instagramConnected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              Connect your Instagram account to automatically post your work to your business profile.
            </p>
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Email Provider</h3>
            </div>
            
            <div>
              <Label htmlFor="emailProvider">Provider</Label>
              <select
                id="emailProvider"
                value={integrations.emailProvider}
                onChange={(e) => setIntegrations(prev => ({ ...prev, emailProvider: e.target.value }))}
                className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="mailgun">Mailgun</option>
                <option value="sendgrid">SendGrid</option>
                <option value="ses">Amazon SES</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveIntegrations}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage