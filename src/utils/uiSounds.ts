let sharedAudioContext: AudioContext | null = null;
let lastCardCueAt = 0;

/** A brief, quiet synth cue for intentional card and track selections. */
export function playCardSelectSound() {
  if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return;

  const now = performance.now();
  if (now - lastCardCueAt < 75) return;
  lastCardCueAt = now;

  try {
    sharedAudioContext ??= new window.AudioContext();
    const context = sharedAudioContext;

    const play = () => {
      const startAt = context.currentTime;
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(420, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(720, startAt + 0.055);
      oscillator.frequency.exponentialRampToValueAtTime(500, startAt + 0.17);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, startAt);
      filter.frequency.exponentialRampToValueAtTime(1100, startAt + 0.17);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.045, startAt + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.18);

      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + 0.19);
    };

    if (context.state === 'suspended') {
      void context.resume().then(play).catch(() => undefined);
    } else {
      play();
    }
  } catch {
    sharedAudioContext = null;
  }
}
