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

  // Fungsi Export ke Excel (Format CSV)
  const handleExportExcel = () => {
    const headers = ['No. Resi', 'Pengirim', 'Penerima', 'Tujuan', 'Status'];
    const rows = shipmentsList.map(item => [item.id, item.sender, item.recipient, item.destination, item.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'laporan_pengiriman_logistik.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi Export ke PDF (Print Window)
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
      {/* Service Header Info */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Layanan Logistik Utama</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Manajemen & Layanan Pengiriman</h2>
          <p className="text-emerald-100 text-sm max-w-xl">
            Solusi logistik end-to-end untuk pengiriman kargo cepat, aman, dan terintegrasi dengan penyimpanan cloud.
          </p>
        </div>

        {/* Tombol Aksi Export & Tambah */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleExportExcel}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <span>📊 Export Excel</span>
          </button>
          
          <button 
            onClick={handleExportPDF}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <span>📄 Export PDF</span>
          </button>

          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-white text-emerald-900 font-bold text-sm rounded-xl shadow hover:bg-emerald-50 transition-colors flex items-center gap-2"
          >
            <span>+ Tambah Pengiriman</span>
          </button>
        </div>
      </div>

      {/* Shipments Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Daftar Pengiriman Aktif</h3>
          <span className="text-xs text-slate-500 font-medium">{shipmentsList.length} Total Resi</span>
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
                  <td className="p-4 font-semibold text-emerald-800">{item.id}</td>
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
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
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
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-900"
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