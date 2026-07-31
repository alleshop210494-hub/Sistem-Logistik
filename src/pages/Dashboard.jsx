import React from 'react';

export default function Dashboard({ shipments }) {
  return (
    <div className="space-y-6">
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Total Pengiriman</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">1,245</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Dalam Perjalanan</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-1">320</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-slate-500 font-medium">Selesai / Tiba</p>
          <h3 className="text-3xl font-bold text-emerald-600 mt-1">925</h3>
        </div>
      </div>

      {/* Tabel Ringkasan Responsif */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Pengiriman Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="p-4">No. Resi</th>
                <th className="p-4">Tujuan</th>
                <th className="p-4">Penerima</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-900">{item.id}</td>
                  <td className="p-4 text-slate-600">{item.destination}</td>
                  <td className="p-4 text-slate-600">{item.recipient}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Dalam Perjalanan' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'Tiba di Gudang' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}