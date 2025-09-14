'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockData } from '@/lib/db'

const appointmentSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Valid email is required'),
  technicianId: z.string().min(1, 'Technician is required'),
  serviceId: z.string().min(1, 'Service is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  notes: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

interface CreateAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Creating appointment:', data)
      toast.success('Appointment created successfully!')
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create appointment')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              {...register('clientName')}
              placeholder="Enter client name"
            />
            {errors.clientName && (
              <p className="text-sm text-red-600 mt-1">{errors.clientName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              {...register('clientEmail')}
              placeholder="Enter client email"
            />
            {errors.clientEmail && (
              <p className="text-sm text-red-600 mt-1">{errors.clientEmail.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="technicianId">Technician</Label>
            <select
              id="technicianId"
              {...register('technicianId')}
              className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select technician</option>
              {mockData.technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
            </select>
            {errors.technicianId && (
              <p className="text-sm text-red-600 mt-1">{errors.technicianId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="serviceId">Service</Label>
            <select
              id="serviceId"
              {...register('serviceId')}
              className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select service</option>
              {mockData.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
            {errors.serviceId && (
              <p className="text-sm text-red-600 mt-1">{errors.serviceId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                {...register('time')}
              />
              {errors.time && (
                <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <textarea
              id="notes"
              {...register('notes')}
              placeholder="Any special requests or notes"
              className="flex min-h-[80px] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAppointmentModal