'use client'

import React, { useState } from 'react'
import { Calendar, List, Filter, Plus, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockData } from '@/lib/db'
import { formatTime, formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import CreateAppointmentModal from '@/components/modals/CreateAppointmentModal'

const AppointmentsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [appointments, setAppointments] = useState(mockData.appointments)

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      // Optimistic update
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: newStatus }
            : apt
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast.success(`Appointment ${newStatus.toLowerCase()}`)
    } catch (error) {
      toast.error('Failed to update appointment')
      // Revert optimistic update on error
      setAppointments(mockData.appointments)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your salon appointments</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center bg-white rounded-xl border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'calendar' 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-pink-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{appointment.clientName}</h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{appointment.serviceName}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>{formatDate(appointment.date)}</span>
                      <span>{appointment.time}</span>
                      <span>{appointment.technicianName}</span>
                      <span>{appointment.duration} min</span>
                      <span className="font-medium text-green-600">${appointment.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {appointment.status === 'CONFIRMED' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'IN_PROGRESS' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateAppointmentModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />
    </div>
  )
}

export default AppointmentsPage