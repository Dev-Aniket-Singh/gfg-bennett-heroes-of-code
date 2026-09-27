import React, { useEffect, useRef, useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/timeline';

const timelineAccents = ['#E45464', '#A276F1', '#4D89D5', '#A276F1', '#D84C61'];

export const WaveGallery: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = galleryRef.current?.closest('section');
    if (!section) return;

    const updateActivePhase = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
      const index = Math.min(TIMELINE_MILESTONES.length - 1, Math.round(progress * (TIMELINE_MILESTONES.length - 1)));
      setActiveStep((current) => current === TIMELINE_MILESTONES[index].id ? current : TIMELINE_MILESTONES[index].id);
    };

    window.addEventListener('scroll', updateActivePhase, { passive: true });
    window.addEventListener('resize', updateActivePhase);
    updateActivePhase();
    return () => {
      window.removeEventListener('scroll', updateActivePhase);
      window.removeEventListener('resize', updateActivePhase);
    };
  }, []);

  return (
    <div ref={galleryRef} className="relative w-full py-12 select-none">
      <div className="hidden lg:block relative max-w-6xl mx-auto">
        <div className="relative h-24 mb-10">
          <svg
            viewBox="0 0 1000 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <path
              d="M 50 60 Q 250 15, 450 60 T 850 60 L 950 60"
              stroke="rgba(194, 202, 213, 0.13)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path
              d="M 50 60 Q 250 15, 450 60 T 850 60 L 950 60"
              stroke="url(#waveGrad)"
              strokeWidth="2.5"
            />
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D84C61" />
                <stop offset="52%" stopColor="#9969D6" />
                <stop offset="100%" stopColor="#4D89D5" />
              </linearGradient>
            </defs>
            <path
              d="M 50 60 Q 250 15, 450 60 T 850 60 L 950 60"
              stroke="#ED6673"
              strokeWidth="2.5"
              strokeDasharray="64 1100"
              strokeDashoffset={-Math.max(0, TIMELINE_MILESTONES.findIndex((item) => item.id === activeStep)) * 220}
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle r="3.5" fill="#F07A83" opacity="0.9">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 50 60 Q 250 15, 450 60 T 850 60 L 950 60" />
            </circle>
          </svg>

          <div className="absolute inset-0 flex items-center justify-between px-6">
            {TIMELINE_MILESTONES.map((item, idx) => {
              const isActive = activeStep === item.id;
              const accent = timelineAccents[idx % timelineAccents.length];
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStep(item.id)}
                  className={`group relative flex flex-col items-center transition-all duration-300 interactive ${
                    idx % 2 === 0 ? '-translate-y-4' : 'translate-y-4'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'text-white scale-110 ring-4 ring-white/10'
                        : 'bg-[#090C10] text-slate-400 border border-white/10 group-hover:border-white/25 group-hover:text-white'
                    }`}
                    style={isActive ? { backgroundColor: accent, boxShadow: `0 0 18px ${accent}66` } : undefined}
                  >
                    <span className="font-mono text-xs font-bold">{item.step}</span>
                  </div>

                  <span
                    className={`mt-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      isActive ? 'text-slate-100 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                    style={isActive ? { textShadow: `0 0 14px ${accent}88` } : undefined}
                  >
                    PHASE {item.step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {TIMELINE_MILESTONES.map((m, idx) => {
            const isSelected = activeStep === m.id;
            const accent = timelineAccents[idx % timelineAccents.length];
            return (
              <div
                key={m.id}
                onClick={() => setActiveStep(m.id)}
                className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#12121A]/94 border shadow-[0_18px_50px_rgba(0,0,0,0.32)] -translate-y-2'
                    : 'bg-[#090C10]/78 border border-white/10 hover:border-white/20 hover:bg-[#11151B]/90'
                }`}
                style={isSelected ? { borderColor: `${accent}88`, boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 24px ${accent}20`, backgroundImage: `radial-gradient(ellipse at 0% 0%, ${accent}1C, transparent 70%)` } : undefined}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    {m.timeframe}
                  </span>
                  {m.status === 'ACTIVE' ? (
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  )}
                </div>

                <h4 className="font-display font-bold text-sm text-white mb-2 leading-snug">
                  {m.title}
                </h4>

                <p className="text-xs text-slate-400 font-body leading-relaxed mb-4">
                  {m.description}
                </p>

                <div className="pt-3 border-t border-white/[0.06] text-[9px] font-mono text-slate-500 flex items-center justify-between">
                  <span>{m.protocol}</span>
                  <span className="text-slate-300">{m.clearanceLevel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden relative pl-6 border-l border-white/10 max-w-lg mx-auto flex flex-col gap-6">
        {TIMELINE_MILESTONES.map((m, idx) => {
          const isSelected = activeStep === m.id;
          const accent = timelineAccents[idx % timelineAccents.length];
          return (
            <div
              key={m.id}
              onClick={() => setActiveStep(m.id)}
              className="relative group"
            >
              <div
                className={`absolute -left-[31px] top-4 w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-white scale-125'
                    : 'bg-[#050608] border-white/15'
                }`}
                style={isSelected ? { backgroundColor: accent, boxShadow: `0 0 16px ${accent}99` } : undefined}
              />

              <div
                className={`p-5 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#12121A]/92 border shadow-lg'
                    : 'bg-[#090C10]/78 border border-white/10'
                }`}
                style={isSelected ? { borderColor: `${accent}88`, backgroundImage: `radial-gradient(ellipse at 0% 0%, ${accent}1C, transparent 70%)` } : undefined}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>PHASE {m.step}</span>
                  <span className="text-slate-300">{m.timeframe}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-300 font-body leading-relaxed mb-3">
                  {m.description}
                </p>
                <div className="text-[10px] font-mono text-slate-500">
                  {m.protocol}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
