'use client'

import React, { useState } from 'react'
import { Upload, Instagram, Eye, Trash2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const mockMedia = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    clientName: 'Emma W.',
    technicianName: 'Maria R.',
    serviceName: 'Gel Manicure + Art',
    published: true,
    instagramPosted: false,
    uploadDate: new Date().toISOString(),
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    clientName: 'Sarah J.',
    technicianName: 'Ana L.',
    serviceName: 'French Pedicure',
    published: false,
    instagramPosted: false,
    uploadDate: new Date().toISOString(),
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    clientName: 'Lisa C.',
    technicianName: 'Sofia M.',
    serviceName: 'Acrylic Full Set',
    published: true,
    instagramPosted: true,
    uploadDate: new Date().toISOString(),
  },
]

const MediaPage: React.FC = () => {
  const [media, setMedia] = useState(mockMedia)

  const handleUpload = async () => {
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload image')
    }
  }

  const handleTogglePublish = async (mediaId: string) => {
    try {
      // Optimistic update
      setMedia(prev => 
        prev.map(item => 
          item.id === mediaId 
            ? { ...item, published: !item.published }
            : item
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const item = media.find(m => m.id === mediaId)
      toast.success(`Image ${item?.published ? 'unpublished' : 'published'}`)
    } catch (error) {
      toast.error('Failed to update image')
      // Revert optimistic update on error
      setMedia(mockMedia)
    }
  }

  const handlePostToInstagram = async (mediaId: string) => {
    try {
      // Optimistic update
      setMedia(prev => 
        prev.map(item => 
          item.id === mediaId 
            ? { ...item, instagramPosted: true }
            : item
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Posted to Instagram successfully')
    } catch (error) {
      toast.error('Failed to post to Instagram')
      // Revert optimistic update on error
      setMedia(mockMedia)
    }
  }

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      // Optimistic update
      setMedia(prev => prev.filter(item => item.id !== mediaId))

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast.success('Image deleted successfully')
    } catch (error) {
      toast.error('Failed to delete image')
      // Revert optimistic update on error
      setMedia(mockMedia)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-600 mt-1">Manage your salon's work portfolio</p>
        </div>
        
        <Button onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Images</h3>
          <p className="text-2xl font-bold text-gray-900">{media.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Published</h3>
          <p className="text-2xl font-bold text-green-600">
            {media.filter(m => m.published).length}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Instagram Posts</h3>
          <p className="text-2xl font-bold text-purple-600">
            {media.filter(m => m.instagramPosted).length}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Drafts</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {media.filter(m => !m.published).length}
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative aspect-square">
              <img
                src={item.url}
                alt={`Work by ${item.technicianName}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-white">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="bg-white text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  item.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.published ? 'Published' : 'Draft'}
                </span>
                {item.instagramPosted && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium">
                    Instagram
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900">{item.clientName}</h3>
                <p className="text-sm text-gray-600">{item.serviceName}</p>
                <p className="text-xs text-gray-500">by {item.technicianName}</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTogglePublish(item.id)}
                  className="flex-1"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {item.published ? 'Unpublish' : 'Publish'}
                </Button>
                
                {!item.instagramPosted && (
                  <Button
                    size="sm"
                    onClick={() => handlePostToInstagram(item.id)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Instagram className="h-4 w-4 mr-1" />
                    Post
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediaPage