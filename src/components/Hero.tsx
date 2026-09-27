import React, { useState, useEffect, useRef } from 'react';
import { EVENT_CONFIG } from '../data/event';
import { CharacterArtwork } from './CharacterArtwork';
import { GlowRingButton } from './GlowRingButton';
import { ArrowDown, Terminal } from 'lucide-react';
import { usePointerPhysics } from '../hooks/usePointerPhysics';
import { useIsMobile } from '../hooks/useMediaQuery';

interface HeroProps {
  onAssembleClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAssembleClick, onExploreClick }) => {
  const isMobile = useIsMobile();
  const pointer = usePointerPhysics(0.1);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const registrationPercent = Math.min(
    100,
    Math.max(0, Math.round((EVENT_CONFIG.registration.registeredCount / Math.max(EVENT_CONFIG.registration.slotsLimit, 1)) * 100))
  );

  // Calculate distance between pointer and hero center
  const [coreIntensity, setCoreIntensity] = useState<number>(1);
  const [vortexRotation, setVortexRotation] = useState<number>(0);

  // Continuous pointer physics for hero core and character parallax
  useEffect(() => {
    if (isMobile) return;

    // Proximity to screen center
    const distToCenter = Math.hypot(pointer.normX, pointer.normY);
    // Closer to center = higher energy
    const intensity = Math.max(0.6, 1.8 - distToCenter * 0.9);
    setCoreIntensity(intensity);

    // Rotational impulse from speed
    setVortexRotation((prev) => prev + 0.2 + pointer.speed * 0.08);
  }, [pointer.normX, pointer.normY, pointer.speed, isMobile]);

  // Parallax offsets
  const parallaxX = isMobile ? 0 : pointer.normX * 28;
  const parallaxY = isMobile ? 0 : pointer.normY * 20;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden select-none"
    >
      {/* Fine-line spider silk, drawn as an atmospheric SVG layer (not a bitmap). */}
      <svg
        className="absolute inset-x-0 top-0 z-[3] h-[clamp(300px,46vh,440px)] w-full pointer-events-none"
        viewBox="0 0 1440 440"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="rgba(242,246,252,0.58)" strokeWidth="1.8" strokeLinecap="round">
          {/* Strong anchor strands and long corner drops */}
          <path d="M0 0L0 170M0 0L245 0M1440 0L1440 170M1440 0L1195 0M0 0L380 318M1440 0L1060 318" />
          {/* Radial silk spokes */}
          <path d="M0 0Q110 180 260 0M0 0Q205 250 470 0M0 0Q315 315 690 0M0 0Q430 365 900 0M1440 0Q1330 180 1180 0M1440 0Q1235 250 970 0M1440 0Q1125 315 750 0M1440 0Q1010 365 540 0" />
          {/* Dense curved capture spirals joining the spokes */}
          <path d="M35 36Q720 174 1405 36M70 76Q720 208 1370 76M115 118Q720 245 1325 118M170 162Q720 281 1270 162M235 207Q720 316 1205 207M310 252Q720 350 1130 252M390 296Q720 382 1050 296M485 338Q720 410 955 338" />
          {/* Long, naturally uneven hanging threads */}
          <path d="M155 44C162 137 149 224 158 315M405 107C412 179 399 235 407 285M720 172C728 245 714 301 722 374M1035 102C1028 184 1043 236 1035 292M1280 40C1274 132 1288 225 1280 328" />
        </g>
        {/* Tiny stylized spiders suspended from the strands */}
        <g stroke="rgba(242,246,252,0.7)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <g transform="translate(158 322) scale(1.25)"><ellipse cy="0" rx="3.5" ry="5.5" fill="rgba(242,246,252,0.7)"/><path d="M-2 -2l-7 -6m-1 3l7 5m-7 1l7 3m-6 5l7 -4m4 -7l7 -6m1 3l-7 5m7 1l-7 3m6 5l-7 -4"/></g>
          <g transform="translate(722 382) scale(1.05)"><ellipse cy="0" rx="3.5" ry="5.5" fill="rgba(242,246,252,0.7)"/><path d="M-2 -2l-7 -6m-1 3l7 5m-7 1l7 3m-6 5l7 -4m4 -7l7 -6m1 3l-7 5m7 1l-7 3m6 5l-7 -4"/></g>
          <g transform="translate(1280 336) scale(1.2)"><ellipse cy="0" rx="3.5" ry="5.5" fill="rgba(242,246,252,0.7)"/><path d="M-2 -2l-7 -6m-1 3l7 5m-7 1l7 3m-6 5l7 -4m4 -7l7 -6m1 3l-7 5m7 1l-7 3m6 5l-7 -4"/></g>
        </g>
      </svg>

      {/* Bioluminescent Cosmic Vortex Center */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-all duration-300 pointer-events-none"
          style={{
            width: `${600 * coreIntensity}px`,
            height: `${600 * coreIntensity}px`,
            background: `radial-gradient(ellipse at 50% 50%, rgba(122, 28, 42, ${0.042 * coreIntensity}) 0%, rgba(88, 22, 34, ${0.032 * coreIntensity}) 46%, rgba(44, 16, 24, ${0.018 * coreIntensity}) 74%, transparent 100%)`,
            transform: `translate(-50%, -50%) translate3d(${parallaxX * 0.5}px, ${parallaxY * 0.5}px, 0)`,
          }}
        />
      </div>

      {/* Atmospheric Iron Man Etched Artwork with Live Parallax & Right Alignment */}
      <div
        className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none z-[1] overflow-hidden lg:pr-12"
        style={{
          transform: `translate3d(${-parallaxX * 0.8}px, ${-parallaxY * 0.8}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <CharacterArtwork
          characterId="ironman"
          opacity={0.17}
          className="w-[720px] sm:w-[920px] lg:w-[1050px] max-w-none transform translate-y-8 lg:translate-y-4"
        />
      </div>

      {/* Rotating Concentric HUD Energy Rings Driven by Cursor Velocity */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[2]"
        style={{
          transform: `translate(-50%, -50%) translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.3}px, 0)`,
        }}
      >
        <div
          className="w-[340px] sm:w-[560px] md:w-[720px] h-[340px] sm:h-[560px] md:h-[720px] rounded-full border border-white/[0.04]"
          style={{ transform: `rotate(${vortexRotation}deg)` }}
        />
        <div
          className="absolute inset-6 rounded-full border border-dashed border-white/[0.07]"
          style={{ transform: `rotate(${-vortexRotation * 1.4}deg)` }}
        />
        <div className="absolute inset-20 rounded-full border border-white/[0.03]" />
      </div>

      {/* Hero Foreground Content */}
      <div
        className="relative z-10 w-full min-w-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
        style={{
          transform: `translate3d(${parallaxX * 0.2}px, ${parallaxY * 0.2}px, 0)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Micro Tagline Badge */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 mb-8 shadow-hud-card">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
          <span className="max-w-full text-center font-mono text-[10px] sm:text-xs text-red-100 glow-text-red tracking-[0.1em] sm:tracking-[0.2em] uppercase">
            GEEKSFORGEEKS × BENNETT UNIVERSITY
          </span>
          <span className="w-1 h-3 bg-white/20" />
          <span className="font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-wider">
            {EVENT_CONFIG.season}
          </span>
        </div>

        {/* Editorial Cinematic Giant Heading */}
        <h1 className="hero-title-crimson w-full max-w-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight leading-[0.92] mb-6">
          HEROES
          <span className="block font-black">OF CODE</span>
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-full font-mono text-xs sm:text-base md:text-lg tracking-[0.14em] sm:tracking-[0.3em] uppercase text-slate-200 font-medium mb-6">
          {EVENT_CONFIG.tagline}
        </p>

        {/* Editable Event Description */}
        <p className="w-full min-w-0 max-w-2xl text-slate-400 text-sm sm:text-base font-body leading-relaxed mb-10 text-balance break-words">
          {EVENT_CONFIG.subtitle}
        </p>

        {/* Live Mission Assembly Countdown Ticker */}
        <div className="mb-10 max-w-full p-3 sm:p-4 rounded-2xl bg-[#080B10]/80 backdrop-blur-md border border-white/10 shadow-[0_0_32px_rgba(0,0,0,0.24)]">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3 text-slate-300" />
            <span>MISSION COUNTDOWN TO DISRUPTION</span>
          </div>

          <div aria-label="Countdown unavailable until the event schedule is announced" className="flex justify-center gap-4 sm:gap-6 text-xl sm:text-2xl font-mono font-semibold tracking-[0.16em] text-white">
            <span>??</span>
            <span>??</span>
            <span>??</span>
            <span>??</span>
          </div>
        </div>

        {/* Primary and Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16">
          <GlowRingButton
            variant="amber"
            onClick={onAssembleClick}
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-widest shadow-[0_0_18px_rgba(255,184,0,0.14)]"
          >
            ASSEMBLE NOW
          </GlowRingButton>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 interactive flex items-center justify-center gap-2"
          >
            <span>EXPLORE THE MISSION</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Technical Coordinates & Micro Intel Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl pt-8 border-t border-white/[0.06] text-left">
          <div className="hero-stat-panel min-w-0">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">VENUE</div>
            <div className="text-xs font-mono font-medium text-slate-200 mt-1">{EVENT_CONFIG.venue}</div>
          </div>
          <div className="hero-stat-panel min-w-0">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SCHEDULE</div>
            <div className="text-xs font-mono font-medium text-slate-200 mt-1">TBA</div>
          </div>
          <div className="hero-stat-panel min-w-0">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">REGISTRATION</div>
            <div className="text-xs font-mono font-semibold text-slate-200 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              {EVENT_CONFIG.registration.statusText}
            </div>
          </div>
          <div className="hero-stat-panel col-span-2 lg:col-span-1 min-w-0">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SLOTS TAKEN</div>
            <div className="text-[11px] font-mono font-semibold text-slate-100 mt-1 flex items-center justify-between gap-2">
              <span>{EVENT_CONFIG.registration.registeredCount} / {EVENT_CONFIG.registration.slotsLimit} SLOTS TAKEN</span>
              <span className="text-slate-300">{registrationPercent}%</span>
            </div>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Registration slots taken"
              aria-valuemin={0}
              aria-valuemax={EVENT_CONFIG.registration.slotsLimit}
              aria-valuenow={EVENT_CONFIG.registration.registeredCount}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d21837] via-[#ff405c] to-[#ff9a9e] shadow-[0_0_12px_rgba(255,48,83,0.72)] transition-[width] duration-700"
                style={{ width: `${registrationPercent}%` }}
              />
            </div>
            <div className="mt-1 text-[9px] font-mono text-slate-500">CONFIGURED SNAPSHOT</div>
          </div>
        </div>
      </div>
    </section>
  );
};
