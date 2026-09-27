import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface EnergyBranchesProps {
  activeSection?: number;
  accentColor?: string;
}

export const EnergyBranches: React.FC<EnergyBranchesProps> = ({
  activeSection = 1,
  accentColor = '#A4515C',
}) => {
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // This decorative scroll-progress overlay is intentionally static on
    // touch devices to avoid React renders during every mobile scroll frame.
    if (isMobile) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[3] overflow-hidden select-none ${isMobile ? 'opacity-[0.1]' : 'opacity-[0.2]'}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 3200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="branchGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#54464B" stopOpacity="0.42" />
            <stop offset="35%" stopColor="#74303D" stopOpacity="0.38" />
            <stop offset="70%" stopColor="#87505A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9B4652" stopOpacity="0.44" />
          </linearGradient>

          <filter id="energyBloom">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Spine Energy Branch */}
        <path
          d="M 720 100
             C 720 300, 680 450, 720 650
             C 760 850, 840 980, 720 1200
             C 600 1420, 660 1650, 720 1850
             C 780 2050, 700 2300, 720 2550
             C 740 2750, 720 2950, 720 3150"
          stroke="url(#branchGlowGrad)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          strokeDashoffset={-scrollProgress * 3200}
          filter="url(#energyBloom)"
          className="opacity-50"
        />

        {/* Hero to Mission Tributary */}
        <path
          d="M 720 400
             C 500 500, 380 650, 480 850
             C 580 1050, 720 1150, 720 1200"
          stroke="rgba(160, 137, 143, 0.16)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Mission to Highlights Lateral Split */}
        <path
          d="M 720 1200
             C 880 1300, 1020 1450, 940 1650
             C 860 1850, 720 1900, 720 1950"
          stroke="rgba(151, 90, 101, 0.16)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Highlights to Timeline Convergence */}
        <path
          d="M 720 1950
             C 560 2050, 480 2200, 580 2350
             C 660 2480, 720 2500, 720 2550"
          stroke="rgba(160, 137, 143, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Timeline to Vault & Portal Compression Ring */}
        <path
          d="M 720 2550
             C 820 2650, 860 2800, 720 2950"
          stroke="rgba(162, 76, 88, 0.2)"
          strokeWidth="1.5"
          filter="url(#energyBloom)"
        />

        {/* Animated Junction Nodes */}
        {[
          { cx: 720, cy: 300, label: 'NODE: 01 HERO' },
          { cx: 720, cy: 900, label: 'NODE: 02 MISSION' },
          { cx: 720, cy: 1550, label: 'NODE: 03 CHALLENGE' },
          { cx: 720, cy: 2200, label: 'NODE: 04 TIMELINE' },
          { cx: 720, cy: 2800, label: 'NODE: 05 VAULT' },
        ].map((node, idx) => (
          <g key={idx} opacity={activeSection === idx + 1 ? 0.95 : 0.42}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={activeSection === idx + 1 ? 6 : 4}
              fill={activeSection === idx + 1 ? '#8D4651' : '#050608'}
              stroke={accentColor}
              strokeWidth="2"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={activeSection === idx + 1 ? 12 : 8}
              stroke={accentColor}
              strokeWidth="0.75"
              strokeDasharray="2 2"
              className="animate-spin-slow origin-center"
            />
            {activeSection === idx + 1 && (
              <circle cx={node.cx} cy={node.cy} r="18" fill={accentColor} opacity="0.12" />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
