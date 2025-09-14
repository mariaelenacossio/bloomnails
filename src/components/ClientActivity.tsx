import React from 'react';
import { UserPlus, MessageSquare, Star } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'new_client',
    name: 'Jennifer Adams',
    action: 'joined today',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'text-green-600 bg-green-100'
  },
  {
    id: 2,
    type: 'review',
    name: 'Ashley Brown',
    action: 'left a 5-star review',
    time: '4 hours ago',
    icon: Star,
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    id: 3,
    type: 'message',
    name: 'Michelle Lee',
    action: 'sent a message',
    time: '6 hours ago',
    icon: MessageSquare,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 4,
    type: 'new_client',
    name: 'Patricia Wilson',
    action: 'booked first appointment',
    time: '8 hours ago',
    icon: UserPlus,
    color: 'text-green-600 bg-green-100'
  }
];

const ClientActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.name}</span>
                  <span className="text-gray-600"> {activity.action}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientActivity;