import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GlowRingButton } from '../components/GlowRingButton';
import { CharacterArtwork } from './../components/CharacterArtwork';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, Terminal, KeyRound } from 'lucide-react';

interface LoginProps {
  navigate: (path: string) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await signIn({ email, password, rememberMe });
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Authentication handshake rejected.');
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('tony.stark@bennett.edu.in');
    setPassword('ArcReactor2026!');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 relative select-none flex items-center justify-center bg-[#050608]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <CharacterArtwork
          characterId="ironman"
          opacity={0.12}
          className="w-[650px] max-w-none transform"
        />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-600/10 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="mb-6">
          <GlowRingButton
            variant="amber"
            onClick={() => navigate('/')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            RETURN TO BASE
          </GlowRingButton>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#080B10]/95 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-3">
              <Terminal className="w-3 h-3 text-gfg-green" />
              TERMINAL // ACCESS POINT
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              OPERATIVE LOGIN
            </h2>

            <p className="text-xs text-slate-400 font-body mt-1">
              Authenticate your identity to enter Heroes of Code Mission Control.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs font-mono text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Transmission Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operative@bennett.edu.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green focus:ring-1 focus:ring-gfg-green text-sm text-white placeholder-slate-600 font-body outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Security Access Key
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-mono text-slate-400 hover:text-amber-400 transition-colors interactive"
                >
                  Forgot Key?
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security access key"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green focus:ring-1 focus:ring-gfg-green text-sm text-white placeholder-slate-600 font-body outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-space-950 text-gfg-green focus:ring-0"
                />
                <span>PERSIST LOCAL CIPHER</span>
              </label>
            </div>

            <div className="pt-2">
              <GlowRingButton
                type="submit"
                variant="green"
                disabled={isLoading}
                className="w-full justify-center py-3.5 text-xs font-bold shadow-glow-gfg"
              >
                {isLoading ? 'DECRYPTING SIGNALS...' : 'AUTHENTICATE & ENTER'}
              </GlowRingButton>
            </div>
          </form>

          <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">
              DEMO MODE AVAILABLE
            </span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline interactive"
            >
              AUTO-FILL TEST CREDENTIALS
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center text-xs font-mono text-slate-400">
            Unregistered operative?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-gfg-green hover:underline font-semibold ml-1 interactive"
            >
              JOIN THE ASSEMBLY
            </button>
          </div>
        </div>
      </div>

      {forgotModalOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#090C12] border border-white/15 text-left">
            <div className="flex items-center gap-3 mb-4 text-amber-400">
              <KeyRound className="w-5 h-5" />
              <h3 className="font-display font-bold text-lg text-white">ACCESS KEY RECOVERY</h3>
            </div>

            {forgotSent ? (
              <div>
                <p className="text-xs text-slate-300 font-body mb-6">
                  A cryptographic reset dispatch has been queued for transmission to your registered email.
                </p>
                <button
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotSent(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-400 font-body mb-4">
                  Enter your registered transmission email. We will broadcast a single-use verification cipher.
                </p>
                <input
                  type="email"
                  placeholder="operative@bennett.edu.in"
                  className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-xs text-white mb-4 outline-none focus:border-amber-400"
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => setForgotSent(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-mono font-bold text-black"
                  >
                    DISPATCH CIPHER
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
