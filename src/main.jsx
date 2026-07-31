import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Memastikan kunci valid, diawali pk_, dan bukan teks placeholder panduan
const isClerkValid = 
  PUBLISHABLE_KEY && 
  PUBLISHABLE_KEY.startsWith('pk_') && 
  !PUBLISHABLE_KEY.includes('KUNCI_CLERK_ANDA_DISINI');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isClerkValid ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    ) : (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-4">
          <div className="text-4xl">⚠️</div>
          <h1 className="text-xl font-bold text-amber-400">Clerk Publishable Key Belum Diset</h1>
          <p className="text-sm text-slate-300">
            Aplikasi mendeteksi kunci placeholder. Buat file <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">.env</code> di root proyek Anda dan masukkan kunci Clerk asli Anda:
          </p>
          <pre className="text-xs bg-slate-900 p-3 rounded text-left text-emerald-400 overflow-x-auto">
            VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
          </pre>
          <p className="text-xs text-slate-400">
            Dapatkan kunci Anda secara gratis di <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">dashboard.clerk.com</a>.
          </p>
        </div>
      </div>
    )}
  </React.StrictMode>,
);