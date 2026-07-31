import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <div className="text-center space-y-3">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Tentang Logico</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">Solusi Logistik Modern Berbasis Cloud</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Logico menyediakan layanan pengiriman cepat, aman, dan scalable yang dirancang khusus untuk memenuhi kebutuhan rantai pasok modern, baik lokal maupun global.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">🚀</div>
          <h3 className="font-bold text-slate-800 text-lg">Arsitektur Cloud-Native</h3>
          <p className="text-sm text-slate-600">
            Dibangun dengan tumpukan teknologi modern: React untuk antarmuka yang responsif di berbagai perangkat, Clerk untuk autentikasi aman, Neon PostgreSQL untuk basis data handal, dan Cloudflare R2 untuk penyimpanan berkas dokumen pengiriman.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">🌍</div>
          <h3 className="font-bold text-slate-800 text-lg">Keandalan & Jangkauan</h3>
          <p className="text-sm text-slate-600">
            Sistem dirancang agar dapat diakses kapan saja oleh admin kantor maupun kurir di lapangan melalui handphone, tablet, atau laptop dengan performa tinggi dan transparan.
          </p>
        </div>
      </div>
    </div>
  );
}