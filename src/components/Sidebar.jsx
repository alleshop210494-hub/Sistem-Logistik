import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-xl`}>
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider text-blue-400">📦 LogistikCloud</h1>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('shipments'); setIsSidebarOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'shipments' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            🚚 Daftar Pengiriman
          </button>
          <button 
            onClick={() => { setActiveTab('tracking'); setIsSidebarOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'tracking' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            🔍 Lacak Resi
          </button>
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400 text-center">
        StackBlitz React Cloud System
      </div>
    </aside>
  );
}