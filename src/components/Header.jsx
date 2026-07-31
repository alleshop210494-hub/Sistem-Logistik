import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';

export default function Header({ activeTab, setIsSidebarOpen }) {
  const { user } = useUser();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          ☰
        </button>
        <h2 className="text-lg font-semibold capitalize text-slate-800">
          {activeTab === 'dashboard' && 'Ringkasan Dashboard'}
          {activeTab === 'shipments' && 'Manajemen Pengiriman'}
          {activeTab === 'tracking' && 'Pelacakan Resi Cepat'}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-slate-800">
            {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'User'}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold">Active Session</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}