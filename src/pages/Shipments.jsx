import React, { useState } from 'react';
import { uploadToR2 } from '../services/r2Service';
import { addShipment, updateShipmentStatus } from '../services/neonService';

export default function Shipments({ shipments, refreshData }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    destination: '',
    recipient: '',
    status: 'Pending',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let fileUrl = '';
      if (file) {
        fileUrl = await uploadToR2(file, `proof-${formData.id}-${file.name}`);
      }

      await addShipment({
        ...formData,
        proof_url: fileUrl
      });

      setMessage('Pengiriman berhasil ditambahkan!');
      setShowModal(false);
      setFormData({ id: '', destination: '', recipient: '', status: 'Pending' });
      setFile(null);
      if (refreshData) refreshData();
    } catch (err) {
      setMessage('Gagal menyimpan pengiriman: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateShipmentStatus(id, newStatus);
      if (refreshData) refreshData();
    } catch (err) {
      alert('Gagal mengubah status: ' + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Manajemen Pengiriman & R2 Storage</h3>
          <p className="text-sm text-slate-500">Kelola resi, ubah status, dan unggah bukti pengiriman.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          + Tambah Resi Baru
        </button>
      </div>

      {message && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      {/* Tabel Daftar Pengiriman */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
              <th className="p-3">No. Resi</th>
              <th className="p-3">Tujuan</th>
              <th className="p-3">Penerima</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Aksi Cepat Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="p-3 font-medium text-slate-900">{item.id}</td>
                <td className="p-3 text-slate-600">{item.destination}</td>
                <td className="p-3 text-slate-600">{item.recipient}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Dalam Perjalanan' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'Tiba di Gudang' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-1">
                  <button 
                    onClick={() => handleStatusChange(item.id, 'Dalam Perjalanan')}
                    className="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-xs font-medium"
                  >
                    Perjalanan
                  </button>
                  <button 
                    onClick={() => handleStatusChange(item.id, 'Tiba di Gudang')}
                    className="px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded text-xs font-medium"
                  >
                    Tiba
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form Tambah Resi */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">Tambah Resi Pengiriman Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nomor Resi</label>
                <input 
                  type="text" 
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  placeholder="cth: LOG-004" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Kota Tujuan</label>
                <input 
                  type="text" 
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  placeholder="cth: Yogyakarta" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nama Penerima</label>
                <input 
                  type="text" 
                  required
                  value={formData.recipient}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                  placeholder="cth: Dewi Sartika" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Upload Bukti / Dokumen (Cloudflare R2)</label>
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}