
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Map, 
  Send, 
  ShieldCheck, 
  Building2, 
  Users, 
  Globe2, 
  Mountain
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStarted: React.FC = () => {
  const steps = [
    {
      title: "Understand the Problem",
      desc: "Learn how communication failures impact emergency response in zero-signal environments.",
      icon: <Search className="text-primary" />,
      number: "01"
    },
    {
      title: "Explore the Solution",
      desc: "See how ResQLink works using decentralized LoRa Mesh technology and self-healing networks.",
      icon: <Map className="text-secondary" />,
      number: "02"
    },
    {
      title: "Connect with Us",
      desc: "Reach out for pilots, live demos, or partnership opportunities for your organization.",
      icon: <Send className="text-white" />,
      number: "03"
    }
  ];

  const targetAudiences = [
    { title: "Disaster Response", icon: <ShieldCheck size={20} />, desc: "Rapid deployment teams needing unbreakable field comms." },
    { title: "Municipalities", icon: <Building2 size={20} />, desc: "Government infrastructure for backup emergency safety." },
    { title: "NGOs", icon: <Users size={20} />, desc: "Humanitarian missions in remote or infrastructure-poor zones." },
    { title: "Remote Ops", icon: <Mountain size={20} />, desc: "Research, mining, or exploration teams in the wilderness." }
  ];

  return (
    <div className="bg-dark min-h-screen pt-40 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
          <h1 className="relative text-5xl md:text-7xl font-display font-bold mb-8">
            Get Started with <br /> <span className="text-accent italic">ResQLink</span>
          </h1>
        </motion.div>
        <p className="text-xl text-light/50 max-w-2xl mx-auto mb-12">
          Reliable emergency communication when networks fail. Join the network designed to save lives in the most extreme conditions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/contact-sales" className="w-full sm:w-auto px-12 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
            Get Started <ArrowRight size={20} />
          </Link>
          <Link to="/contact-sales" className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
            Contact Sales
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-3xl font-display font-bold text-white/5 italic">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-light/50 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Side */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl font-display font-bold mb-12">Who this is for</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {targetAudiences.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-secondary">
                    {item.icon}
                    <h4 className="font-bold">{item.title}</h4>
                  </div>
                  <p className="text-sm text-light/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 relative">
            <div className="flex items-center gap-4 mb-4">
              <Globe2 className="text-primary" />
              <h4 className="font-bold font-display">Global Support</h4>
            </div>
            <p className="text-sm text-light/50 leading-relaxed mb-4">
              ResQLink is available for deployment worldwide. Our technical support teams provide 24/7 assistance for critical infrastructure maintenance and emergency training.
            </p>
            <p className="text-[10px] text-light/20 uppercase tracking-tighter">*Proven in internal tests</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-20 rounded-[4rem] text-center border border-white/5 backdrop-blur-sm"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Safety should never depend on connectivity.
          </h2>
          <p className="text-xl text-light/60 mb-12 max-w-2xl mx-auto italic">
            "In every crisis, communication is the first line of defense. ResQLink ensures that line never breaks."
          </p>
          <Link 
            to="/contact-sales"
            className="px-12 py-5 bg-white text-dark font-bold rounded-full hover:bg-accent transition-all active:scale-95 inline-block"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default GetStarted;
