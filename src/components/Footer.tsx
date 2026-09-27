import React from 'react';
import { EVENT_CONFIG } from '../data/event';
import { ArrowUp, Terminal, Shield, ExternalLink } from 'lucide-react';
import gfgMark from '../assets/gfg-mark.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#030406]/82 text-slate-400 select-none overflow-hidden">
      {/* Subtle top edge glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Identity Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-8 rounded-lg bg-emerald-400/[0.06] border border-emerald-400/20 flex items-center justify-center">
                <img src={gfgMark} alt="GeeksforGeeks" className="w-7 h-auto object-contain drop-shadow-[0_0_7px_rgba(45,191,99,0.52)]" />
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                {EVENT_CONFIG.eventName}
              </span>
            </div>

            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
              {EVENT_CONFIG.organizer.name} • {EVENT_CONFIG.organizer.university}
            </p>

            <p className="text-xs text-slate-400 font-body leading-relaxed max-w-sm mb-6">
              A flagship technological assembly merging high-velocity software engineering with cinematic marvels. Where builders assemble.
            </p>

            <div className="font-display font-bold text-sm tracking-[0.25em] text-white">
              BUILD. COMPETE. ASSEMBLE.
            </div>
          </div>

          {/* Social Links Column */}
          <div>
            <div className="font-mono text-xs text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-300" />
              <span>FREQUENCIES</span>
            </div>

            <ul className="space-y-2.5 text-xs font-mono">
              {EVENT_CONFIG.socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 group interactive"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Telemetry Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-300" />
                <span>SECTOR INTEL</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div>SECTOR: {EVENT_CONFIG.sector}</div>
                <div>COORDS: {EVENT_CONFIG.coordinates.lat}</div>
                <div>STATUS: SECURE // CIPHER-256</div>
              </div>
            </div>

            {/* Back to top button */}
            <div className="pt-6">
              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 hover:text-white transition-all interactive"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>SYSTEM ONLINE</span>
            <span>•</span>
            <span>GFG × BENNETT UNIVERSITY</span>
            <span>•</span>
            <span>SCHEDULE TBA</span>
          </div>

          <div className="text-slate-600 text-center sm:text-right">
            INDEPENDENT STUDENT CHAPTER CONCLAVE • THEMATIC MARVEL-INSPIRED EXPERIENCE
          </div>
        </div>
      </div>
    </footer>
  );
};
