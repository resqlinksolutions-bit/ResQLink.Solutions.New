
import React from 'react';
import { motion } from 'framer-motion';
import { Battery, MapPin, Wind, Zap, CloudLightning, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const features = [
    { title: "72hr Battery", desc: "Enterprise-grade lithium cells designed for extreme cold.", icon: <Battery /> },
    { title: "GPS Tracking", desc: "Offline mapping with breadcrumb navigation.", icon: <MapPin /> },
    { title: "IP68 Weatherproof", desc: "Built to survive submersion and dust storms.", icon: <Wind /> },
    { title: "Instant Wake", desc: "Cold start to mesh connection in under 2 seconds.", icon: <Zap /> },
    { title: "SOS Beacon", desc: "Physical override button for emergency broadcast.", icon: <CloudLightning /> },
    { title: "Digital Compass", desc: "Built-in orientation sensors for zero-vis navigation.", icon: <Compass /> },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        
        <p className="text-[10px] text-light/20 mt-12 text-center uppercase tracking-tighter">*Proven in internal tests</p>

        {/* CTA section for sales */}
        <div className="mt-40 rounded-[3rem] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative p-12 md:p-24 flex flex-col items-center text-center bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-4xl font-display font-bold mb-6">Ready to secure your operations?</h2>
            <p className="text-light/60 text-lg mb-8 leading-relaxed max-w-2xl">
              ResQLink provides critical infrastructure for teams operating at the edge. Contact our team to discuss custom solutions and bulk deployments.
            </p>
            <div className="flex gap-4">
              <Link to="/contact-sales" className="px-12 py-5 bg-white text-dark font-bold rounded-xl hover:bg-accent transition-colors">Contact Sales</Link>
              <Link to="/get-started" className="px-12 py-5 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">How it works</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
