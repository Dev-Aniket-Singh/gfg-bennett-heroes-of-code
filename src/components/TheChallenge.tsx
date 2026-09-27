import React, { useState } from 'react';
import { SpiralSlider } from './SpiralSlider';
import { CharacterArtwork } from './CharacterArtwork';
import type { HighlightCategory } from '../types';
import { HIGHLIGHT_CATEGORIES } from '../data/highlights';
import { Terminal } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

export const TheChallenge: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<HighlightCategory>(HIGHLIGHT_CATEGORIES[0]);

  return (
    <section id="challenges" className="relative py-24 sm:py-28 overflow-hidden select-none bg-[#07090D]/74">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_44%,rgba(101,25,37,0.08),transparent_56%),linear-gradient(135deg,rgba(24,28,35,0.13),transparent_42%)]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeCategory.color }}
      />

      <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-0 overflow-hidden opacity-80">
        <CharacterArtwork
          characterId="thor"
          opacity={0.14}
          className="w-[440px] sm:w-[600px] -translate-x-28 translate-y-12 transform"
        />
        <CharacterArtwork
          characterId="hulk"
          opacity={0.14}
          className="w-[440px] sm:w-[600px] translate-x-28 -translate-y-6 transform"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.035] border border-white/10 text-slate-300 font-mono text-[11px] tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
            CHALLENGE GUIDE // 05 TRACKS
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-none mb-4">
            THE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-500 ml-3">
              CHALLENGE
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
            {isMobile
              ? 'Choose a track or swipe the guide to explore each brief, suggested tools, and difficulty.'
              : 'Choose a track to read its brief, challenge focus, and suggested tools. Use the arrow controls, track buttons, or horizontal cursor movement to explore the 3D guide.'}
          </p>
        </div>

        <SpiralSlider onCategorySelect={setActiveCategory} />

        <div className="mt-5 max-w-2xl mx-auto p-4 rounded-2xl bg-[#0A0D12]/82 backdrop-blur-md border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400" aria-live="polite">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: activeCategory.color }} />
            <span>ACTIVE TRACK: <strong className="text-white">{activeCategory.title}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>DIFFICULTY:</span>
            <span
              className="px-2 py-0.5 rounded border border-white/15 bg-white/[0.05] text-[10px] font-semibold text-slate-200"
            >
              {activeCategory.difficulty}
            </span>
            <span className="hidden sm:inline text-slate-600">//</span>
            <span className="hidden sm:inline">{activeCategory.code}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
