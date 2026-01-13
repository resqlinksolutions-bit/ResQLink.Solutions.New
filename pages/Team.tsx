
import React from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const members = [
    { name: "Drakshi Meshram", role: "Chief Executive Officer (CEO)" },
    { name: "Shagun Jha", role: "Chief Operating Officer (COO)" },
    { name: "Dhruv Mankar", role: "Chief Technology Officer (CTO)" },
    { name: "Ashvat Yadav", role: "Head of Design" },
    { name: "Ansh Padole", role: "Head of Research & Development" },
    { name: "Arnav Bodas", role: "Marketing Manager" },
  ];

  return (
    <div className="pt-40 pb-40 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-32 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-secondary font-bold uppercase tracking-[0.5em] mb-4 block text-sm"
          >
            Leadership
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight"
          >
            Architects of <br /> <span className="text-accent italic">Resilience</span>.
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-accent mt-12 mx-auto lg:mx-0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative py-8 border-t border-white/10 group"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i * 0.1) + 0.3 }}
                className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-accent"
              />
              
              <div className="space-y-4">
                <p className="text-secondary font-bold uppercase tracking-[0.2em] text-[11px] font-sans">
                  {m.role}
                </p>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-light group-hover:text-accent transition-colors duration-300">
                  {m.name}
                </h3>
              </div>
              
              <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-accent/40 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-40 p-12 rounded-[2.5rem] bg-white/5 border border-white/10 text-center"
        >
          <p className="text-light/40 text-sm max-w-2xl mx-auto leading-relaxed">
            Our team brings together decades of expertise in decentralized protocols, emergency logistics, and industrial design. 
            United by a single mission: ensuring communication survives when infrastructure fails.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
