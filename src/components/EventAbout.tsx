import React from 'react';
import { EVENT_CONFIG } from '../data/event';
import { PostCarousel } from './PostCarousel';
import { CharacterArtwork } from './CharacterArtwork';
import { Calendar, Clock, MapPin, Award } from 'lucide-react';

export const EventAbout: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-28 overflow-hidden select-none bg-[#07090D]/68">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_52%_45%,rgba(99,26,38,0.085),transparent_56%),radial-gradient(ellipse_at_15%_74%,rgba(35,73,122,0.055),transparent_42%)]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <CharacterArtwork
          characterId="spiderman"
          opacity={0.14}
          className="w-[750px] sm:w-[950px] max-w-none transform translate-y-12"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.035] border border-white/10 text-slate-300 font-mono text-[11px] tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
            DIRECTIVE // SECTOR 02
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-none mb-4">
            THE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-500 ml-3">
              MISSION
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
            {EVENT_CONFIG.description.lead}
          </p>
        </div>

        <PostCarousel />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-[#0A0D12]/82 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-4 h-4 text-rose-300/85" />
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">DATE</span>
            </div>
            <div className="font-mono text-sm font-bold text-white">
              {EVENT_CONFIG.date}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">OFFICIAL TIMELINE TBA</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A0D12]/82 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-4 h-4 text-violet-300/85" />
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">TIME</span>
            </div>
            <div className="font-mono text-sm font-bold text-white">
              {EVENT_CONFIG.time}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">24-HOUR NON-STOP HACK</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A0D12]/82 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-4 h-4 text-sky-300/85" />
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">VENUE</span>
            </div>
            <div className="font-mono text-sm font-bold text-white">
              {EVENT_CONFIG.venue}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">GREATER NOIDA, NCR</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A0D12]/82 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-4 h-4 text-slate-300" />
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">ORGANIZED BY</span>
            </div>
            <div className="font-mono text-sm font-bold text-white">
              {EVENT_CONFIG.organizer.name}
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1 font-semibold">BENNETT UNIVERSITY CHAPTER</div>
          </div>
        </div>
      </div>
    </section>
  );
};
