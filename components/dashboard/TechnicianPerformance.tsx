import React from 'react'
import { Star, TrendingUp } from 'lucide-react'
import { mockData } from '@/lib/db'

const TechnicianPerformance: React.FC = () => {
  const technicians = mockData.technicians.map((tech, index) => ({
    ...tech,
    bookings: [28, 24, 22][index] || 20,
    revenue: ['$1,850', '$1,620', '$1,480'][index] || '$1,200'
  }))

  const maxBookings = Math.max(...technicians.map(t => t.bookings))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Top Technicians</h2>
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>

      <div className="space-y-4">
        {technicians.map((tech, index) => {
          const percentage = (tech.bookings / maxBookings) * 100
          
          return (
            <div key={tech.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{tech.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{tech.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{tech.bookings} bookings</p>
                  <p className="text-sm text-green-600">{tech.revenue}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    index === 0 ? 'from-pink-400 to-rose-500' :
                    index === 1 ? 'from-purple-400 to-indigo-500' :
                    'from-emerald-400 to-teal-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TechnicianPerformance