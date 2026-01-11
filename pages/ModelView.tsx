
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Layers, Info, Settings } from 'lucide-react';
import Viewer3D from '../components/ThreeDDevice';

const ModelView: React.FC = () => {
  const [exploded, setExploded] = useState(false);

  return (
    <div className="h-screen bg-dark pt-20 flex flex-col">
      <div className="flex-1 relative">
        <Viewer3D exploded={exploded} />

        {/* Sidebar Controls */}
        <div className="absolute top-10 left-10 z-10 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-72"
          >
            <h1 className="text-xl font-display font-bold mb-2">Device Explorer</h1>
            <p className="text-xs text-light/40 mb-6 uppercase tracking-widest font-bold">Interactive Visualization</p>
            
            <div className="space-y-4">
              <button 
                onClick={() => setExploded(!exploded)}
                className={`w-full py-4 px-4 rounded-2xl flex items-center justify-between group transition-all ${
                  exploded ? 'bg-accent text-dark' : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers size={18} />
                  <span className="font-bold text-sm">Exploded View</span>
                </div>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${exploded ? 'bg-dark/20' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${exploded ? 'right-1 bg-dark' : 'left-1 bg-white/40'}`} />
                </div>
              </button>

              <button className="w-full py-4 px-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-3 transition-all">
                <Settings size={18} />
                <span className="font-bold text-sm">Hardware Specs</span>
              </button>

              <button className="w-full py-4 px-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-3 transition-all text-light/40">
                <Maximize2 size={18} />
                <span className="font-bold text-sm">Full Screen</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-accent/10 backdrop-blur-md border border-accent/20 p-6 rounded-3xl w-72"
          >
            <div className="flex items-center gap-3 mb-3 text-accent">
              <Info size={18} />
              <span className="font-bold text-sm uppercase tracking-tighter">Pro Tip</span>
            </div>
            <p className="text-xs text-light/70 leading-relaxed">
              Use your mouse or touch to rotate the device. Scroll to zoom in on the internal circuitry. Click hotspots for component details.
            </p>
          </motion.div>
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-10 right-10 z-10 hidden md:block">
          <div className="bg-dark/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-light/40 uppercase tracking-widest mb-4">Network Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Latency', value: '4ms' },
                { label: 'Mesh Nodes', value: '1,421' },
                { label: 'Signal', value: 'Excellent' },
              ].map(s => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-[10px] text-light/30 uppercase">{s.label}</span>
                  <span className="font-display font-bold text-accent">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelView;
