import MetricsCards from '@/components/dashboard/MetricsCards'
import QuickActions from '@/components/dashboard/QuickActions'
import AppointmentsOverview from '@/components/dashboard/AppointmentsOverview'
import TechnicianPerformance from '@/components/dashboard/TechnicianPerformance'
import ClientActivity from '@/components/dashboard/ClientActivity'
import MediaHighlights from '@/components/dashboard/MediaHighlights'
import RightSidebar from '@/components/dashboard/RightSidebar'

export default function DashboardPage() {
  return (
    <>
      <MetricsCards />
      <QuickActions />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 space-y-6">
          <AppointmentsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TechnicianPerformance />
            <ClientActivity />
          </div>
          <MediaHighlights />
        </div>
        <div className="xl:col-span-1">
          <RightSidebar />
        </div>
      </div>
    </>
  )
}