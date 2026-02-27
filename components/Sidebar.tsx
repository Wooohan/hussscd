import React from 'react';
import { LayoutDashboard, Truck, CreditCard, Settings, Terminal, LogOut, ShieldAlert, Database, ShieldCheck, FileText } from 'lucide-react';
import { ViewState, User } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  user: User;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, user, onLogout }) => {
  const isAdmin = user.role === 'admin';

  // Define all navigation items
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
    { id: 'scraper', label: 'Live Scraper', icon: Terminal, adminOnly: true },
    { id: 'carrier-search', label: 'Carrier Database', icon: Database, adminOnly: false },
    { id: 'fmcsa-register', label: 'FMCSA Register', icon: FileText, adminOnly: false },
    { id: 'insurance-scraper', label: 'Insurance Scraper', icon: ShieldCheck, adminOnly: true },
    { id: 'subscription', label: 'Subscription', icon: CreditCard, adminOnly: false },
    { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true },
    { id: 'admin', label: 'Admin Panel', icon: ShieldAlert, adminOnly: true },
  ];

  // Filter navigation items based on user role
  // Admin sees all pages, regular users only see: Dashboard, Carrier Database, Subscription
  const navItems = allNavItems.filter(item => isAdmin || !item.adminOnly);

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col h-screen fixed left-0 top-0 z-10 shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/30">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900/70 transition-all">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-white to-slate-300">
            FreightIntel
          </span>
          <p className="text-[10px] text-slate-500 font-medium">AI Data Scraper</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'bg-indigo-500/10' : 'bg-slate-700/10'}`}></div>
              
              {/* Content */}
              <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? 'text-indigo-400' : 'group-hover:scale-110'}`} />
              <span className="font-medium relative z-10">{item.label}</span>
              
              {/* Status indicators */}
              {item.id === 'scraper' && isAdmin && (
                <span className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse relative z-10"></span>
              )}
              {item.id === 'admin' && (
                <span className="ml-auto bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold relative z-10 shadow-lg shadow-red-900/30">ADM</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info Section */}
      <div className="p-4 border-t border-slate-800/30 bg-slate-900/30 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 mb-4 border border-indigo-500/20">
          <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Logged in as</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-white truncate max-w-[140px]">{user.name}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full font-semibold border border-indigo-500/40 shadow-lg shadow-indigo-900/20">
              {user.plan}
            </span>
            {user.role === 'admin' && (
              <span className="text-xs bg-red-500/30 text-red-300 px-2.5 py-1 rounded-full font-semibold border border-red-500/40 shadow-lg shadow-red-900/20">
                Admin
              </span>
            )}
          </div>
        </div>
        
        {/* Sign Out Button */}
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white w-full transition-all duration-300 rounded-lg hover:bg-red-500/10 hover:border hover:border-red-500/20 group"
        >
          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
      `}</style>
    </aside>
  );
};
