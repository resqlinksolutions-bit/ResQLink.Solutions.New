
import React from 'react';
import { motion } from 'framer-motion';

const StartupLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[1000] bg-dark flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo and Wordmark Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            animate={{ 
              filter: [
                'drop-shadow(0 0 0px rgba(138, 241, 225, 0))',
                'drop-shadow(0 0 20px rgba(138, 241, 225, 0.3))',
                'drop-shadow(0 0 0px rgba(138, 241, 225, 0))'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src="https://i.ibb.co/qY7YPMKs/Screenshot-2025-12-19-140748-removebg-preview-1.png" 
              alt="ResQLink Logo" 
              className="w-24 h-24 object-contain"
            />
          </motion.div>
          
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-light tracking-tighter mb-2">
              ResQLink
            </h1>
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 0.5, letterSpacing: "0.4em" }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-[10px] uppercase font-bold text-accent"
            >
              Safety Without Boundaries
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar Container */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full w-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </div>
      
      {/* Decorative OS details */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/10">
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold">ResQLink OS v4.0.2</span>
        <div className="w-1 h-1 rounded-full bg-white/10" />
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Secure Boot Active</span>
      </div>
    </motion.div>
  );
};

export default StartupLoader;
