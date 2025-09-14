import React from 'react';
import { DollarSign, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Payment Overdue',
    message: 'Jennifer A. has an overdue payment of $75',
    time: '2h ago',
    icon: AlertCircle,
    color: 'text-amber-600 bg-amber-100'
  },
  {
    id: 2,
    type: 'info',
    title: 'Appointment Cancelled',
    message: 'Sarah J. cancelled her 3 PM appointment',
    time: '4h ago',
    icon: Calendar,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 3,
    type: 'success',
    title: 'New Booking',
    message: 'Michelle L. booked a gel manicure for tomorrow',
    time: '6h ago',
    icon: Calendar,
    color: 'text-green-600 bg-green-100'
  }
];

const weeklyRevenue = [
  { day: 'Mon', amount: 850 },
  { day: 'Tue', amount: 720 },
  { day: 'Wed', amount: 960 },
  { day: 'Thu', amount: 1100 },
  { day: 'Fri', amount: 1350 },
  { day: 'Sat', amount: 1800 },
  { day: 'Sun', amount: 680 }
];

const RightSidebar: React.FC = () => {
  const maxRevenue = Math.max(...weeklyRevenue.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Weekly Revenue</h3>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        
        <div className="space-y-3">
          {weeklyRevenue.map((day) => {
            const percentage = (day.amount / maxRevenue) * 100;
            
            return (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-8">{day.day}</span>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 text-right">
                  ${day.amount}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-lg font-bold text-gray-900">
              ${weeklyRevenue.reduce((sum, day) => sum + day.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
          <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
            {notifications.length}
          </span>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            
            return (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className={`p-2 rounded-lg ${notification.color} flex-shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200">
            View All Notifications
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Average Service Time</span>
            <span className="text-sm font-medium text-gray-900">52 min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Client Retention Rate</span>
            <span className="text-sm font-medium text-green-600">87%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Most Popular Service</span>
            <span className="text-sm font-medium text-gray-900">Gel Manicure</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Next Week Bookings</span>
            <span className="text-sm font-medium text-gray-900">34</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;