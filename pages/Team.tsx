
import React from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  // Update these 'image' strings with your actual URLs
  const members = [
    { 
      name: "Drakshi Meshram", 
      role: "Chief Executive Officer (CEO)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "Shagun Jha", 
      role: "Chief Operating Officer (COO)",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "Dhruv Mankar", 
      role: "Chief Technology Officer (CTO)",
      image: "https://i.ibb.co/q3XNfPrj/unnamed-1.jpg" 
    },
    { 
      name: "Ashvat Yadav", 
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "Ansh Padole", 
      role: "Head of Research & Development",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "Arnav Bodas", 
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
    },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              {/* Photo Holder with Glossy Effect */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 border border-white/10 bg-white/5">
                {/* Liquid Gloss Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
                  <motion.div 
                    animate={{ 
                      x: ['-100%', '200%'],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear",
                      repeatDelay: 1
                    }}
                    className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  />
                </div>
                
                {/* Image */}
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[0.22, 1, 0.36, 1]"
                />

                {/* Subtle reflective edge */}
                <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none z-20 shadow-inner" />
              </div>

              {/* Text Content */}
              <div className="relative py-6 border-t border-white/10">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i * 0.1) + 0.3 }}
                  className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(138,241,225,0.8)]"
                />
                
                <div className="space-y-2">
                  <p className="text-secondary font-bold uppercase tracking-[0.2em] text-[10px] font-sans">
                    {m.role}
                  </p>
                  <h3 className="text-3xl font-display font-bold text-light group-hover:text-accent transition-colors duration-300">
                    {m.name}
                  </h3>
                </div>
                
                <div className="mt-6 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-accent/40 to-transparent transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-40 p-12 rounded-[2.5rem] bg-white/5 border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          <p className="text-light/40 text-sm max-w-2xl mx-auto leading-relaxed relative z-10 font-sans tracking-wide">
            Our leadership team combines deep expertise in mesh protocols, industrial engineering, and strategic operations. 
            We are dedicated to building a future where communication remains a fundamental right, even in the most challenging conditions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
