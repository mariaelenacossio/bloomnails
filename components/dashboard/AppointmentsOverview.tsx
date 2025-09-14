import React from 'react'
import { Clock, User, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react'
import { mockData } from '@/lib/db'

const AppointmentsOverview: React.FC = () => {
  const appointments = mockData.appointments

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-pink-600" />
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
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.time}</span>
                  </span>
                  <span>{appointment.technicianName}</span>
                  <span>{appointment.duration} min</span>
                  <span className="font-medium text-green-600">${appointment.price}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                <CheckCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                <XCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppointmentsOverview