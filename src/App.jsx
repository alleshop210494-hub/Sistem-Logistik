import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Tracking from './pages/Tracking';
import Settings from './pages/Settings';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Mengambil nama perusahaan dari localStorage saat aplikasi pertama kali dimuat
  const [companyName, setCompanyName] = useState(() => {
    return localStorage.getItem('companyName') || 'Logico';
  });

  // Fungsi untuk memperbarui state sekaligus menyimpannya ke localStorage
  const handleUpdateCompanyName = (newName) => {
    setCompanyName(newName);
    localStorage.setItem('companyName', newName);
  };

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage} companyName={companyName}>
      {currentPage === 'dashboard' && <Dashboard companyName={companyName} />}
      {currentPage === 'shipments' && (
        <SignedIn>
          <Shipments />
        </SignedIn>
      )}
      {currentPage === 'tracking' && <Tracking />}
      {currentPage === 'settings' && (
        <SignedIn>
          <Settings companyName={companyName} setCompanyName={handleUpdateCompanyName} />
        </SignedIn>
      )}

      {/* Fallback jika mengakses halaman yang butuh login saat belum sign in */}
      {(currentPage === 'shipments' || currentPage === 'settings') && (
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Akses Sistem Terbatas</h2>
              <p className="text-slate-600 text-sm">
                Silakan lakukan login terlebih dahulu menggunakan tombol di pojok kanan atas untuk mengakses halaman layanan logistik ini.
              </p>
            </div>
          </div>
        </SignedOut>
      )}
    </MainLayout>
  );
}