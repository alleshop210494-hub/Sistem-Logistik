import React from 'react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Pengiriman', value: '1,248', change: '+12%', color: 'border-blue-500' },
    { title: 'Dalam Perjalanan', value: '342', change: '+4%', color: 'border-amber-500' },
    { title: 'Selesai Dikirim', value: '890', change: '+18%', color: 'border-emerald-500' },
    { title: 'Kendala / Retur', value: '16', change: '-2%', color: 'border-rose-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Selamat Datang di Panel Logistik</h2>
        <p className="text-blue-100 text-sm md:text-base max-w-2xl">
          Pantau pengiriman armada, status resi, dan kelola operasional logistik secara real-time dari satu tempat.
        </p>
      </div>

      {/* Stats Grid (Responsive: 1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${stat.color} flex flex-col justify-between`}
          >
            <div>
              <p className="text-xs md:text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600">
              <span>{stat.change} dari bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Shipments Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-base">Pengiriman Terbaru</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua</button>
        </div>
        <div className="p-5 text-center text-slate-400 py-12">
          Data pengiriman dari database Neon akan ditampilkan di sini.
        </div>
      </div>
    </div>
  );
}