import React from 'react';

interface CharacterArtworkProps {
  characterId: 'ironman' | 'spiderman' | 'thor' | 'hulk' | 'captain';
  className?: string;
  opacity?: number;
}

export const CharacterArtwork: React.FC<CharacterArtworkProps> = ({
  characterId,
  className = '',
  opacity = 0.18,
}) => {
  return (
    <div
      className={`character-art relative pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        opacity,
        maskImage: 'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.5) 70%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.5) 70%, transparent 95%)',
      }}
      aria-hidden="true"
    >
      {characterId === 'ironman' && (
        <svg
          viewBox="0 0 900 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter contrast-125 brightness-95"
        >
          <defs>
            <radialGradient id="arcGlowCenter2" cx="50%" cy="48%" r="40%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#E62429" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#050608" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#050608" stopOpacity="0" />
            </radialGradient>

            <pattern id="engraveLines" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Background Halftone / Engraved Field */}
          <rect width="100%" height="100%" fill="url(#engraveLines)" />

          {/* Multi-tier HUD Targeting Circles & Energy Calipers */}
          <circle cx="450" cy="480" r="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="8 6" />
          <circle cx="450" cy="480" r="280" stroke="rgba(230,36,41,0.25)" strokeWidth="1.5" />
          <circle cx="450" cy="480" r="180" stroke="rgba(255,184,0,0.35)" strokeWidth="2" strokeDasharray="16 8" />

          {/* Central Arc Core Glow */}
          <circle cx="450" cy="480" r="140" fill="url(#arcGlowCenter2)" />

          {/* Highly Detailed Architectural Armor Helmet & Chestplate Vectors */}
          <path
            d="M 450 140
               C 360 140, 290 200, 290 300
               C 290 380, 315 450, 340 510
               L 365 600
               L 400 670
               L 450 710
               L 500 670
               L 535 600
               L 560 510
               C 585 450, 610 380, 610 300
               C 610 200, 540 140, 450 140 Z"
            stroke="rgba(225, 230, 240, 0.45)"
            strokeWidth="1.8"
            fill="rgba(8, 12, 18, 0.6)"
          />

          {/* Facial Plates & Brow Lines */}
          <path d="M 370 280 L 450 250 L 530 280" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <path d="M 350 350 L 405 390 L 450 370 L 495 390 L 550 350" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />

          {/* Eye Optic Slits (Illuminated) */}
          <polygon points="380,410 435,410 425,430 380,410" fill="#FFFFFF" opacity="0.85" filter="drop-shadow(0 0 6px #00DF81)" />
          <polygon points="520,410 465,410 475,430 520,410" fill="#FFFFFF" opacity="0.85" filter="drop-shadow(0 0 6px #00DF81)" />

          {/* Jaw & Chin Geometries */}
          <path d="M 410 540 L 450 565 L 490 540" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <path d="M 450 430 L 450 535" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Arc Reactor Unibeam Housing */}
          <circle cx="450" cy="480" r="50" stroke="#FFB800" strokeWidth="2.5" strokeDasharray="10 4" />
          <polygon points="450,450 476,495 424,495" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <circle cx="450" cy="480" r="16" fill="#FFFFFF" opacity="0.8" />

          {/* Shoulder Pauldrons & Lateral Calipers */}
          <path d="M 230 460 L 310 490 L 320 600 L 200 670 L 160 580 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
          <path d="M 670 460 L 590 490 L 580 600 L 700 670 L 740 580 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />

          {/* Technical Telemetry Annotations */}
          <text x="140" y="260" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">ARCHITECT PROTOCOL // MK-85</text>
          <line x1="280" y1="256" x2="340" y2="256" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          
          <text x="140" y="520" fill="rgba(230,36,41,0.7)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">ARC REACTOR: ACTIVE // 100%</text>
          <line x1="310" y1="516" x2="390" y2="480" stroke="rgba(230,36,41,0.4)" strokeWidth="1" />

          <text x="600" y="280" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">SECTOR: BENNETT // BU-01</text>
          <text x="600" y="520" fill="rgba(255,184,0,0.7)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">CORE FREQ: 4.88 GHz // READY</text>
        </svg>
      )}

      {characterId === 'spiderman' && (
        <svg
          viewBox="0 0 900 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter contrast-125"
        >
          <defs>
            <radialGradient id="spiderWebGlow2" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#E62429" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#050608" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="450" cy="450" r="360" fill="url(#spiderWebGlow2)" />

          {/* Web Mesh Topologies */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x2 = 450 + Math.cos(angle) * 440;
            const y2 = 450 + Math.sin(angle) * 440;
            return (
              <line
                key={i}
                x1="450"
                y1="450"
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            );
          })}

          {[80, 160, 240, 320, 400].map((radius, idx) => (
            <polygon
              key={idx}
              points={Array.from({ length: 16 })
                .map((_, i) => {
                  const angle = (i * 22.5 * Math.PI) / 180;
                  const x = 450 + Math.cos(angle) * radius;
                  const y = 450 + Math.sin(angle) * radius;
                  return `${x},${y}`;
                })
                .join(' ')}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1"
              fill="none"
            />
          ))}

          {/* Arachnid Mask Silhouette */}
          <path
            d="M 450 220
               C 350 220, 290 290, 305 420
               C 315 540, 400 660, 450 710
               C 500 660, 585 540, 595 420
               C 610 290, 550 220, 450 220 Z"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.8"
            fill="rgba(8, 12, 18, 0.65)"
          />

          {/* Dynamic Arachnid Lenses */}
          <path
            d="M 370 390 C 395 365, 430 380, 435 435 C 435 465, 405 490, 375 495 C 350 500, 345 450, 370 390 Z"
            stroke="#00D2FF"
            strokeWidth="2.5"
            fill="rgba(255, 255, 255, 0.45)"
            filter="drop-shadow(0 0 10px rgba(0, 210, 255, 0.5))"
          />
          <path
            d="M 530 390 C 505 365, 470 380, 465 435 C 465 465, 495 490, 525 495 C 550 500, 555 450, 530 390 Z"
            stroke="#00D2FF"
            strokeWidth="2.5"
            fill="rgba(255, 255, 255, 0.45)"
            filter="drop-shadow(0 0 10px rgba(0, 210, 255, 0.5))"
          />

          <text x="210" y="310" fill="rgba(0, 210, 255, 0.6)" fontSize="11" fontFamily="JetBrains Mono">SYNAPSE // REACTIVE MATRIX</text>
          <text x="210" y="760" fill="rgba(255, 255, 255, 0.35)" fontSize="10" fontFamily="JetBrains Mono">GFG PROTOCOL: AGILE CLIENT DEPLOYMENT</text>
        </svg>
      )}

      {characterId === 'thor' && (
        <svg
          viewBox="0 0 900 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter contrast-125"
        >
          <defs>
            <radialGradient id="thorGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#8A2BE2" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#050608" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="450" cy="500" r="380" fill="url(#thorGlow2)" />

          {/* High Voltage Lightning Bolts */}
          <path d="M 450 100 L 470 250 L 415 330 L 490 470 L 400 600 L 460 740 L 430 920" stroke="rgba(0, 210, 255, 0.6)" strokeWidth="2.5" />
          <path d="M 470 250 L 560 320 L 520 420 L 610 520" stroke="rgba(138, 43, 226, 0.5)" strokeWidth="1.8" />
          <path d="M 415 330 L 320 390 L 360 480 L 270 590" stroke="rgba(0, 210, 255, 0.4)" strokeWidth="1.8" />

          {/* Mjolnir Heavy Hammer Forge */}
          <rect x="320" y="360" width="260" height="180" rx="14" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" fill="rgba(8,12,18,0.7)" />
          <line x1="450" y1="540" x2="450" y2="820" stroke="rgba(255,255,255,0.45)" strokeWidth="16" strokeLinecap="round" />
          <line x1="420" y1="600" x2="480" y2="600" stroke="rgba(0,210,255,0.7)" strokeWidth="2.5" />
          <line x1="420" y1="660" x2="480" y2="660" stroke="rgba(0,210,255,0.7)" strokeWidth="2.5" />
          <line x1="420" y1="720" x2="480" y2="720" stroke="rgba(0,210,255,0.7)" strokeWidth="2.5" />

          {/* Central Runic Disc */}
          <circle cx="450" cy="450" r="58" stroke="rgba(0,210,255,0.6)" strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="450" cy="450" r="32" stroke="rgba(138,43,226,0.7)" strokeWidth="2.5" />

          <text x="230" y="270" fill="rgba(0,210,255,0.6)" fontSize="11" fontFamily="JetBrains Mono">POWER // 1.21 GW COMPUTE</text>
          <text x="520" y="800" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="JetBrains Mono">RAW SILICON ACCELERATION</text>
        </svg>
      )}

      {characterId === 'hulk' && (
        <svg
          viewBox="0 0 900 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter contrast-125"
        >
          <defs>
            <radialGradient id="hulkGlow2" cx="50%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#00DF81" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#03543F" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#050608" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="450" cy="500" r="360" fill="url(#hulkGlow2)" />

          {/* Monolithic Strength Matrix */}
          <polygon
            points="260,260 640,260 720,470 610,760 290,760 180,470"
            stroke="rgba(0, 223, 129, 0.4)"
            strokeWidth="2.5"
            fill="rgba(5, 12, 8, 0.6)"
          />
          <polygon
            points="320,320 580,320 640,480 560,690 340,690 260,480"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.5"
          />

          {/* Central Seismic Node */}
          <circle cx="450" cy="500" r="100" stroke="#00DF81" strokeWidth="2.5" strokeDasharray="16 8" />
          <circle cx="450" cy="500" r="50" fill="rgba(0, 223, 129, 0.25)" stroke="#00DF81" strokeWidth="2" />

          {/* Seismic Shockwave Fault Lines */}
          <path d="M 450 500 L 290 650 L 210 790" stroke="rgba(0, 223, 129, 0.45)" strokeWidth="1.8" />
          <path d="M 450 500 L 610 650 L 690 790" stroke="rgba(0, 223, 129, 0.45)" strokeWidth="1.8" />
          <path d="M 450 500 L 450 760" stroke="rgba(0, 223, 129, 0.45)" strokeWidth="1.8" />

          <text x="240" y="230" fill="rgba(0,223,129,0.75)" fontSize="11" fontFamily="JetBrains Mono">GAMMA // HIGH-THROUGHPUT MONOLITH</text>
          <text x="240" y="830" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="JetBrains Mono">ZERO BOTTLENECK DISTRIBUTED PIPELINE</text>
        </svg>
      )}

      {characterId === 'captain' && (
        <svg
          viewBox="0 0 900 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter contrast-125"
        >
          <defs>
            <radialGradient id="capGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0052CC" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#E62429" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#050608" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Concentric Vibranium Shield Rings */}
          <circle cx="450" cy="500" r="350" stroke="rgba(230, 36, 41, 0.45)" strokeWidth="3.5" />
          <circle cx="450" cy="500" r="290" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2.5" strokeDasharray="18 8" />
          <circle cx="450" cy="500" r="230" stroke="rgba(230, 36, 41, 0.4)" strokeWidth="3.5" />
          <circle cx="450" cy="500" r="170" fill="url(#capGlow2)" stroke="rgba(0, 82, 204, 0.7)" strokeWidth="2.5" />

          {/* Center Five-Pointed Star */}
          <polygon
            points="
              450,350 475,430 558,430 491,480
              517,560 450,510 383,560 409,480
              342,430 425,430
            "
            fill="rgba(255, 255, 255, 0.5)"
            stroke="#FFFFFF"
            strokeWidth="1.8"
          />

          {/* Radar HUD Grids */}
          <line x1="90" y1="500" x2="810" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="450" y1="140" x2="450" y2="860" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6 6" />

          <text x="230" y="120" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="JetBrains Mono">SENTINEL PROTOCOL // VIBRANIUM MATRIX</text>
          <text x="260" y="900" fill="rgba(0,82,204,0.7)" fontSize="10" fontFamily="JetBrains Mono">CADENCE & LEADERSHIP ACROSS TIMELINE</text>
        </svg>
      )}
    </div>
  );
};
