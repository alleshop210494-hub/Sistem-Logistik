import React, { useState } from 'react';

export default function Tracking({ shipments }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = shipments.find(s => s.id.toLowerCase() === searchQuery.trim().toLowerCase());
    setResult(found || 'not_found');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-slate-800">Lacak Status Resi Pengiriman</h3>
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Masukkan nomor resi (cth: LOG-001)" 
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors">
          Lacak
        </button>
      </form>

      {result === 'not_found' && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm">
          Nomor resi tidak ditemukan. Pastikan nomor resi benar.
        </div>
      )}

      {result && result !== 'not_found' && (
        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3 max-w-md">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-900">{result.id}</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {result.status}
            </span>
          </div>
          <div className="text-sm space-y-1 text-slate-600">
            <p><strong>Tujuan:</strong> {result.destination}</p>
            <p><strong>Penerima:</strong> {result.recipient}</p>
          </div>
        </div>
      )}
    </div>
  );
}