
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Added AnimatePresence to framer-motion imports
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../App';

const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Hide navbar on scroll down, show on scroll up
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
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
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between rounded-2xl border transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? 'bg-dark/80 backdrop-blur-xl border-white/10 px-6 py-2 shadow-2xl' 
            : 'bg-transparent border-transparent px-0 py-0'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="https://i.ibb.co/qY7YPMKs/Screenshot-2025-12-19-140748-removebg-preview-1.png" 
              alt="ResQLink Logo" 
              className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform"
            />
            <span className="font-display font-bold text-xl tracking-tight text-light">ResQLink</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                  location.pathname === link.path ? 'text-accent' : 'text-light/70 hover:text-light'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" 
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/account" 
                  className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
                >
                  <User size={16} className="text-accent" />
                  <span className="font-medium text-light/90">{user.full_name || user.email.split('@')[0]}</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="p-2 text-light/50 hover:text-accent transition-colors"
                  title="Log out"
                >
                  <LogOut size={18} />
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
            className="lg:hidden p-2 text-light"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-display font-medium ${
                    location.pathname === link.path ? 'text-accent' : 'text-light/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-full h-[1px] bg-white/10 my-4" />
              {user ? (
                <>
                  <Link to="/account" onClick={() => setIsOpen(false)} className="text-xl font-medium text-secondary">
                    Account Dashboard
                  </Link>
                  <button onClick={() => { setIsOpen(false); signOut(); }} className="text-xl font-medium text-light/50">
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
