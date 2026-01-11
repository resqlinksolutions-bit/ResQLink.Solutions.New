
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../App';
import { Download, Bell, Shield, Key, ChevronRight, Activity } from 'lucide-react';

const Account: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const dashboardItems = [
    { title: "Network Status", status: "Active", icon: <Activity className="text-green-400" /> },
    { title: "Security Protocols", status: "Encrypted", icon: <Shield className="text-accent" /> },
    { title: "Mesh Node ID", status: user.id.slice(0, 8).toUpperCase(), icon: <Key className="text-secondary" /> },
  ];

  return (
    <div className="pt-40 pb-20 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-4">
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 text-dark font-display font-bold text-3xl">
                {user.full_name?.[0] || user.email[0].toUpperCase()}
              </div>
              <h2 className="text-xl font-display font-bold">{user.full_name || 'Field Agent'}</h2>
              <p className="text-light/40 text-sm truncate">{user.email}</p>
              <div className="mt-8 pt-8 border-t border-white/5 space-y-2">
                <button className="w-full py-3 rounded-xl bg-accent text-dark font-bold text-sm">Update Profile</button>
              </div>
            </div>

            <nav className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
              {[
                { label: 'Overview', active: true },
                { label: 'Communications', active: false },
                { label: 'Device Management', active: false },
                { label: 'Security Logs', active: false },
                { label: 'Billing & Licenses', active: false },
              ].map(item => (
                <button 
                  key={item.label}
                  className={`w-full text-left py-5 px-8 text-sm font-bold transition-colors ${
                    item.active ? 'bg-white/5 text-accent border-l-4 border-accent' : 'text-light/50 hover:text-light'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {dashboardItems.map((item, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-light/30 block mb-1">{item.title}</span>
                    <span className="font-display font-bold text-lg">{item.status}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-display font-bold">Latest Firmware Updates</h3>
                <button className="text-accent text-sm font-bold flex items-center gap-2">View History <ChevronRight size={16} /></button>
              </div>
              
              <div className="space-y-4">
                {[
                  { version: 'v3.2.1-stable', date: '2 hours ago', size: '14.2 MB' },
                  { version: 'v3.2.0-hotfix', date: 'Yesterday', size: '2.1 MB' },
                  { version: 'v3.1.9-beta', date: '3 days ago', size: '42.0 MB' },
                ].map((update, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Download size={18} />
                      </div>
                      <div>
                        <span className="font-bold block">{update.version}</span>
                        <span className="text-xs text-light/30">{update.date} &bull; {update.size}</span>
                      </div>
                    </div>
                    <button className="py-2 px-6 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-widest">Install Now</button>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-secondary/10 to-transparent border border-white/5 rounded-[2.5rem] p-10">
                <div className="flex items-center gap-4 mb-6">
                  <Bell className="text-secondary" />
                  <h4 className="text-xl font-bold font-display">Priority Notifications</h4>
                </div>
                <p className="text-sm text-light/50 mb-8 leading-relaxed">
                  You have 2 pending mesh network alerts for the Pacific Northwest sector. Please review node connectivity.
                </p>
                <button className="text-secondary text-sm font-bold underline">Review Alerts</button>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-transparent border border-white/5 rounded-[2.5rem] p-10">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="text-accent" />
                  <h4 className="text-xl font-bold font-display">Identity Verified</h4>
                </div>
                <p className="text-sm text-light/50 mb-8 leading-relaxed">
                  Your biometric signature is synced. Access to Level-4 encrypted channels is currently granted.
                </p>
                <button className="text-accent text-sm font-bold underline">Manage Keys</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
