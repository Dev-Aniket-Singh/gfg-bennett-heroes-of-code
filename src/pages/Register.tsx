import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GlowRingButton } from '../components/GlowRingButton';
import { ArrowLeft, CheckCircle2, Lock, Mail, User, Building, BookOpen, Users, Terminal, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegisterProps {
  navigate: (path: string) => void;
  mode?: 'standard' | 'team' | 'solo';
}

export const Register: React.FC<RegisterProps> = ({ navigate, mode = 'standard' }) => {
  const { signUp, isLoading, isDemoMode } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: 'Bennett University',
    year: '2nd Year',
    branch: 'Computer Science & Engineering',
    teamName: '',
    roleSpecialization: 'Fullstack / Systems',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successResult, setSuccessResult] = useState<{ operativeId: string } | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = 'Operative callsign / name is mandatory.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Secure transmission email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Invalid email syntax detected.';
    }

    if (!formData.password) {
      errs.password = 'Security access key cannot be empty.';
    } else if (formData.password.length < 8) {
      errs.password = 'Access key must be at least 8 characters long.';
    } else if (!/[0-9]/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      errs.password = 'Must contain both letters and numeric digits.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Access key verification mismatch.';
    }

    if (!formData.college.trim()) errs.college = 'Institution / base sector required.';
    if (mode === 'team' && !formData.teamName.trim()) errs.teamName = 'Squad callsign is required for team registration.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await signUp({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      college: formData.college,
      year: formData.year,
      branch: formData.branch,
      teamName: formData.teamName || undefined,
      roleSpecialization: formData.roleSpecialization,
    });

    if (res.success && res.operativeId) {
      setSuccessResult({ operativeId: res.operativeId });
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#5C0000', '#990000', '#C00000', '#E62429', '#FF2020', '#FFFFFF'],
        });
      } catch {
        // silent
      }
    } else if (res.error) {
      setErrors({ form: res.error });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 relative select-none bg-[#050608]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <GlowRingButton
            variant="amber"
            onClick={() => navigate(mode === 'standard' ? '/' : '/assembly')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            RETURN TO BASE
          </GlowRingButton>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-500">
            <Terminal className="w-3.5 h-3.5 text-gfg-green" />
            <span>PORTAL: SECURE ENCRYPTED (CIPHER-256)</span>
          </div>
        </div>

        {successResult ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#080B10]/95 backdrop-blur-2xl border-2 border-emerald-500/40 shadow-glow-gfg text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-gfg-green">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
              {mode === 'standard' ? 'MISSION STATUS: REGISTRATION CONFIRMED' : 'DEMO PROFILE READY · NOT SUBMITTED'}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-2">
              WELCOME TO THE ASSEMBLY, OPERATIVE.
            </h2>

            <p className="text-sm text-slate-400 font-body mb-8 max-w-md mx-auto">
              {mode === 'standard'
                ? 'Your credentials have been authenticated and archived into the Heroes of Code registry.'
                : 'This is a local demo session only. No registration has been sent to or saved by a server.'}
            </p>

            <div className="max-w-md mx-auto p-6 rounded-2xl bg-space-950/80 border border-white/15 mb-8 text-left relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gfg-green text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                CLEARED
              </div>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                ASSIGNED OPERATIVE ID
              </div>
              <div className="text-2xl font-mono font-black text-gfg-green tracking-wider mb-4">
                {successResult.operativeId}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">OPERATIVE</span>
                  {formData.fullName}
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SECTOR / BASE</span>
                  {formData.college}
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">TRACK</span>
                  {formData.roleSpecialization}
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">TEAM</span>
                  {formData.teamName || 'SOLO / PENDING SQUAD'}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowRingButton
                variant="green"
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto"
              >
                ACCESS MISSION CONTROL
              </GlowRingButton>

              <button
                onClick={() => navigate(mode === 'standard' ? '/' : '/assembly')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all interactive"
              >
                RETURN HOME
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#080B10]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase tracking-widest mb-3">
                <Sparkles className="w-3 h-3" />
                OFFICIAL ASSEMBLY PROTOCOL
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight mb-2">
                {mode === 'team' ? 'TEAM REGISTRATION' : mode === 'solo' ? 'SOLO REGISTRATION' : 'OPERATIVE REGISTRATION'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 font-body">
                {mode === 'standard'
                  ? 'Enter your credentials to reserve your clearance at Heroes of Code.'
                  : `Complete this demo profile for the Heroes of Code ${mode} pathway.`}
              </p>
            </div>

            {errors.form && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-xs font-mono text-rose-300">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Tony Stark"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green focus:ring-1 focus:ring-gfg-green text-sm text-white placeholder-slate-600 font-body outline-none transition-all"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Transmission Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="operative@domain.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green focus:ring-1 focus:ring-gfg-green text-sm text-white placeholder-slate-600 font-body outline-none transition-all"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Security Access Key *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 8 chars, 1 number"
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
                  {errors.password && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Verify Access Key *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Repeat access key"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green focus:ring-1 focus:ring-gfg-green text-sm text-white placeholder-slate-600 font-body outline-none transition-all"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    College / Base Sector *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      placeholder="Bennett University"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green focus:ring-1 focus:ring-gfg-green text-sm text-white placeholder-slate-600 font-body outline-none transition-all"
                    />
                  </div>
                  {errors.college && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.college}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Academic Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green text-sm text-white font-body outline-none transition-all"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Postgraduate">Postgraduate / Masters</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Branch / Specialization
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      placeholder="e.g. Computer Science, AI, ECE"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green text-sm text-white font-body outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Preferred Tactical Track
                  </label>
                  <select
                    value={formData.roleSpecialization}
                    onChange={(e) => setFormData({ ...formData, roleSpecialization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green text-sm text-white font-body outline-none transition-all"
                  >
                    <option value="Algorithm & Core Backend">Algorithm & Core Backend (C++, Go)</option>
                    <option value="Neural Intelligence & Agents">Neural Intelligence & Agents (AI/ML)</option>
                    <option value="Spatial & Creative Frontend">Spatial & Creative Frontend (React/3D)</option>
                    <option value="Embedded Systems & Silicon">Embedded Systems & Silicon (IoT)</option>
                    <option value="Cyber Defense & Binary CTF">Cyber Defense & Binary CTF</option>
                  </select>
                </div>
              </div>

              {mode !== 'solo' && <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Squad / Team Name {mode === 'team' ? '*' : '(Optional)'}
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder={mode === 'team' ? 'Enter your squad callsign' : 'e.g. Arc Reactors, Byte Avengers'}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-space-950/70 border border-white/10 focus:border-gfg-green text-sm text-white font-body outline-none transition-all"
                  />
                </div>
                {errors.teamName && <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.teamName}</span>}
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  {mode === 'team' ? 'This demo asks for your squad name.' : 'You can recruit or link teammates inside Mission Control after registration.'}
                </span>
              </div>}

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  {mode !== 'standard' ? 'DEMO ONLY: No registration is sent to a server.' : isDemoMode ? 'SANDBOX PROTOCOL: Passwords sanitized & encrypted. Ready for live backend attachment.' : 'SECURE PRODUCTION ENDPOINT'}
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <GlowRingButton
                  type="submit"
                  variant="green"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold shadow-glow-gfg"
                >
                  {isLoading ? 'PREPARING PROFILE...' : mode === 'team' ? 'CREATE DEMO SQUAD' : mode === 'solo' ? 'CREATE SOLO PROFILE' : 'JOIN THE ASSEMBLY'}
                </GlowRingButton>

                <div className="text-xs font-mono text-slate-400">
                  Already cleared?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-gfg-green hover:underline font-semibold interactive"
                  >
                    ACCESS TERMINAL
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
