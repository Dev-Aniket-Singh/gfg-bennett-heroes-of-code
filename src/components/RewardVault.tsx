import React, { useState, useEffect, useRef } from 'react';
import { REWARD_TIERS, SPECIAL_AWARDS } from '../data/rewards';
import { Trophy, Award, Crown, Sparkles, Check, Gift } from 'lucide-react';
import { CharacterArtwork } from './CharacterArtwork';
import { useIsMobile } from '../hooks/useMediaQuery';

export const RewardVault: React.FC = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Proximity energy state
  const [vaultEnergy, setVaultEnergy] = useState<number>(1);

  useEffect(() => {
    if (isMobile) return;

    const handlePointerMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDist = rect.width * 0.6;

      // Energy scales from 1 (far) to 2.2 (at center)
      const energy = Math.max(1, 2.2 - (dist / maxDist) * 1.2);
      setVaultEnergy((current) => Math.abs(current - energy) < 0.035 ? current : energy);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [isMobile]);

  return (
    <section
      id="rewards"
      ref={sectionRef}
      className="relative py-28 sm:py-32 overflow-hidden select-none bg-[#030508]/90"
    >
      {/* Hulk Monolithic Etched Character in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <CharacterArtwork
          characterId="hulk"
          opacity={0.14}
          className="w-[750px] sm:w-[950px] max-w-none transform translate-y-8"
        />
      </div>

      {/* Floating Energy Chamber Core Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${isMobile ? 'blur-[64px]' : 'blur-[160px]'} pointer-events-none transition-all duration-300`}
        style={{
          width: `${520 * vaultEnergy}px`,
          height: `${520 * vaultEnergy}px`,
          background: `radial-gradient(ellipse, rgba(209, 135, 48, ${0.08 * vaultEnergy}) 0%, rgba(141, 75, 38, ${0.055 * vaultEnergy}) 32%, rgba(92, 32, 50, ${0.04 * vaultEnergy}) 58%, transparent 82%)`,
        }}
      />

      {/* Dynamic Rotating 3D Energy Rings around Central Vault */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div
          className="w-[460px] sm:w-[680px] h-[460px] sm:h-[680px] rounded-full border border-amber-200/[0.12] animate-spin-slow"
        />
        <div
          className="absolute inset-8 rounded-full border border-dashed border-orange-200/[0.1] animate-spin-reverse-slow"
        />
        <div
          className="absolute inset-20 rounded-full border border-rose-200/[0.06]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.035] border border-white/10 text-slate-300 font-mono text-[11px] tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            DIRECTIVE // SECTOR 05
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-none mb-4">
            THE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-500 ml-3">
              HERO VAULT
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
            A futuristic energy chamber housing honors, fellowship allocations, career interview fast-tracks, and high-performance compute grants. Move closer to draw power.
          </p>
        </div>

        {/* 3D Floating Chamber Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto mb-20">
          {/* 2nd Prize Card */}
          <div
            className="order-2 lg:order-1 p-6 sm:p-8 rounded-3xl bg-[linear-gradient(145deg,rgba(136,75,42,0.13),transparent_52%),rgba(12,16,21,0.9)] backdrop-blur-xl border border-[#B77D55]/25 hover:border-[#D89A69]/50 transition-all duration-300 shadow-xl"
            style={{
              transform: `translateY(${vaultEnergy > 1.4 ? -4 : 0}px)`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-amber-100/70 uppercase tracking-widest">
                RANK 02
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[10px] font-semibold">
                VANGUARD
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#A7613C]/15 border border-[#D89A69]/20 text-amber-100/90">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">2ND PRIZE</h3>
                <div className="font-mono text-xs text-slate-300 font-semibold">{REWARD_TIERS[1].rewardValue}</div>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6 text-xs text-slate-300 font-body">
              {REWARD_TIERS[1].perks.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 1st Prize Champion Floating Vault */}
          <div
            className="order-1 lg:order-2 p-8 sm:p-10 rounded-3xl bg-[linear-gradient(145deg,rgba(181,117,43,0.16),transparent_42%),rgba(16,20,26,0.94)] backdrop-blur-2xl border border-amber-200/30 shadow-[0_24px_80px_rgba(0,0,0,0.55)] relative transform lg:-translate-y-4 transition-all duration-300"
            style={{
              boxShadow: `0 0 ${28 * vaultEnergy}px -8px rgba(230, 163, 69, ${0.15 * vaultEnergy}), 0 0 ${74 * vaultEnergy}px -28px rgba(133, 48, 55, ${0.12 * vaultEnergy})`,
            }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-700 via-amber-300 to-yellow-100 text-[#24180A] font-mono text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_22px_rgba(236,172,65,0.24)]">
              <Crown className="w-3 h-3" />
              GRAND PRIZE CHAMPION
            </div>

            <div className="flex items-center justify-between mb-6 pt-2">
              <span className="font-mono text-xs text-slate-300 uppercase tracking-widest font-semibold">
                RANK 01 // SUPREME VAULT
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 text-slate-200 font-mono text-[10px] font-bold">
                TITAN CLEARANCE
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-amber-300/[0.08] border border-amber-200/20 text-amber-100 shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white">1ST PRIZE</h3>
                <div className="font-mono text-sm text-slate-200 font-bold">{REWARD_TIERS[0].rewardValue}</div>
              </div>
            </div>

            <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-200 font-body">
              {REWARD_TIERS[0].perks.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-200 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{p}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              OFFICIAL POOL VALUATION ANNOUNCED PRIOR TO OPENING
            </div>
          </div>

          {/* 3rd Prize Card */}
          <div
            className="order-3 p-6 sm:p-8 rounded-3xl bg-[linear-gradient(145deg,rgba(111,45,52,0.14),transparent_52%),rgba(12,16,21,0.9)] backdrop-blur-xl border border-rose-300/20 hover:border-rose-300/40 transition-all duration-300 shadow-xl"
            style={{
              transform: `translateY(${vaultEnergy > 1.4 ? -4 : 0}px)`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-rose-100/65 uppercase tracking-widest">
                RANK 03
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[10px] font-semibold">
                SENTINEL
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-rose-300/[0.08] border border-rose-200/15 text-rose-100/85">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">3RD PRIZE</h3>
                <div className="font-mono text-xs text-slate-300 font-semibold">{REWARD_TIERS[2].rewardValue}</div>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6 text-xs text-slate-300 font-body">
              {REWARD_TIERS[2].perks.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Special Domain Recognitions */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h4 className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-[0.25em]">
              SPECIAL DOMAIN ACCREDITATIONS & PERKS
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPECIAL_AWARDS.map((award, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#0A0D12]/78 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: ['#D8A65A', '#B77D55', '#C36A64', '#B495D8'][i % 4], boxShadow: `0 0 12px ${['#D8A65A', '#B77D55', '#C36A64', '#B495D8'][i % 4]}77` }}
                />
                <div className="font-display font-bold text-xs text-white mb-1">
                  {award.category}
                </div>
                <div className="font-mono text-[10px] text-slate-500 mb-2">
                  {award.sponsor}
                </div>
                <div className="font-body text-xs text-slate-300">
                  {award.perk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
