export interface EventConfig {
  eventName: string;
  tagline: string;
  subtitle: string;
  season: string;
  year: number;
  date: string;
  time: string;
  venue: string;
  sector: string;
  coordinates: {
    lat: string;
    lng: string;
    city: string;
  };
  organizer: {
    name: string;
    chapter: string;
    university: string;
    portalUrl: string;
  };
  description: {
    lead: string;
    body: string;
    missionBrief: string;
  };
  registration: {
    status: 'OPEN' | 'LIMITED' | 'CLOSED';
    statusText: string;
    registeredCount: number;
    slotsLimit: number;
    isProgressCalculated: boolean;
  };
  socialLinks: {
    name: string;
    label: string;
    url: string;
  }[];
}

export interface HeroCharacter {
  id: string;
  name: string;
  codename: string;
  archetype: string;
  themeColor: {
    primary: string;
    secondary: string;
    glow: string;
    name: 'red-amber' | 'red-blue' | 'blue-violet' | 'green' | 'blue-red';
  };
  section: string;
  quote: string;
  technicalRole: string;
}

export interface HighlightCategory {
  id: string;
  title: string;
  code: string;
  subtitle: string;
  description: string;
  techStack: string[];
  difficulty: 'STANDARD' | 'ADVANCED' | 'ELITE';
  color: string;
  glowColor: string;
  operativeCount: string;
}

export interface TimelineMilestone {
  id: string;
  step: string;
  title: string;
  timeframe: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  description: string;
  protocol: string;
  clearanceLevel: string;
}

export interface RewardTier {
  id: string;
  rank: string;
  badge: string;
  title: string;
  rewardValue: string;
  isMain?: boolean;
  perks: string[];
  color: string;
  glowColor: string;
}

export interface UserOperative {
  id: string;
  fullName: string;
  email: string;
  college: string;
  year: string;
  branch: string;
  teamName?: string;
  roleSpecialization?: string;
  operativeId: string;
  registeredAt: string;
  clearanceLevel: string;
  status: 'CONFIRMED' | 'PENDING' | 'WAITLISTED';
}
