
import React from 'react';
import { motion } from 'framer-motion';
import { Battery, MapPin, Wind, Zap, MessageSquare, CloudLightning, Compass, Smartphone } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    { title: "72hr Battery", desc: "Military-grade lithium cells designed for extreme cold.", icon: <Battery /> },
    { title: "GPS Tracking", desc: "Offline mapping with breadcrumb navigation.", icon: <MapPin /> },
    { title: "IP68 Weatherproof", desc: "Built to survive submersion and dust storms.", icon: <Wind /> },
    { title: "Instant Wake", desc: "Cold start to mesh connection in under 2 seconds.", icon: <Zap /> },
    { title: "Group Messaging", desc: "Secure encrypted channels for whole-team sync.", icon: <MessageSquare /> },
    { title: "SOS Beacon", desc: "Physical override button for emergency broadcast.", icon: <CloudLightning /> },
    { title: "Digital Compass", desc: "Built-in orientation sensors for zero-vis navigation.", icon: <Compass /> },
    { title: "Smartphone Sync", desc: "Bluetooth gateway for your existing devices.", icon: <Smartphone /> },
  ];

  return (
    <div className="pt-40 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            Built for the <br /> <span className="text-accent italic">Edge Cases</span>
          </motion.h1>
          <p className="text-xl text-light/50 max-w-2xl mx-auto">
            Every component of ResQLink is over-engineered. We don't just build electronics; we build lifelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-accent/40 transition-all cursor-default group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-dark transition-colors duration-500">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-light/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="mt-40 rounded-[3rem] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative p-12 md:p-24 flex flex-col md:flex-row items-center gap-12 bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex-1">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Ecosystem</span>
              <h2 className="text-4xl font-display font-bold mb-6">Works with your phone</h2>
              <p className="text-light/60 text-lg mb-8 leading-relaxed">
                While ResQLink is a standalone communicator, our mobile app (iOS/Android) allows you to use the mesh network for high-fidelity mapping and rich messaging, turning your phone into a satellite-class device.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-white text-dark font-bold rounded-xl hover:bg-accent transition-colors">Download App</button>
                <button className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">API Docs</button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md bg-dark/40 rounded-2xl p-8 border border-white/5 rotate-2 group-hover:rotate-0 transition-transform">
              <div className="space-y-4">
                {[1, 2, 3].map(m => (
                  <div key={m} className="h-12 w-full bg-white/5 rounded-xl border border-white/5 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
