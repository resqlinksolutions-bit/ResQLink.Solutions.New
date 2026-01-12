
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../App';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
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
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      {/* Background overlay for visibility on light/complex backgrounds */}
      {!isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 to-transparent pointer-events-none -z-10" />
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between rounded-2xl border transition-all duration-500 ${
          isScrolled 
            ? 'bg-dark/90 backdrop-blur-2xl border-white/10 px-6 py-2 shadow-2xl shadow-black/50' 
            : 'bg-transparent border-transparent px-0 py-0'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group py-2">
            <img 
              src="https://i.ibb.co/qY7YPMKs/Screenshot-2025-12-19-140748-removebg-preview-1.png" 
              alt="ResQLink Logo" 
              className="w-9 h-9 object-contain group-hover:rotate-12 transition-transform"
            />
            <span className="font-display font-bold text-xl tracking-tight text-white">ResQLink</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 relative group py-2 ${
                  location.pathname === link.path ? 'text-accent' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" 
                  />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/get-started"
              className="hidden xl:flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/20 text-xs font-bold text-accent hover:bg-accent hover:text-dark hover:border-accent transition-all active:scale-95"
            >
              Contact Sales
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/account" 
                  className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-colors"
                >
                  <User size={14} className="text-accent" />
                  <span className="font-semibold text-white">{user.full_name || user.email.split('@')[0]}</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="p-2 text-white/50 hover:text-accent transition-colors"
                  title="Log out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="flex items-center gap-2 py-2 px-6 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/80 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Login <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-dark/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-12 flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-display font-bold ${
                    location.pathname === link.path ? 'text-accent' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-full h-[1px] bg-white/10 my-4" />
              {user ? (
                <>
                  <Link to="/account" onClick={() => setIsOpen(false)} className="text-xl font-bold text-secondary">
                    Account Dashboard
                  </Link>
                  <button onClick={() => { setIsOpen(false); signOut(); }} className="text-xl font-bold text-white/50">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setIsOpen(false); signIn(); }}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
