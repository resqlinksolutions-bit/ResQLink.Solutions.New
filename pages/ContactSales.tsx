
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ContactSales: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    org: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-dark min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold mb-4"
          >
            Connect with Us
          </motion.h1>
          <p className="text-light/50 text-lg">
            Discuss deployments, pilots, and bulk licensing with our team.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-light/40 font-bold ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-light focus:border-accent/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-light/40 font-bold ml-1">Organization</label>
                      <input 
                        type="text" 
                        required
                        value={formState.org}
                        onChange={e => setFormState({...formState, org: e.target.value})}
                        placeholder="Organization Name"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-light focus:border-accent/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-light/40 font-bold ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      placeholder="email@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-light focus:border-accent/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-light/40 font-bold ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      placeholder="How can we help?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-light focus:border-accent/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-accent text-dark font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    Talk to Our Team <ArrowRight size={20} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-8">
                  <CheckCircle2 size={40} className="text-secondary" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Request Received</h2>
                <p className="text-light/50 max-w-sm mb-12">
                  Our team will review your inquiry and reach out within 24 hours to discuss how ResQLink can support your mission.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-accent font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-center mt-12 text-[10px] text-light/20 uppercase tracking-widest">
          *Proven in internal tests for reliable data delivery
        </p>
      </div>
    </div>
  );
};

export default ContactSales;
