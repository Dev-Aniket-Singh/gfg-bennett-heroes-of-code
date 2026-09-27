import type { RewardTier } from '../types';

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 'rank-1',
    rank: '01',
    badge: 'CHAMPION VAULT',
    title: '1ST PRIZE — GRAND ASSEMBLE',
    rewardValue: 'TBA — MEGA POOL',
    isMain: true,
    color: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.5)',
    perks: [
      'Official Heroes of Code Trophy & Shield of Honor',
      'Exclusive Fast-Track Interview Access with Partner Firms',
      'High-Tier Cloud Compute Credits ($2500+ equivalent)',
      'GFG Premium Pro Access & Masterclass Bundles',
      'Custom Engraved Operative Hardware Kits',
    ],
  },
  {
    id: 'rank-2',
    rank: '02',
    badge: 'VANGUARD VAULT',
    title: '2ND PRIZE — RUNNER UP',
    rewardValue: 'TBA — HIGH TIER',
    isMain: false,
    color: '#00DF81',
    glowColor: 'rgba(0, 223, 129, 0.4)',
    perks: [
      'Silver Operative Medallions & Runner-Up Accolade',
      'Cloud Infrastructure Vouchers & Developer Subscriptions',
      'Direct Mentorship Sessions with Industry Architects',
      'GFG Practice Perks & Exclusive Merchandise Pack',
    ],
  },
  {
    id: 'rank-3',
    rank: '03',
    badge: 'SENTINEL VAULT',
    title: '3RD PRIZE — BRONZE PODIUM',
    rewardValue: 'TBA — PODIUM TIER',
    isMain: false,
    color: '#00D2FF',
    glowColor: 'rgba(0, 210, 255, 0.4)',
    perks: [
      'Bronze Operative Medallions & Placement Citation',
      'Developer API Credits & Software Toolkits',
      'Official Certificate of Excellence & Swag Kits',
    ],
  },
];

export const SPECIAL_AWARDS = [
  {
    category: 'MOST INNOVATIVE AI PROTOCOL',
    sponsor: 'NEURAL NEXUS AWARD',
    perk: 'Custom AI Hardware Kit + GPU Cloud Credits (TBA)',
    color: '#00D2FF',
  },
  {
    category: 'BEST CYBER-SPATIAL DESIGN & UI',
    sponsor: 'CREATIVE FRONTEND SHIELD',
    perk: 'Design Masterclass Subscriptions + Agency Review (TBA)',
    color: '#E62429',
  },
  {
    category: 'TOP ALL-WOMEN SQUAD',
    sponsor: 'VALKYRIE EMPOWERMENT ACCORD',
    perk: 'Special Cash Grant + Mentorship Fellowship (TBA)',
    color: '#8A2BE2',
  },
  {
    category: 'HARDWARE & IOT BREAKTHROUGH',
    sponsor: 'SILICON FORGE TROPHY',
    perk: 'Robotics Dev Kits + Microcontroller Lab Access (TBA)',
    color: '#FFB800',
  },
];
