import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line } from 'recharts';
import { Users, Database, Activity, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', carriers: 400, brokers: 240 },
  { name: 'Tue', carriers: 300, brokers: 139 },
  { name: 'Wed', carriers: 200, brokers: 980 },
  { name: 'Thu', carriers: 278, brokers: 390 },
  { name: 'Fri', carriers: 189, brokers: 480 },
  { name: 'Sat', carriers: 239, brokers: 380 },
  { name: 'Sun', carriers: 349, brokers: 430 },
];

const entityData = [
  { name: 'Authorized', value: 75, color: '#4ade80' },
  { name: 'Pending', value: 15, color: '#facc15' },
  { name: 'Revoked', value: 10, color: '#f87171' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-fade-in overflow-auto h-full">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">Dashboard Overview</h1>
          <p className="text-slate-400 text-base">Real-time analysis of FMCSA data extraction and carrier intelligence.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 rounded-full border border-green-500/30 shadow-lg shadow-green-900/20">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></span>
          <span className="font-semibold">System Operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scraped', value: '124,592', icon: Database, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', trend: '+12%', trendColor: 'text-blue-400' },
          { label: 'Active Carriers', value: '86,400', icon: Users, color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-500/10', trend: '+5%', trendColor: 'text-green-400' },
          { label: 'Brokers Found', value: '12,234', icon: Activity, color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-500/10', trend: '+8%', trendColor: 'text-purple-400' },
          { label: 'Success Rate', value: '99.8%', icon: TrendingUp, color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500/10', trend: '+1%', trendColor: 'text-indigo-400' },
        ].map((stat, idx) => (
          <div key={idx} className="group relative overflow-hidden">
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            {/* Card */}
            <div className="relative bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-900/50 group-hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white shadow-lg`}>{stat.trend}</span>
              </div>
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/70 transition-all duration-300 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Extraction Volume (7 Days)</h3>
              <p className="text-slate-500 text-sm mt-1">Daily carrier data extraction trends</p>
            </div>
            <Zap className="text-indigo-400 opacity-50" size={24} />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCarriers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBrokers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                />
                <Area type="monotone" dataKey="carriers" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCarriers)" />
                <Area type="monotone" dataKey="brokers" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorBrokers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/70 transition-all duration-300 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Authority Status</h3>
              <p className="text-slate-500 text-sm mt-1">Carrier authorization breakdown</p>
            </div>
            <Shield className="text-emerald-400 opacity-50" size={24} />
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entityData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} opacity={0.5} />
                 <XAxis type="number" stroke="#94a3b8" hide />
                 <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} style={{ fontSize: '12px' }} />
                 <Tooltip cursor={{fill: 'rgba(99, 102, 241, 0.1)'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                 <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={800}>
                    {entityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Bar>
              </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Last Updated', value: '2 min ago', icon: Clock, color: 'from-cyan-500 to-blue-600' },
          { label: 'Processing Speed', value: '2,400 rec/min', icon: Zap, color: 'from-yellow-500 to-orange-600' },
          { label: 'System Uptime', value: '99.99%', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
        ].map((stat, idx) => (
          <div key={idx} className="group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            <div className="relative bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800/70 transition-all duration-300 group-hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};
