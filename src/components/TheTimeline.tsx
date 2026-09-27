import React from 'react';
import { WaveGallery } from './WaveGallery';
import { CharacterArtwork } from './CharacterArtwork';

export const TheTimeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-24 sm:py-28 overflow-hidden select-none bg-[#030508]/90">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_28%_45%,rgba(115,25,50,0.09),transparent_52%),radial-gradient(ellipse_at_76%_60%,rgba(70,43,121,0.08),transparent_48%),radial-gradient(ellipse_at_50%_90%,rgba(33,72,125,0.045),transparent_45%)]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <CharacterArtwork
          characterId="captain"
          opacity={0.13}
          className="w-[700px] sm:w-[850px] max-w-none transform"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.035] border border-white/10 text-slate-300 font-mono text-[11px] tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
            DIRECTIVE // SECTOR 04
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-none mb-4">
            THE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-500 ml-3">
              SEQUENCE
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
            A guide to the event flow. The official schedule, including dates and times, will be announced.
          </p>
        </div>

        <WaveGallery />
      </div>
    </section>
  );
};
