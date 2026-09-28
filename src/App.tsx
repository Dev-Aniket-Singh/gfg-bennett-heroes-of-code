import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HUD } from './components/HUD';
import { CustomCursor } from './components/CustomCursor';
import { MeshFlow } from './components/MeshFlow';
import { ParticleField } from './components/ParticleField';
import { EnergyBranches } from './components/EnergyBranches';
import { OpeningSequence } from './components/OpeningSequence';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Home } from './pages/Home';
import { useLenis } from './hooks/useLenis';
import comicCollage from './assets/comic-universe.png';
import comicAction from './assets/comic-action.png';

const Register = lazy(() => import('./pages/Register').then((module) => ({ default: module.Register })));
const Assembly = lazy(() => import('./pages/Assembly').then((module) => ({ default: module.Assembly })));
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })));
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));

const resolvePath = (path: string) => {
  if (path === '/assembly') return '/assembly';
  if (path === '/registration/team') return '/registration/team';
  if (path === '/registration/solo') return '/registration/solo';
  if (path.startsWith('/register')) return '/register';
  if (path.startsWith('/login')) return '/login';
  if (path.startsWith('/dashboard')) return '/dashboard';
  return '/';
};

export const AppContent: React.FC = () => {
  // Simple, rock-solid client-side router compatible with Replit & Vite
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return resolvePath(window.location.pathname);
    }
    return '/';
  });

  const [openingCompleted, setOpeningCompleted] = useState<boolean>(() => {
    // Only show opening intro on home landing page
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        return true;
      }
    }
    return false;
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(1);
  const comicBackgroundRef = useRef<HTMLDivElement | null>(null);
  const [cursorTheme, setCursorTheme] = useState<
    'red-amber' | 'red-blue' | 'blue-violet' | 'green' | 'blue-red' | 'default'
  >('red-amber');
  const isAssemblyRoute = currentPath === '/assembly';

  // Activate Lenis smooth scrolling when on the home page
  useLenis(currentPath === '/' && openingCompleted);

  useEffect(() => {
    let frame = 0;
    const updateParallax = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = Math.min(90, window.scrollY * 0.025);
        comicBackgroundRef.current?.style.setProperty('--comic-parallax-y', `${y}px`);
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
    return () => {
      window.removeEventListener('scroll', updateParallax);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Sync with browser history back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(resolvePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionChange = (
    index: number,
    theme: 'red-amber' | 'red-blue' | 'blue-violet' | 'green' | 'blue-red' | 'default'
  ) => {
    setCurrentSectionIndex(index);
    setCursorTheme(theme);
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-[#E0E2EC] overflow-x-hidden selection:bg-gfg-green selection:text-black">
      {!isAssemblyRoute && <div
        ref={comicBackgroundRef}
        className="comic-universe-background"
        style={{ '--comic-collage': `url(${comicCollage})`, '--comic-action': `url(${comicAction})` } as React.CSSProperties}
        aria-hidden="true"
      />}
      {!isAssemblyRoute && <div className="comic-universe-vignette" aria-hidden="true" />}
      {/* Film Grain Texture Overlay */}
      {!isAssemblyRoute && <div className="noise-overlay" aria-hidden="true" />}

      {!isAssemblyRoute && <div className="crimson-atmosphere" aria-hidden="true" />}

      {/* Interactive 2D Canvas Mesh Flow */}
      {!isAssemblyRoute && <MeshFlow />}

      {/* Bioluminescent Drifting Particles */}
      {!isAssemblyRoute && <ParticleField />}

      {currentPath === '/' && (
        <EnergyBranches activeSection={currentSectionIndex} accentColor="#A4515C" />
      )}

      {/* Live Custom Cursor System */}
      {!isAssemblyRoute && <CustomCursor currentTheme={cursorTheme} />}

      {/* Ambient Edge HUD Telemetry */}
      {!isAssemblyRoute && <HUD />}

      <BackgroundMusic />

      {/* HUD Navigation Bar */}
      {!isAssemblyRoute && <Navbar
        currentSectionIndex={currentSectionIndex}
        totalSections={6}
        activePath={currentPath}
        navigate={navigate}
        onAssembleClick={() => navigate('/assembly')}
      />}

      {/* Cinematic Opening Sequence */}
      {!openingCompleted && currentPath === '/' && (
        <OpeningSequence onComplete={() => setOpeningCompleted(true)} />
      )}

      {/* Main Routed Page Content */}
      <main className="relative z-10">
        <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#050608] font-mono text-xs tracking-widest text-red-300">LOADING MISSION CONTROL...</div>}>
          {currentPath === '/' && (
            <Home
              onAssembleNavigate={() => navigate('/assembly')}
              onSectionChange={handleSectionChange}
            />
          )}

          {currentPath === '/assembly' && <Assembly navigate={navigate} />}

          {currentPath === '/register' && <Register navigate={navigate} />}

          {currentPath === '/registration/team' && <Register navigate={navigate} mode="team" />}

          {currentPath === '/registration/solo' && <Register navigate={navigate} mode="solo" />}

          {currentPath === '/login' && <Login navigate={navigate} />}

          {currentPath === '/dashboard' && <Dashboard navigate={navigate} />}
        </Suspense>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <SpeedInsights />
    </AuthProvider>
  );
}
