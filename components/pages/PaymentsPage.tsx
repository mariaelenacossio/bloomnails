'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const mockPayments = [
  {
    id: '1',
    clientName: 'Emma Watson',
    appointmentId: '1',
    serviceName: 'Gel Manicure + Art',
    amount: 65,
    status: 'PENDING',
    dueDate: new Date().toISOString(),
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    appointmentId: '2',
    serviceName: 'French Pedicure',
    amount: 45,
    status: 'PAID',
    paidDate: new Date().toISOString(),
  },
]

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState(mockPayments)

  const handleSendPayLink = async (paymentId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Payment link sent to client')
    } catch (error) {
      toast.error('Failed to send payment link')
    }
  }

  const handleMarkPaid = async (paymentId: string) => {
    try {
      // Optimistic update
      setPayments(prev => 
        prev.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status: 'PAID', paidDate: new Date().toISOString() }
            : payment
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast.success('Payment marked as paid')
    } catch (error) {
      toast.error('Failed to update payment')
      // Revert optimistic update on error
      setPayments(mockPayments)
    }
  }

  const handleRefund = async (paymentId: string) => {
    if (!confirm('Are you sure you want to refund this payment?')) return

    try {
      // Optimistic update
      setPayments(prev => 
        prev.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status: 'REFUNDED' }
            : payment
        )
      )

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Payment refunded successfully')
    } catch (error) {
      toast.error('Failed to process refund')
      // Revert optimistic update on error
      setPayments(mockPayments)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REFUNDED':
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
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Manage client payments and transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Payments</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0))}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Paid Today</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0))}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Refunded</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(payments.filter(p => p.status === 'REFUNDED').reduce((sum, p) => sum + p.amount, 0))}
          </p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-pink-600">
                          {payment.clientName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{payment.clientName}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{payment.serviceName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">
                      {payment.paidDate ? formatDate(payment.paidDate) : formatDate(payment.dueDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      {payment.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendPayLink(payment.id)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send Link
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleMarkPaid(payment.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Paid
                          </Button>
                        </>
                      )}
                      
                      {payment.status === 'PAID' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRefund(payment.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Refund
                        </Button>
                      )}
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

export default PaymentsPage