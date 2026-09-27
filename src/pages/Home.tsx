import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { EventAbout } from '../components/EventAbout';
import { TheChallenge } from '../components/TheChallenge';
import { TheTimeline } from '../components/TheTimeline';
import { RewardVault } from '../components/RewardVault';
import { RegistrationPortal } from '../components/RegistrationPortal';
import { Footer } from '../components/Footer';

interface HomeProps {
  onAssembleNavigate: () => void;
  onSectionChange?: (index: number, theme: 'red-amber' | 'red-blue' | 'blue-violet' | 'green' | 'blue-red' | 'default') => void;
}

export const Home: React.FC<HomeProps> = ({ onAssembleNavigate, onSectionChange }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const about = document.getElementById('about');
      const challenges = document.getElementById('challenges');
      const timeline = document.getElementById('timeline');
      const rewards = document.getElementById('rewards');
      const assemble = document.getElementById('assemble');

      if (assemble && scrollPos >= assemble.offsetTop) {
        if (onSectionChange) onSectionChange(6, 'red-amber');
      } else if (rewards && scrollPos >= rewards.offsetTop) {
        if (onSectionChange) onSectionChange(5, 'green');
      } else if (timeline && scrollPos >= timeline.offsetTop) {
        if (onSectionChange) onSectionChange(4, 'blue-red');
      } else if (challenges && scrollPos >= challenges.offsetTop) {
        if (onSectionChange) onSectionChange(3, 'blue-violet');
      } else if (about && scrollPos >= about.offsetTop) {
        if (onSectionChange) onSectionChange(2, 'red-blue');
      } else {
        if (onSectionChange) onSectionChange(1, 'red-amber');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onSectionChange]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10">
      <Hero
        onAssembleClick={() => scrollToSection('assemble')}
        onExploreClick={() => scrollToSection('about')}
      />
      <EventAbout />
      <TheChallenge />
      <TheTimeline />
      <RewardVault />
      <RegistrationPortal onTransitionComplete={onAssembleNavigate} />
      <Footer />
    </div>
  );
};
