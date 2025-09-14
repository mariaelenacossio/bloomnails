'use client'

import React, { useState } from 'react'
import { Plus, Eye, Edit, UserX, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockData } from '@/lib/db'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState(mockData.clients)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeactivateClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to deactivate this client?')) return

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast.success('Client deactivated successfully')
    } catch (error) {
      toast.error('Failed to deactivate client')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client database</p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Last Visit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Visits</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-pink-600">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{formatDate(client.lastVisit)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">
                      {formatCurrency(client.totalSpent)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{client.visits}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeactivateClient(client.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClientsPage