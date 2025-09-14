'use client'

import React, { useState } from 'react'
import { Plus, Star, Edit, UserX, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockData } from '@/lib/db'
import { toast } from 'sonner'
import CreateTechnicianModal from '@/components/modals/CreateTechnicianModal'

const TechniciansPage: React.FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [technicians, setTechnicians] = useState(mockData.technicians)

  const handleToggleActive = async (technicianId: string) => {
    try {
      // Optimistic update
      setTechnicians(prev => 
        prev.map(tech => 
          tech.id === technicianId 
            ? { ...tech, active: !tech.active }
            : tech
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const technician = technicians.find(t => t.id === technicianId)
      toast.success(`Technician ${technician?.active ? 'disabled' : 'enabled'}`)
    } catch (error) {
      toast.error('Failed to update technician')
      // Revert optimistic update on error
      setTechnicians(mockData.technicians)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Technicians</h1>
          <p className="text-gray-600 mt-1">Manage your salon staff</p>
        </div>
        
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Technician
        </Button>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicians.map((technician) => (
          <div
            key={technician.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">{technician.avatar}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{technician.name}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{technician.rating}</span>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium mt-2 ${
                  technician.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {technician.active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {technician.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {technician.phone}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Specialties:</p>
              <div className="flex flex-wrap gap-1">
                {technician.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-lg"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleActive(technician.id)}
                className={technician.active ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-green-600 border-green-200 hover:bg-green-50'}
              >
                <UserX className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateTechnicianModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />
    </div>
  )
}

export default TechniciansPage