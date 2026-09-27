import type { EventConfig } from '../types';

export const EVENT_CONFIG: EventConfig = {
  eventName: "HEROES OF CODE",
  tagline: "WHERE BUILDERS ASSEMBLE.",
  subtitle: "A Marvel-inspired futuristic technological conclave and 24-hour hackathon mission engineered for elite creators, coders, and system architects.",
  season: "TBA",
  year: 2026,
  
  date: "TBA",
  time: "TBA",
  
  venue: "Bennett University, Greater Noida",
  sector: "BU-SECTOR-01",
  coordinates: {
    lat: "28.4595° N",
    lng: "77.5140° E",
    city: "Greater Noida, India",
  },
  
  organizer: {
    name: "GeeksforGeeks Student Chapter",
    chapter: "GFG Bennett University",
    university: "Bennett University, Times Group",
    portalUrl: "https://www.geeksforgeeks.org",
  },
  
  description: {
    lead: "The signal has been transmitted across the digital realm. A cosmic convergence of algorithmic mastery, high-scale engineering, and creative disruption.",
    body: "Heroes of Code is not a standard hackathon—it is an immersive technical gauntlet. Over 24 hours, operatives will build breakthrough AI systems, hyper-scalable cloud architectures, resilient cyber defenses, and bleeding-edge user interfaces under cinematic mission parameters.",
    missionBrief: "Deploy intelligence. Refactor reality. Assemble your squad and claim your position in the hero registry.",
  },
  
  registration: {
    status: "OPEN",
    statusText: "REGISTRATION OPEN",
    // Static, editable snapshot until a registration backend is connected.
    registeredCount: 50,
    slotsLimit: 500,
    isProgressCalculated: false,
  },
  
  socialLinks: [
    { name: "Instagram", label: "@gfg_bu", url: "https://instagram.com" },
    { name: "LinkedIn", label: "GFG Student Chapter Bennett", url: "https://linkedin.com" },
    { name: "GitHub", label: "GFG-Bennett", url: "https://github.com" },
    { name: "Website", label: "bennett.edu.in", url: "https://www.bennett.edu.in" },
  ],
};
