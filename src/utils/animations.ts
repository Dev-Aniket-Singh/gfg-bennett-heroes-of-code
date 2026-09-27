import gsap from 'gsap';

export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const clamp = (val: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, val));
};

export const revealElement = (element: HTMLElement | null, delay: number = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 24,
      filter: 'blur(8px)',
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.1,
      delay,
      ease: 'power3.out',
    }
  );
};
