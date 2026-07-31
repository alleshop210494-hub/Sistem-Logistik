import React, { useState } from 'react';

export default function Settings({ companyName, setCompanyName }) {
  const [formData, setFormData] = useState({
    companyName: companyName || 'Logico',
    email: 'admin@logistik.com',
    phone: '+62 812-3456-7890',
    currency: 'IDR (Rupiah)'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyName(formData.companyName);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-1">Pengaturan Sistem</h2>
        <p className="text-sm text-slate-500 mb-6">Kelola profil perusahaan dan preferensi tampilan aplikasi.</p>

        {saved && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium">
            Pengaturan berhasil disimpan! Nama perusahaan otomatis diperbarui di seluruh sistem.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Perusahaan / Layanan</label>
            <input 
              type="text" 
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Administrator</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor Kontak / WhatsApp</label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Mata Uang Utama</label>
            <select 
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              <option>IDR (Rupiah)</option>
              <option>USD (US Dollar)</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm rounded-lg transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}