import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

export default function MainLayout({ children, currentPage, setCurrentPage, companyName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'shipments', label: 'Service' },
    { id: 'tracking', label: 'Lacak Resi' },
    { id: 'settings', label: 'Pengaturan' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Header / Navbar */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        {/* Left Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`hover:text-emerald-800 transition-colors ${currentPage === link.id ? 'text-emerald-800 font-bold' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-700 focus:outline-none"
        >
          ☰
        </button>

        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 bg-emerald-800 group-hover:bg-emerald-900 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md transition-all">
            {companyName ? companyName.charAt(0).toUpperCase() : 'L'}
          </div>
          <span className="text-xl font-extrabold tracking-tight text-emerald-950">{companyName}</span>
        </div>

        {/* Right Auth Section */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton 
                mode="modal"
                appearance={{
                  variables: { colorPrimary: '#065f46' },
                  elements: {
                    formButtonPrimary: 'bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-md transition-all',
                    card: 'rounded-3xl shadow-2xl border border-slate-100',
                    headerTitle: 'text-emerald-950 font-extrabold text-2xl',
                    headerSubtitle: 'text-slate-500 text-sm',
                    socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-slate-700',
                    formFieldInput: 'rounded-xl border-slate-200 focus:ring-2 focus:ring-emerald-600',
                    footerActionLink: 'text-emerald-800 hover:text-emerald-950 font-semibold',
                    footer: 'hidden',
                    identityPreview: 'hidden',
                    identityPreviewText: 'hidden'
                  }
                }}
              >
                <button className="px-4 py-2 text-slate-700 hover:text-emerald-800 font-semibold transition-colors">
                  Masuk
                </button>
              </SignInButton>

              <SignUpButton 
                mode="modal"
                appearance={{
                  variables: { colorPrimary: '#065f46' },
                  elements: {
                    formButtonPrimary: 'bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-md transition-all',
                    card: 'rounded-3xl shadow-2xl border border-slate-100',
                    headerTitle: 'text-emerald-950 font-extrabold text-2xl',
                    headerSubtitle: 'text-slate-500 text-sm',
                    socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-slate-700',
                    formFieldInput: 'rounded-xl border-slate-200 focus:ring-2 focus:ring-emerald-600',
                    footerActionLink: 'text-emerald-800 hover:text-emerald-950 font-semibold',
                    footer: 'hidden',
                    identityPreview: 'hidden',
                    identityPreviewText: 'hidden'
                  }
                }}
              >
                <button className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-semibold">
                  Daftar
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  variables: { colorPrimary: '#065f46' },
                  elements: {
                    userButtonPopoverFooter: 'hidden',
                    footer: 'hidden',
                    card: 'rounded-3xl shadow-2xl border border-slate-100',
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex flex-col bg-white w-64 p-6 space-y-4 shadow-2xl animate-in slide-in-from-left">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="font-bold text-emerald-950 text-lg">Menu {companyName}</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left py-2.5 px-3 rounded-xl font-medium transition-colors ${currentPage === link.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

      {/* Footer Features Bar */}
      <footer className="w-full bg-white border-t border-slate-100 py-6 px-6 md:px-12 flex flex-wrap justify-center md:justify-start items-center gap-8 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Verified Suppliers
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          End-To-End Quality
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Multilingual Support
        </div>
      </footer>
    </div>
  );
}