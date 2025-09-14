'use client'

import React, { useState } from 'react'
import { Plus, Send, Eye, Copy, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import CreateCampaignModal from '@/components/modals/CreateCampaignModal'

const mockCampaigns = [
  {
    id: '1',
    name: 'Spring Special Promotion',
    subject: '🌸 Spring into Beauty - 20% Off All Services!',
    status: 'SENT',
    sentDate: new Date().toISOString(),
    recipients: 245,
    opens: 89,
    clicks: 23,
    targetAudience: 'All Clients',
  },
  {
    id: '2',
    name: 'New Client Welcome',
    subject: 'Welcome to Bloom Nails! Your first visit awaits 💅',
    status: 'DRAFT',
    recipients: 0,
    opens: 0,
    clicks: 0,
    targetAudience: 'New Clients',
  },
  {
    id: '3',
    name: 'Mother\'s Day Special',
    subject: 'Treat Mom to Something Special 💐',
    status: 'SCHEDULED',
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    recipients: 180,
    opens: 0,
    clicks: 0,
    targetAudience: 'Regular Clients',
  },
]

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const handleSendCampaign = async (campaignId: string) => {
    try {
      // Optimistic update
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, status: 'SENT', sentDate: new Date().toISOString() }
            : campaign
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Campaign sent successfully')
    } catch (error) {
      toast.error('Failed to send campaign')
      // Revert optimistic update on error
      setCampaigns(mockCampaigns)
    }
  }

  const handleDuplicateCampaign = async (campaignId: string) => {
    try {
      const originalCampaign = campaigns.find(c => c.id === campaignId)
      if (!originalCampaign) return

      const duplicatedCampaign = {
        ...originalCampaign,
        id: Date.now().toString(),
        name: `${originalCampaign.name} (Copy)`,
        status: 'DRAFT' as const,
        recipients: 0,
        opens: 0,
        clicks: 0,
      }

      setCampaigns(prev => [duplicatedCampaign, ...prev])
      
      toast.success('Campaign duplicated successfully')
    } catch (error) {
      toast.error('Failed to duplicate campaign')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'bg-green-100 text-green-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateOpenRate = (opens: number, recipients: number) => {
    if (recipients === 0) return 0
    return Math.round((opens / recipients) * 100)
  }

  const calculateClickRate = (clicks: number, recipients: number) => {
    if (recipients === 0) return 0
    return Math.round((clicks / recipients) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
          <p className="text-gray-600 mt-1">Create and manage your marketing campaigns</p>
        </div>
        
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Campaigns</h3>
          <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Sent This Month</h3>
          <p className="text-2xl font-bold text-green-600">
            {campaigns.filter(c => c.status === 'SENT').length}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Avg. Open Rate</h3>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round(campaigns.reduce((sum, c) => sum + calculateOpenRate(c.opens, c.recipients), 0) / campaigns.length) || 0}%
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Avg. Click Rate</h3>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(campaigns.reduce((sum, c) => sum + calculateClickRate(c.clicks, c.recipients), 0) / campaigns.length) || 0}%
          </p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Campaign</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Recipients</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Opens</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Clicks</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{campaign.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">Target: {campaign.targetAudience}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{campaign.recipients}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-gray-900">{campaign.opens}</span>
                      {campaign.recipients > 0 && (
                        <span className="text-xs text-gray-500 ml-1">
                          ({calculateOpenRate(campaign.opens, campaign.recipients)}%)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-gray-900">{campaign.clicks}</span>
                      {campaign.recipients > 0 && (
                        <span className="text-xs text-gray-500 ml-1">
                          ({calculateClickRate(campaign.clicks, campaign.recipients)}%)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">
                      {campaign.sentDate ? formatDate(campaign.sentDate) : 
                       campaign.scheduledDate ? `Scheduled: ${formatDate(campaign.scheduledDate)}` : 
                       'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      {campaign.status === 'SENT' && (
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDuplicateCampaign(campaign.id)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      
                      {(campaign.status === 'DRAFT' || campaign.status === 'SCHEDULED') && (
                        <Button
                          size="sm"
                          onClick={() => handleSendCampaign(campaign.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateCampaignModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />
    </div>
  )
}

export default CampaignsPage