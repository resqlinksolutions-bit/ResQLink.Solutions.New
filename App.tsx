
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase, isSupabaseConfigured } from './supabase';
import Navbar from './components/Navbar';
import StartupLoader from './components/StartupLoader';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Features from './pages/Features';
import Team from './pages/Team';
import Account from './pages/Account';
import GetStarted from './pages/GetStarted';
import Auth from './components/Auth';
import { UserProfile } from './types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Let the startup loader handle initial loading visual
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const minLoadingTime = 2500; // 2.5 seconds minimum for premium feel

    const checkUser = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name,
            });
          }
        } else {
          const mockUser = localStorage.getItem('resqlink_mock_user');
          if (mockUser) setUser(JSON.parse(mockUser));
        }
      } finally {
        // Ensure loader is visible for at least minLoadingTime
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, minLoadingTime - elapsed);
        
        setTimeout(() => {
          setLoading(false);
        }, delay);
      }
    };

    checkUser();

    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name,
          });
        } else {
          setUser(null);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('resqlink_mock_user');
      setUser(null);
    }
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn: handleSignIn, signOut: handleSignOut }}>
      <HashRouter>
        <div className="min-h-screen bg-dark text-light font-sans selection:bg-accent selection:text-dark">
          <AnimatePresence>
            {loading && <StartupLoader key="startup-loader" />}
          </AnimatePresence>
          
          <Navbar />
          
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/features" element={<Features />} />
                <Route path="/team" element={<Team />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route 
                  path="/account" 
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </main>

          <Auth isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuthSuccess={(u) => setUser(u)} />
          
          <footer className="py-20 px-6 border-t border-white/5 bg-dark">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src="https://i.ibb.co/qY7YPMKs/Screenshot-2025-12-19-140748-removebg-preview-1.png" 
                    alt="ResQLink Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <h2 className="text-3xl font-display font-bold text-accent">ResQLink</h2>
                </div>
                <p className="text-light/60 max-w-sm mb-8">
                  Providing resilient communication infrastructure for emergency scenarios where standard networks fail. Safety without boundaries.
                </p>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'Github'].map(s => (
                    <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-dark transition-all duration-300">
                      <span className="sr-only">{s}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-6 text-secondary">Product</h3>
                <ul className="space-y-4 text-light/50">
                  <li><a href="#/technology" className="hover:text-accent transition-colors">Technology</a></li>
                  <li><a href="#/features" className="hover:text-accent transition-colors">Features</a></li>
                  <li><a href="#/get-started" className="hover:text-accent transition-colors">Get Started</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-6 text-secondary">Company</h3>
                <ul className="space-y-4 text-light/50">
                  <li><a href="#/team" className="hover:text-accent transition-colors">Team</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-light/30 text-sm">
              <p>&copy; 2024 ResQLink Communications. All rights reserved.</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
