import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MetricsCards from './components/MetricsCards';
import QuickActions from './components/QuickActions';
import AppointmentsOverview from './components/AppointmentsOverview';
import TechnicianPerformance from './components/TechnicianPerformance';
import ClientActivity from './components/ClientActivity';
import MediaHighlights from './components/MediaHighlights';
import RightSidebar from './components/RightSidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Top Bar */}
          <TopBar setSidebarOpen={setSidebarOpen} />

          {/* Dashboard Content */}
          <main className="p-4 lg:p-8">
            {/* Metrics Cards */}
            <MetricsCards />

            {/* Quick Actions */}
            <QuickActions />

            {/* Dashboard Widgets Grid */}
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
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;