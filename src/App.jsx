import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Tracking from './pages/Tracking';
import Settings from './pages/Settings';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <SignedIn>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'shipments' && <Shipments />}
        {currentPage === 'tracking' && <Tracking />}
        {currentPage === 'settings' && <Settings />}
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Akses Sistem Terbatas</h2>
            <p className="text-slate-600 text-sm">
              Silakan lakukan login terlebih dahulu menggunakan tombol di pojok kanan atas untuk mengakses panel manajemen logistik.
            </p>
          </div>
        </div>
      </SignedOut>
    </MainLayout>
  );
}