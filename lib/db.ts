import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Mock data for development
export const mockData = {
  appointments: [
    {
      id: '1',
      clientName: 'Emma Watson',
      clientEmail: 'emma@example.com',
      technicianId: '1',
      technicianName: 'Maria Rodriguez',
      serviceId: '1',
      serviceName: 'Gel Manicure + Art',
      date: new Date().toISOString(),
      time: '09:00',
      duration: 60,
      price: 65,
      status: 'CONFIRMED',
      notes: 'Client prefers pink colors'
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      technicianId: '2',
      technicianName: 'Ana Lopez',
      serviceId: '2',
      serviceName: 'French Pedicure',
      date: new Date().toISOString(),
      time: '10:30',
      duration: 45,
      price: 45,
      status: 'IN_PROGRESS',
      notes: ''
    }
  ],
  technicians: [
    {
      id: '1',
      name: 'Maria Rodriguez',
      email: 'maria@bloomnails.com',
      phone: '(555) 123-4567',
      specialties: ['Gel Manicure', 'Nail Art', 'Acrylic'],
      rating: 4.9,
      active: true,
      avatar: 'MR'
    },
    {
      id: '2',
      name: 'Ana Lopez',
      email: 'ana@bloomnails.com',
      phone: '(555) 234-5678',
      specialties: ['Pedicure', 'French Manicure'],
      rating: 4.8,
      active: true,
      avatar: 'AL'
    }
  ],
  services: [
    {
      id: '1',
      name: 'Gel Manicure + Art',
      description: 'Professional gel manicure with custom nail art',
      price: 65,
      duration: 60,
      category: 'Manicure',
      active: true
    },
    {
      id: '2',
      name: 'French Pedicure',
      description: 'Classic French pedicure with relaxing foot massage',
      price: 45,
      duration: 45,
      category: 'Pedicure',
      active: true
    }
  ],
  clients: [
    {
      id: '1',
      name: 'Emma Watson',
      email: 'emma@example.com',
      phone: '(555) 111-2222',
      lastVisit: new Date().toISOString(),
      totalSpent: 320,
      visits: 5
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 333-4444',
      lastVisit: new Date().toISOString(),
      totalSpent: 180,
      visits: 3
    }
  ]
}