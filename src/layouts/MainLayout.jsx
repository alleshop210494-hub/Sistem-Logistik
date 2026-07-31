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
      <header className="w-full bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
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
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-emerald-800 rounded flex items-center justify-center text-white font-bold text-xs shadow-md">
            {companyName ? companyName.charAt(0).toUpperCase() : 'L'}
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-900">{companyName}</span>
        </div>

        {/* Right Auth Section */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="hover:text-emerald-800 transition-colors">Login</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg shadow-sm transition-colors">
                  Register
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex flex-col bg-white w-64 p-6 space-y-4 shadow-2xl animate-in slide-in-from-left">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="font-bold text-emerald-900 text-lg">Menu {companyName}</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 font-bold">✕</button>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left py-2 font-medium ${currentPage === link.id ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}
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