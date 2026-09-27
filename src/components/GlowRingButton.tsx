import React, { type ReactNode } from 'react';

interface GlowRingButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: 'green' | 'amber' | 'red' | 'blue';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const GlowRingButton: React.FC<GlowRingButtonProps> = ({
  children,
  icon,
  onClick,
  variant = 'green',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'amber':
        return {
          ring: 'from-amber-300 via-amber-500 to-yellow-100',
          glow: 'rgba(255, 184, 0, 0.32)',
          border: 'hover:border-amber-300/50',
          dot: '#FFB800',
        };
      case 'red':
        return {
          ring: 'from-red-700 via-red-500 to-rose-300',
          glow: 'rgba(230, 36, 41, 0.3)',
          border: 'hover:border-red-500/50',
          dot: '#E62429',
        };
      case 'blue':
        return {
          ring: 'from-cyan-300 via-blue-500 to-violet-400',
          glow: 'rgba(0, 210, 255, 0.28)',
          border: 'hover:border-cyan-400/50',
          dot: '#00D2FF',
        };
      case 'green':
      default:
        return {
          ring: 'from-emerald-400 via-emerald-500 to-teal-300',
          glow: 'rgba(0, 223, 129, 0.28)',
          border: 'hover:border-gfg-green/50',
          dot: '#00DF81',
        };
    }
  };

  const colors = getColors();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-[#080B0F]/90 backdrop-blur-md border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none interactive ${colors.border} ${className}`}
      style={{
        boxShadow: `0 4px 20px -5px rgba(0, 0, 0, 0.6)`,
      }}
    >
      <span
        className="absolute -inset-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
        }}
      />

      <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-space-950 border border-white/15 overflow-hidden flex-shrink-0">
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-r ${colors.ring} opacity-80 animate-spin-slow group-hover:opacity-100 transition-opacity duration-300`}
        />
        <div className="relative z-10 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#080A0E]">
          {icon ? (
            <span className="text-white group-hover:scale-110 transition-transform duration-200">
              {icon}
            </span>
          ) : (
            <span
              className="w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover:scale-125"
              style={{ backgroundColor: colors.dot }}
            />
          )}
        </div>
      </div>

      <span className="relative z-10 font-semibold tracking-wider text-slate-200 group-hover:text-white transition-colors duration-200">
        {children}
      </span>
    </button>
  );
};
