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

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
})

type CampaignFormData = z.infer<typeof campaignSchema>

interface CreateCampaignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  })

  const onSubmit = async (data: CampaignFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Creating campaign:', data)
      toast.success('Campaign created successfully!')
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create campaign')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Email Campaign</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter campaign name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="Enter email subject"
            />
            {errors.subject && (
              <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <select
              id="targetAudience"
              {...register('targetAudience')}
              className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select audience</option>
              <option value="all">All Clients</option>
              <option value="new">New Clients</option>
              <option value="regular">Regular Clients</option>
              <option value="inactive">Inactive Clients</option>
            </select>
            {errors.targetAudience && (
              <p className="text-sm text-red-600 mt-1">{errors.targetAudience.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              {...register('message')}
              placeholder="Enter your campaign message"
              className="flex min-h-[120px] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
            />
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
            )}
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
              {isSubmitting ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCampaignModal