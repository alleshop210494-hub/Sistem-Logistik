import React, { useState } from 'react';

export default function Tracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

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
    setResult(found || 'not_found');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-3">
        <h2 className="text-xl font-bold text-slate-800">Lacak Resi Pengiriman</h2>
        <p className="text-sm text-slate-500">Masukkan nomor resi untuk melihat status perjalanan paket secara detail.</p>
        
        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <input 
            type="text" 
            placeholder="Contoh: REG-98231"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Lacak
          </button>
        </form>
      </div>

      {result === 'not_found' && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-center text-sm">
          Nomor resi tidak ditemukan. Coba gunakan resi contoh: <strong>REG-98231</strong>
        </div>
      )}

      {result && result !== 'not_found' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Nomor Resi</p>
              <h3 className="text-lg font-bold text-blue-600">{result.id}</h3>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
              {result.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500">Pengirim</p>
              <p className="font-medium text-slate-800">{result.sender}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Penerima & Tujuan</p>
              <p className="font-medium text-slate-800">{result.recipient} ({result.destination})</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold text-slate-800 text-sm mb-4">Riwayat Perjalanan</h4>
            <div className="space-y-4 border-l-2 border-blue-500 pl-4 ml-2">
              {result.history.map((hist, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xs text-slate-400 font-medium">{hist.time}</p>
                  <p className="text-sm text-slate-700">{hist.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}