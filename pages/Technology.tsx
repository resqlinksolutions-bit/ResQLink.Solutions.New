
import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Share2, ShieldAlert, Cpu } from 'lucide-react';

const Technology: React.FC = () => {
  const steps = [
    {
      title: "LoRa Connectivity",
      desc: "Utilizing Long Range Radio (LoRa) technology, ResQLink achieves extreme penetration through concrete, foliage, and urban canyons where cellular signals die.",
      icon: <Radio className="text-accent" />,
      color: "from-accent/20 to-transparent"
    },
    {
      title: "Self-Healing Mesh",
      desc: "Every ResQLink device acts as a 'node'. If a central unit fails, the network instantly redistributes the load across all remaining active devices.",
      icon: <Share2 className="text-primary" />,
      color: "from-primary/20 to-transparent"
    },
    {
      title: "High Security",
      desc: "Enterprise-grade AES-256 GCM encryption ensures that even though the network is decentralized, your data remains strictly confidential and protected from unauthorized access.",
      icon: <ShieldAlert className="text-secondary" />,
      color: "from-secondary/20 to-transparent"
    }
  ];

  return (
    <div className="pt-40 pb-20 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-32"
        >
          <span className="text-accent uppercase font-bold tracking-[0.4em] text-sm mb-4 block">Our DNA</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Infrastructure as a Service. Anywhere.</h1>
          <p className="text-xl text-light/50 leading-relaxed">
            Standard emergency communication relies on central towers. ResQLink flips the script. We provide a decentralized, resilient layer that empowers teams to stay connected without a single point of failure.
          </p>
        </motion.div>

        {/* The Diagram Section */}
        <div className="relative mb-40">
          <div className="absolute inset-0 bg-accent/5 rounded-[4rem] -rotate-1 scale-105" />
          <div className="relative bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-24 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Node-to-Node Intelligence</h2>
                <p className="text-light/60 mb-10 leading-relaxed">
                  Our custom-built LoRa Mesh protocol (RLM v3) allows for hopping across up to 255 nodes. This means a single team can cover an entire mountain range or a dense underground tunnel complex with ease.
                </p>
                <div className="space-y-6">
                  {[
                    { label: "Frequency", value: "868 / 915 MHz" },
                    { label: "Packet Speed", value: "Up to 50 kbps" },
                    { label: "Modulation", value: "Spread Spectrum" }
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-light/40 uppercase tracking-widest text-xs font-bold">{stat.label}</span>
                      <span className="font-display font-bold text-accent">{stat.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-light/20 mt-6 italic text-right">*Proven in internal tests</p>
              </div>

              {/* Animated Visualization Simulation */}
              <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent blur-3xl" />
                <div className="relative flex gap-12">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="w-24 h-32 bg-white/10 border border-accent/30 rounded-2xl flex items-center justify-center relative"
                    >
                      <Cpu size={32} className="text-accent" />
                      {/* Pulse Effect */}
                      <motion.div
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border border-accent rounded-2xl"
                      />
                    </motion.div>
                  ))}
                  {/* Connecting Lines (Simulated) */}
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Storytelling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`p-10 rounded-[2.5rem] bg-gradient-to-b ${step.color} border border-white/5 group hover:border-accent/30 transition-all`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-6">{step.title}</h3>
              <p className="text-light/50 leading-relaxed italic">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;
