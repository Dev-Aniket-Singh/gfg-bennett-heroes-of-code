import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../data/event';
import { Radio, Wifi } from 'lucide-react';

export const HUD: React.FC = () => {
  const [missionClock, setMissionClock] = useState<string>('00:00:00:00');

  useEffect(() => {
    // Futuristic mission uptime ticker
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      const centis = Math.floor((elapsed % 1000) / 10);
      setMissionClock(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centis).padStart(2, '0')}`
      );
    }, 47);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden" aria-hidden="true">
      {/* Top Left Corner HUD Coordinates */}
      <div className="absolute top-24 left-6 hidden xl:flex flex-col gap-1 text-[10px] font-mono text-slate-500/70 tracking-widest uppercase">
        <div className="flex items-center gap-1.5 text-slate-400/70">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>SIGNAL DETECTED // 142.85 MHz</span>
        </div>
        <div>LOC: {EVENT_CONFIG.coordinates.lat} / {EVENT_CONFIG.coordinates.lng}</div>
        <div>ALT: 208M // AMSL</div>
      </div>

      {/* Top Right Corner Telemetry */}
      <div className="absolute top-24 right-6 hidden xl:flex flex-col items-end gap-1 text-[10px] font-mono text-slate-500/70 tracking-widest uppercase">
        <div className="flex items-center gap-1.5 text-slate-400/80">
          <Wifi className="w-3 h-3" />
          <span>NET: QUANTUM CIPHER // ONLINE</span>
        </div>
        <div>UPTIME: {missionClock}</div>
        <div>DEFENSE MATRIX: SECURE</div>
      </div>

      {/* Subtle Side Micro HUD Lines */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-center gap-6 text-[9px] font-mono text-slate-600/60 tracking-widest">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="rotate-90 origin-center whitespace-nowrap">SECTOR: BENNETT</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-center gap-6 text-[9px] font-mono text-slate-600/60 tracking-widest">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="-rotate-90 origin-center whitespace-nowrap">STATUS: 100% NOMINAL</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
};
