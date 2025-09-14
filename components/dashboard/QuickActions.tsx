'use client'

import React, { useState } from 'react'
import { Plus, UserPlus, Scissors, Send } from 'lucide-react'
import CreateAppointmentModal from '@/components/modals/CreateAppointmentModal'
import CreateServiceModal from '@/components/modals/CreateServiceModal'
import CreateTechnicianModal from '@/components/modals/CreateTechnicianModal'
import CreateCampaignModal from '@/components/modals/CreateCampaignModal'

const QuickActions: React.FC = () => {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [technicianModalOpen, setTechnicianModalOpen] = useState(false)
  const [campaignModalOpen, setCampaignModalOpen] = useState(false)

  const actions = [
    {
      id: 'appointment',
      title: 'Add Appointment',
      icon: Plus,
      color: 'from-pink-500 to-rose-500',
      hoverColor: 'hover:from-pink-600 hover:to-rose-600',
      onClick: () => setAppointmentModalOpen(true)
    },
    {
      id: 'service',
      title: 'Add Service',
      icon: Scissors,
      color: 'from-purple-500 to-indigo-500',
      hoverColor: 'hover:from-purple-600 hover:to-indigo-600',
      onClick: () => setServiceModalOpen(true)
    },
    {
      id: 'technician',
      title: 'Add Technician',
      icon: UserPlus,
      color: 'from-emerald-500 to-teal-500',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-600',
      onClick: () => setTechnicianModalOpen(true)
    },
    {
      id: 'campaign',
      title: 'Send Campaign',
      icon: Send,
      color: 'from-amber-500 to-orange-500',
      hoverColor: 'hover:from-amber-600 hover:to-orange-600',
      onClick: () => setCampaignModalOpen(true)
    }
  ]

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} ${action.hoverColor} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modals */}
      <CreateAppointmentModal 
        open={appointmentModalOpen} 
        onOpenChange={setAppointmentModalOpen} 
      />
      <CreateServiceModal 
        open={serviceModalOpen} 
        onOpenChange={setServiceModalOpen} 
      />
      <CreateTechnicianModal 
        open={technicianModalOpen} 
        onOpenChange={setTechnicianModalOpen} 
      />
      <CreateCampaignModal 
        open={campaignModalOpen} 
        onOpenChange={setCampaignModalOpen} 
      />
    </>
  )
}

export default QuickActions