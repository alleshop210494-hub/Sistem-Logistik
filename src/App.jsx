import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Tracking from './pages/Tracking';
import { getShipments } from './services/neonService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shipments, setShipments] = useState([
    { id: 'LOG-001', destination: 'Jakarta', status: 'Dalam Perjalanan', recipient: 'Budi Santoso' },
    { id: 'LOG-002', destination: 'Bandung', status: 'Tiba di Gudang', recipient: 'Siti Rahma' },
    { id: 'LOG-003', destination: 'Surabaya', status: 'Pending', recipient: 'Ahmad Dani' },
  ]);

  const fetchShipmentsData = async () => {
    try {
      const data = await getShipments();
      if (data && data.length > 0) {
        setShipments(data);
      }
    } catch (err) {
      console.error("Gagal memuat data dari Neon:", err);
    }
  };

  useEffect(() => {
    fetchShipmentsData();
  }, []);

  return (
    <>
      {/* 1. TAMPILAN KETIKA USER BELUM LOGIN (Signed Out) */}
      <SignedOut>
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl text-center">
            <div className="text-4xl mb-4">📦</div>
            <h1 className="text-2xl font-bold text-white mb-2">LogistikCloud System</h1>
            <p className="text-slate-400 text-sm mb-6">
              Silakan masuk menggunakan akun Anda untuk mengelola dan melacak pengiriman logistik secara real-time.
            </p>
            <SignInButton mode="modal">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                Masuk / Daftar (Clerk Auth)
              </button>
            </SignInButton>
            <div className="mt-6 text-xs text-slate-500">
              Didukung oleh React, Tailwind, Neon, Clerk, & Cloudflare R2
            </div>
          </div>
        </div>
      </SignedOut>

      {/* 2. TAMPILAN KETIKA USER SUDAH LOGIN (Signed In) */}
      <SignedIn>
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
          
          {/* SIDEBAR */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen} 
          />

          {/* MAIN CONTENT WRAPPER */}
          <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
            
            {/* HEADER */}
            <Header activeTab={activeTab} setIsSidebarOpen={setIsSidebarOpen} />

            {/* CONTENT AREA */}
            <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
              {activeTab === 'dashboard' && <Dashboard shipments={shipments} />}
              {activeTab === 'shipments' && <Shipments shipments={shipments} refreshData={fetchShipmentsData} />}
              {activeTab === 'tracking' && <Tracking shipments={shipments} />}
            </main>
          </div>

        </div>
      </SignedIn>
    </>
  );
}