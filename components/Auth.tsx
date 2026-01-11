
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Github, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabase';
import { UserProfile } from '../types';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSupabaseConfigured()) {
        if (isLogin) {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          if (data.user) {
            onAuthSuccess({
              id: data.user.id,
              email: data.user.email || '',
              full_name: data.user.user_metadata?.full_name,
            });
          }
        } else {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
          });
          if (error) throw error;
          if (data.user) {
            onAuthSuccess({
              id: data.user.id,
              email: data.user.email || '',
              full_name: fullName,
            });
          }
        }
      } else {
        // Mock Auth for Demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          full_name: fullName || email.split('@')[0],
        };
        localStorage.setItem('resqlink_mock_user', JSON.stringify(mockUser));
        onAuthSuccess(mockUser);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-dark border border-white/10 p-8 rounded-3xl shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-light/30 hover:text-accent transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <ShieldCheck size={32} className="text-dark" />
              </div>
              <h2 className="text-2xl font-display font-bold text-center">
                {isLogin ? 'Access ResQLink' : 'Secure Your Identity'}
              </h2>
              <p className="text-light/50 text-sm mt-2 text-center">
                {isLogin ? 'Login to view the 3D visualizer and dashboard' : 'Create an account to join the mesh network'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-light/40 font-bold ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-light/20" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-light placeholder:text-light/20 focus:border-accent/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-light/40 font-bold ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-light/20" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-light placeholder:text-light/20 focus:border-accent/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-light/40 font-bold ml-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-light/20" size={18} />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-light placeholder:text-light/20 focus:border-accent/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400 font-medium px-2">{error}</p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 mt-4 group"
              >
                {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-light/40">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-accent font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>

            {!isSupabaseConfigured() && (
              <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-[10px] text-accent font-bold uppercase text-center tracking-tighter">
                  Demo Mode: Any credentials will work
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Auth;
