'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockData } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'
import CreateServiceModal from '@/components/modals/CreateServiceModal'

const ServicesPage: React.FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [services, setServices] = useState(mockData.services)

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      // Optimistic update
      setServices(prev => prev.filter(service => service.id !== serviceId))

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast.success('Service deleted successfully')
    } catch (error) {
      toast.error('Failed to delete service')
      // Revert optimistic update on error
      setServices(mockData.services)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Manage your salon services and pricing</p>
        </div>
        
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-lg font-medium">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(service.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{service.duration} min</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      service.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        <Image className="h-4 w-4 mr-1" />
                        Images
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateServiceModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />
    </div>
  )
}

export default ServicesPage