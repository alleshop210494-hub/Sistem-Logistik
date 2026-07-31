import React, { useState } from 'react';

export default function Dashboard({ companyName }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const stats = [
    { title: 'Total Pengiriman', value: '1,248', change: '+12%', color: 'border-emerald-600' },
    { title: 'Dalam Perjalanan', value: '342', change: '+4%', color: 'border-amber-500' },
    { title: 'Selesai Dikirim', value: '890', change: '+18%', color: 'border-emerald-500' },
    { title: 'Kendala / Retur', value: '16', change: '-2%', color: 'border-rose-500' },
  ];

  const dummyData = {
    'REG-98231': {
      id: 'REG-98231',
      sender: 'PT Sumber Makmur',
      recipient: 'Budi Santoso',
      destination: 'Jakarta Selatan',
      status: 'Dalam Perjalanan',
      history: [
        { time: '10:00 - 30 Jul 2026', desc: 'Paket dikirim dari Hub Utama Jakarta' },
        { time: '14:30 - 30 Jul 2026', desc: 'Tiba di Sorting Center' },
        { time: '08:00 - 31 Jul 2026', desc: 'Kurir membawa paket ke alamat tujuan' }
      ]
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const found = dummyData[searchQuery.trim().toUpperCase()];
    setTrackingResult(found || 'not_found');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner dengan Background Gambar Kustom */}
      <div 
        className="relative rounded-2xl p-6 md:p-8 text-white shadow-md overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200")', 
        }}
      >
        <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-[2px]"></div>

        <div className="relative z-10 space-y-2">
          <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Dashboard Utama</span>
          <h2 className="text-2xl md:text-3xl font-extrabold">Selamat Datang di Panel {companyName || 'Logico'}</h2>
          <p className="text-emerald-100 text-sm max-w-xl">
            Pantau ringkasan pengiriman armada, status operasional logistik, dan lacak resi secara real-time dari satu tempat.
          </p>
        </div>
      </div>

      {/* Stats Grid Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 ${stat.color} flex flex-col justify-between`}
          >
            <div>
              <p className="text-xs md:text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700">
              <span>{stat.change} dari bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tracking Widget Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="max-w-xl space-y-2">
          <h3 className="text-lg font-bold text-slate-800">Lacak Resi Cepat</h3>
          <p className="text-sm text-slate-500">Masukkan nomor resi pengiriman Anda untuk memeriksa status terkini.</p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input 
            type="text" 
            placeholder="Contoh resi: REG-98231"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button 
            type="submit"
            className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            Lacak Paket
          </button>
        </form>

        {trackingResult === 'not_found' && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm max-w-xl">
            Nomor resi tidak ditemukan. Gunakan contoh resi aktif: <strong>REG-98231</strong>
          </div>
        )}

        {trackingResult && trackingResult !== 'not_found' && (
          <div className="bg-emerald-50/50 border border-emerald-200 p-6 rounded-2xl max-w-xl space-y-4">
            <div className="flex justify-between items-center border-b border-emerald-200 pb-3">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Nomor Resi</p>
                <h4 className="font-bold text-emerald-900 text-base">{trackingResult.id}</h4>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                {trackingResult.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500">Pengirim</p>
                <p className="font-medium text-slate-800">{trackingResult.sender}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Penerima & Tujuan</p>
                <p className="font-medium text-slate-800">{trackingResult.recipient} ({trackingResult.destination})</p>
              </div>
            </div>

            <div className="border-t border-emerald-200 pt-3">
              <p className="text-xs font-bold text-slate-700 mb-2">Riwayat Terakhir:</p>
              <p className="text-xs text-slate-600 font-medium">{trackingResult.history[trackingResult.history.length - 1].time}</p>
              <p className="text-sm text-slate-800">{trackingResult.history[trackingResult.history.length - 1].desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}