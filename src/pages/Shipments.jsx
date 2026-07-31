import React, { useState } from 'react';

export default function Shipments() {
  const [shipmentsList, setShipmentsList] = useState([
    { id: 'REG-98231', sender: 'PT Sumber Makmur', recipient: 'Budi Santoso', destination: 'Jakarta Selatan', status: 'Dalam Perjalanan' },
    { id: 'EXP-45210', sender: 'CV Berkah Jaya', recipient: 'Siti Rahma', destination: 'Bandung', status: 'Selesai' },
    { id: 'REG-77342', sender: 'Toko Maju Bersama', recipient: 'Ahmad Fauzi', destination: 'Surabaya', status: 'Diproses' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newShipment, setNewShipment] = useState({ id: '', sender: '', recipient: '', destination: '', status: 'Diproses' });

  const handleAddShipment = (e) => {
    e.preventDefault();
    if (!newShipment.id || !newShipment.recipient) return;
    setShipmentsList([newShipment, ...shipmentsList]);
    setNewShipment({ id: '', sender: '', recipient: '', destination: '', status: 'Diproses' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Pengiriman</h2>
          <p className="text-sm text-slate-500 mt-1">Kelola data resi, pengirim, dan status penerimaan barang.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <span>+ Tambah Pengiriman</span>
        </button>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Daftar Resi Aktif</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4">No. Resi</th>
                <th className="p-4">Pengirim</th>
                <th className="p-4">Penerima</th>
                <th className="p-4">Tujuan</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {shipmentsList.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-blue-600">{item.id}</td>
                  <td className="p-4">{item.sender}</td>
                  <td className="p-4">{item.recipient}</td>
                  <td className="p-4">{item.destination}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'Dalam Perjalanan' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
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

      {/* Modal Tambah Pengiriman */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-lg">Tambah Pengiriman Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleAddShipment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor Resi</label>
                <input 
                  type="text" 
                  required
                  placeholder="Cth: EXP-12345"
                  value={newShipment.id}
                  onChange={(e) => setNewShipment({...newShipment, id: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Pengirim</label>
                <input 
                  type="text" 
                  required
                  placeholder="Cth: PT Sumber Makmur"
                  value={newShipment.sender}
                  onChange={(e) => setNewShipment({...newShipment, sender: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Penerima</label>
                <input 
                  type="text" 
                  required
                  placeholder="Cth: Budi Santoso"
                  value={newShipment.recipient}
                  onChange={(e) => setNewShipment({...newShipment, recipient: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kota Tujuan</label>
                <input 
                  type="text" 
                  required
                  placeholder="Cth: Jakarta Selatan"
                  value={newShipment.destination}
                  onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}