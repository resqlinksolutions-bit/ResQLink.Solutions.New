
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../App';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Technology', path: '/technology' },
    { label: 'Features', path: '/features' },
    { label: 'Team', path: '/team' },
    { label: 'Get Started', path: '/get-started' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -150 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto pointer-events-auto"
      >
        <div className="relative group">
          {/* Liquid Gloss Background */}
          <div className="absolute inset-0 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Top Gloss Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-sm" />
            
            {/* Dynamic Shine Effect */}
            <motion.div 
              animate={{ 
                x: ['-100%', '200%'],
                opacity: [0, 0.3, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 2
              }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            />
          </div>

          <div className="relative flex items-center justify-between px-4 py-2">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 group/logo py-1 pl-4 relative">
              <div className="relative">
                <img 
                  src="https://i.ibb.co/qY7YPMKs/Screenshot-2025-12-19-140748-removebg-preview-1.png" 
                  alt="ResQLink Logo" 
                  className="w-9 h-9 object-contain group-hover/logo:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(138,241,225,0.4)]"
                />
                <motion.div 
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-1 bg-accent/20 blur-md rounded-full -z-10"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white hidden sm:inline drop-shadow-sm">ResQLink</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-semibold tracking-wide transition-all duration-300 relative px-5 py-2 rounded-full overflow-hidden group/link ${
                    location.pathname === link.path ? 'text-accent' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Hover Liquid Pill Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover/link:opacity-100 transition-opacity rounded-full"
                    layoutId={location.pathname === link.path ? "active-pill" : undefined}
                  />
                  
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-active-gloss"
                      className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-full border border-accent/20" 
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* User Actions & Mobile Toggle */}
            <div className="flex items-center gap-3 pr-2">
              <Link 
                to="/contact-sales"
                className="hidden md:flex items-center gap-2 py-2 px-6 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-accent uppercase tracking-widest hover:bg-accent hover:text-dark hover:border-accent transition-all duration-500 active:scale-95 shadow-lg shadow-accent/5"
              >
                Contact Sales
              </Link>
              
              <div className="h-6 w-[1px] bg-white/10 mx-1 hidden md:block" />

              {user ? (
                <div className="flex items-center gap-2">
                  <Link 
                    to="/account" 
                    className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 border border-white/10 text-xs hover:bg-white/20 transition-all group/user"
                  >
                    <User size={12} className="text-accent group-hover/user:scale-110 transition-transform" />
                    <span className="font-semibold text-white max-w-[80px] truncate">{user.full_name || user.email.split('@')[0]}</span>
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="p-2 text-white/50 hover:text-accent transition-colors"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="relative group/login flex items-center gap-2 py-2 px-6 rounded-full bg-primary text-white text-xs font-bold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(31,111,163,0.4)] active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/login:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10">Login</span>
                  <ChevronRight size={14} className="relative z-10 group-hover/login:translate-x-1 transition-transform" />
                </button>
              )}
              
              <button 
                className="lg:hidden p-2 text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="lg:hidden absolute top-full left-0 right-0 mt-4 bg-dark/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-8 flex flex-col items-center gap-4"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full"
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full text-center py-4 rounded-2xl text-lg font-display font-bold transition-all ${
                      location.pathname === link.path ? 'bg-accent/10 text-accent border border-accent/20' : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="w-full h-[1px] bg-white/5 my-2" />
              <Link 
                to="/contact-sales" 
                onClick={() => setIsOpen(false)}
                className="w-full py-5 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-bold text-center shadow-lg shadow-primary/20"
              >
                Contact Sales
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
