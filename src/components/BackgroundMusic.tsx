import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

const MUSIC_SRC = '/leberch-cyberpunk-437545.mp3';

export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [playbackError, setPlaybackError] = useState(false);
  const manuallyPausedRef = useRef(false);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      manuallyPausedRef.current = false;
      setPlaybackError(false);
      setPlaying(true);
    } catch {
      setPlaybackError(true);
      setPlaying(false);
    }
  };

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audioRef.current = audio;
    const onEnded = () => setPlaying(false);
    audio.addEventListener('ended', onEnded);
    // Try immediately; if the browser blocks autoplay, resume on the visitor's
    // first gesture anywhere on the page (the control also remains available).
    void audio.play().then(() => setPlaying(true)).catch(() => undefined);
    const startAfterGesture = () => {
      if (!manuallyPausedRef.current && audio.paused) void startPlayback();
    };
    window.addEventListener('pointerdown', startAfterGesture);
    window.addEventListener('keydown', startAfterGesture);
    return () => {
      audio.pause();
      audio.removeEventListener('ended', onEnded);
      window.removeEventListener('pointerdown', startAfterGesture);
      window.removeEventListener('keydown', startAfterGesture);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      manuallyPausedRef.current = true;
      setPlaying(false);
      return;
    }
    await startPlayback();
  };

  return (
    <aside className="fixed bottom-5 left-5 z-[80] flex items-center gap-3 rounded-full border border-red-400/35 bg-[#08090d]/90 px-3 py-2 text-white shadow-[0_0_22px_rgba(239,44,56,0.22)] backdrop-blur-xl" aria-label="Background music controls">
      <button type="button" onClick={togglePlayback} className="grid h-9 w-9 place-items-center rounded-full border border-red-300/35 bg-red-500/15 text-red-100 transition hover:bg-red-500/30" aria-label={playing ? 'Pause background music' : 'Play background music'}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
      </button>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-mono text-[9px] tracking-[0.16em] text-slate-200">{playbackError ? 'AUDIO UNAVAILABLE' : playing ? 'DARK CYBERPUNK SYNTHWAVE · PLAYING' : 'TAP TO ENABLE MUSIC'}</span>
        <div className="flex items-center gap-2">
          <Volume2 className="h-3 w-3 text-red-200" aria-hidden="true" />
          <input type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={(event) => setVolume(Number(event.target.value) / 100)} aria-label="Background music volume" className="h-1 w-24 cursor-pointer accent-red-400" />
          <span className="w-7 text-right font-mono text-[9px] text-slate-400">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </aside>
  );
};
