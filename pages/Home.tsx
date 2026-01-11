
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Globe, ArrowRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <motion.div 
          style={{ y: yParallax, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-dark" />
          <div className="absolute inset-0 opacity-30">
            {/* Background Animation Simulation */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[160px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary rounded-full blur-[160px] animate-pulse delay-1000" />
          </div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-2 px-4 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold uppercase tracking-widest mb-6">
              Next-Gen Resilient Comms
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight">
              Safety Without <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-primary">Boundaries</span>
            </h1>
            <p className="text-xl md:text-2xl text-light/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              When standard networks fail, ResQLink thrives. Our LoRa-based mesh network provides unbreakable communication for teams in the harshest environments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/technology" 
                className="w-full sm:w-auto px-12 py-5 bg-white text-dark font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2"
              >
                Explore Technology <ArrowRight size={20} />
              </Link>
              <Link 
                to="/features" 
                className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
              >
                View Features
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats / Highlight Section */}
      <section className="py-32 px-6 bg-light text-dark relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { label: 'Network Range', value: '15km+', sub: 'Line of sight' },
            { label: 'Uptime', value: '99.99%', sub: 'In disaster zones' },
            { label: 'Nodes', value: '∞', sub: 'Scalable mesh' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-primary/60 mb-2 block">{stat.label}</span>
              <h3 className="text-6xl font-display font-bold text-dark mb-1">{stat.value}</h3>
              <p className="text-dark/40 font-medium">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Feature Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
              <Radio className="text-accent" size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Decentralized Intelligence</h2>
            <p className="text-lg text-light/60 mb-8 leading-relaxed">
              ResQLink doesn't rely on towers. Every device is a relay. If one node goes down, the mesh automatically re-routes signals through the most efficient path. This is the future of emergency infrastructure.
            </p>
            <ul className="space-y-4 mb-10">
              {['Auto-Healing Topology', 'E2E Encryption', 'Real-time GPS Sync'].map(item => (
                <li key={item} className="flex items-center gap-3 text-light/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/technology" className="inline-flex items-center gap-2 text-accent font-bold group">
              Learn about LoRa Mesh <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl opacity-20" />
            <div className="relative h-full w-full bg-white/5 border border-white/10 rounded-[3rem] p-12 overflow-hidden flex items-center justify-center">
              <div className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-accent rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Radio size={120} className="text-accent animate-ping opacity-20 absolute" />
                <Radio size={80} className="text-accent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-secondary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 relative z-10">Ready to deploy?</h2>
            <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto relative z-10">
              Join the elite teams already using ResQLink for mountain rescue, field ops, and disaster relief.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <button className="px-12 py-5 bg-white text-dark font-bold rounded-full hover:bg-accent transition-colors shadow-2xl">
                Get Started Now
              </button>
              <button className="px-12 py-5 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default Home;
