import React from 'react'
import { Calendar, Clock, DollarSign, UserPlus } from 'lucide-react'

const metrics = [
  {
    id: 'appointments',
    title: 'Total Appointments Today',
    value: '12',
    change: '+2 from yesterday',
    changeType: 'positive',
    icon: Calendar,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'pending',
    title: 'Payments Pending',
    value: '$485',
    change: '3 pending payments',
    changeType: 'neutral',
    icon: Clock,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'revenue',
    title: 'Revenue MTD',
    value: '$8,240',
    change: '+12% from last month',
    changeType: 'positive',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'newclients',
    title: 'New Clients This Week',
    value: '7',
    change: '+3 from last week',
    changeType: 'positive',
    icon: UserPlus,
    color: 'from-purple-500 to-indigo-500'
  }
]

const MetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => {
        const Icon = metric.icon
        
        return (
          <div
            key={metric.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
              <p className={`text-xs font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' :
                metric.changeType === 'negative' ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {metric.change}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MetricsCards