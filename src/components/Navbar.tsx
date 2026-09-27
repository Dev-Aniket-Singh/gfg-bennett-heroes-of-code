import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Terminal, ArrowRight, UserCheck } from 'lucide-react';
import { EVENT_CONFIG } from '../data/event';
import gfgMark from '../assets/gfg-mark.png';

interface NavbarProps {
  currentSectionIndex?: number;
  totalSections?: number;
  onNavigate?: (sectionId: string) => void;
  onAssembleClick?: () => void;
  activePath?: string;
  navigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSectionIndex = 1,
  totalSections = 6,
  onNavigate,
  onAssembleClick,
  activePath = '/',
  navigate,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '01 HERO' },
    { id: 'about', label: '02 MISSION' },
    { id: 'challenges', label: '03 CHALLENGE' },
    { id: 'timeline', label: '04 SEQUENCE' },
    { id: 'rewards', label: '05 VAULT' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (activePath !== '/') {
      if (navigate) navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return;
    }
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAssembleAction = () => {
    setMobileMenuOpen(false);
    if (onAssembleClick) {
      onAssembleClick();
    } else if (navigate) {
      navigate('/register');
    }
  };

  return (
    <>
      <header
        className={`mission-navbar fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#050608]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (navigate) navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group text-left interactive"
            >
              <div className="w-9 h-8 rounded-lg bg-emerald-400/[0.06] border border-emerald-400/20 group-hover:border-emerald-300/60 flex items-center justify-center transition-all duration-300">
                <img src={gfgMark} alt="" aria-hidden="true" className="w-7 h-auto object-contain drop-shadow-[0_0_7px_rgba(45,191,99,0.52)] group-hover:drop-shadow-[0_0_12px_rgba(61,220,115,0.8)] transition-all duration-300" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-slate-200 transition-colors">
                    GFG × BENNETT
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.035] border border-white/10 text-[9px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] font-mono text-slate-500 tracking-wider">
                  BU-SECTOR-01 // {EVENT_CONFIG.season}
                </div>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#080A0E]/80 backdrop-blur-md border border-white/[0.07]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 interactive"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] text-slate-400">
              <span className="text-white font-semibold">
                {String(currentSectionIndex).padStart(2, '0')}
              </span>
              <span className="text-slate-600">/</span>
              <span>{String(totalSections).padStart(2, '0')}</span>
            </div>

            {isAuthenticated && user ? (
              <button
                onClick={() => navigate && navigate('/dashboard')}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs tracking-wider transition-all interactive"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{user.operativeId}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate && navigate('/login')}
                  className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors interactive"
                >
                  LOGIN
                </button>
                <button
                  onClick={handleAssembleAction}
                  className="relative group flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-300/15 border border-amber-200/25 hover:border-amber-200/45 text-amber-100 font-mono text-xs tracking-wider transition-all duration-200 interactive"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  <span>ASSEMBLE</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && user ? (
              <button
                onClick={() => navigate && navigate('/dashboard')}
                className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]"
              >
                {user.operativeId}
              </button>
            ) : null}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white transition-colors interactive"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[99] bg-[#050608]/98 backdrop-blur-2xl transition-all duration-400 md:hidden flex flex-col justify-between p-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-20">
          <div className="flex items-center gap-2 mb-8 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
            <span>MISSION BRIEFING NAVIGATION</span>
          </div>

          <nav className="flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="flex items-center justify-between py-3 border-b border-white/[0.06] text-left font-display text-xl font-bold text-slate-200 hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-slate-600">0{idx + 1}</span>
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (navigate) navigate('/register');
              }}
              className="flex items-center justify-between py-3 border-b border-white/[0.06] text-left font-display text-xl font-bold text-amber-400"
            >
              <span>06 ASSEMBLE PORTAL</span>
              <span className="font-mono text-xs text-amber-500">NEW</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
          {isAuthenticated && user ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (navigate) navigate('/dashboard');
              }}
              className="w-full py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs tracking-wider flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>ACCESS MISSION CONTROL ({user.operativeId})</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (navigate) navigate('/login');
                }}
                className="py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs tracking-wider"
              >
                LOGIN
              </button>
              <button
                onClick={handleAssembleAction}
                className="py-3 rounded-xl bg-amber-400/10 border border-amber-200/25 text-amber-100 font-mono text-xs tracking-wider font-semibold"
              >
                ASSEMBLE NOW
              </button>
            </div>
          )}

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2">
            <span>BU-SECTOR-01</span>
            <span>SYSTEM STATUS: 100%</span>
          </div>
        </div>
      </div>
    </>
  );
};
