import React from 'react'
import { Instagram, Upload, Heart, MessageCircle } from 'lucide-react'

const mediaItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    client: 'Emma W.',
    technician: 'Maria R.',
    likes: 24,
    comments: 8,
    published: true
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    client: 'Sarah J.',
    technician: 'Ana L.',
    likes: 18,
    comments: 5,
    published: false
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    client: 'Lisa C.',
    technician: 'Sofia M.',
    likes: 31,
    comments: 12,
    published: true
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/3997421/pexels-photo-3997421.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    client: 'Rachel G.',
    technician: 'Maria R.',
    likes: 0,
    comments: 0,
    published: false
  }
]

const MediaHighlights: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Latest Work</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200">
          <Upload className="h-4 w-4" />
          <span className="text-sm font-medium">Upload New</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <div key={item.id} className="group relative">
            <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
              <img
                src={item.image}
                alt={`Work by ${item.technician}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <Instagram className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  item.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-900">{item.client}</p>
              <p className="text-xs text-gray-500 mb-2">by {item.technician}</p>
              
              {item.published && (
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{item.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{item.comments}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full py-3 text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200">
          View Gallery →
        </button>
      </div>
    </div>
  )
}

export default MediaHighlights