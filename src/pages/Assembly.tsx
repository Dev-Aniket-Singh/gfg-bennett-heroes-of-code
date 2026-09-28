import React, { useRef, useState } from 'react';
import { ArrowLeft, Radio, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { AssemblyMesh } from '../components/AssemblyMesh';
import { playCardSelectSound } from '../utils/uiSounds';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import deadpoolSketch from '../assets/assembly-deadpool-cutout.png';
import deadpoolGuns from '../assets/assembly-deadpool-guns-cutout.png';
import hulkArt from '../assets/assembly-hulk-cutout.png';
import spiderManArt from '../assets/assembly-spiderman-cutout.png';
import spiderWebArt from '../assets/assembly-spider-web-cutout.png';
import gfgMark from '../assets/gfg-mark.png';

interface AssemblyProps { navigate: (path: string) => void }
type Choice = 'team' | 'solo' | null;

export const Assembly: React.FC<AssemblyProps> = ({ navigate }) => {
  const reducedMotion = usePrefersReducedMotion();
  const pageRef = useRef<HTMLElement | null>(null);
  const spiderRef = useRef<HTMLImageElement | null>(null);
  const webRef = useRef<HTMLButtonElement | null>(null);
  const gunRef = useRef<HTMLButtonElement | null>(null);
  const deadpoolRef = useRef<HTMLImageElement | null>(null);
  const [choice, setChoice] = useState<Choice>(null);
  const [flash, setFlash] = useState(false);
  const go = (mode: 'team' | 'solo') => window.setTimeout(() => navigate(`/registration/${mode}`), 400);
  const choose = (mode: 'team' | 'solo') => {
    if (choice) return;
    playCardSelectSound(); setChoice(mode);
    if (reducedMotion) { setFlash(true); go(mode); return; }
    const tl = gsap.timeline({ onComplete: () => { setFlash(true); go(mode); } });
    if (mode === 'team') {
      tl.to(webRef.current, { scale: 1.48, rotation: 36, filter: 'drop-shadow(0 0 45px rgba(255,50,70,1))', duration: .3, ease: 'power3.in' })
        .to(spiderRef.current, { scale: 1.6, x: '7vw', y: '-3vh', filter: 'drop-shadow(0 0 55px rgba(255,50,70,1))', duration: .62, ease: 'power4.in' }, '<')
        .to(pageRef.current, { '--launch-zoom': 1.045, duration: .7, ease: 'power2.in' }, '<');
    } else {
      tl.to(gunRef.current, { rotation: '+=1080', scale: 1.5, filter: 'drop-shadow(0 0 44px rgba(255,35,55,1))', duration: .78, ease: 'power4.in' })
        .to(deadpoolRef.current, { scale: 1.12, duration: .55, ease: 'power2.in' }, '<')
        .to(pageRef.current, { '--launch-zoom': 1.035, duration: .6, ease: 'power2.in' }, '<');
    }
  };
  return <main ref={pageRef} className={`assembly-page ${choice ? 'assembly-launching' : ''} ${flash ? 'assembly-flash' : ''}`} style={{'--launch-zoom': 1} as React.CSSProperties}>
    <AssemblyMesh />
    <div className="assembly-atmosphere" aria-hidden="true" />
    <div className="assembly-lightning assembly-lightning-one" aria-hidden="true" />
    <div className="assembly-lightning assembly-lightning-two" aria-hidden="true" />
    <header className="assembly-header">
      <button className="assembly-back" onClick={() => navigate('/')}><ArrowLeft size={14}/> RETURN TO BASE</button>
      <div className="assembly-brand"><img src={gfgMark} alt="GeeksforGeeks"/><span>GEEKSFORGEEKS <b>×</b> BENNETT UNIVERSITY</span></div>
      <div className="assembly-signal"><Radio size={13}/> SECTOR BU-01 / MODE SELECTION</div>
    </header>
    <section className="assembly-intro"><p className="assembly-eyebrow"><i/> MISSION: HEROES OF CODE <b>/</b> MODE SELECTION</p><h1>CHOOSE YOUR <em>PATH</em></h1><p>ASSEMBLE TOGETHER. <span>OR FACE THE CODE ALONE.</span></p></section>
    <section className="assembly-stage" aria-label="Choose how to enter the registration flow">
      <article className="assembly-team">
        <div className="assembly-grid-glow"/><div className="assembly-team-copy"><small>01 / SQUAD PROTOCOL</small><h2>CREATE A TEAM</h2><p>BUILD YOUR SQUAD</p><label>SPIDER-MAN // TEAM ENTRY</label></div>
        <img ref={spiderRef} className="assembly-spiderman" src={spiderManArt} alt="Silver comic-style Spider-Man lunging forward"/>
        <div className="assembly-web-wrap"><svg className="assembly-web-lines" viewBox="0 0 420 420" aria-hidden="true"><g fill="none" stroke="rgba(210,225,218,.52)" strokeWidth="1.3">{[48,88,130,173].map((r)=><circle key={r} cx="210" cy="210" r={r}/>)}{Array.from({length:12},(_,i)=><line key={i} x1="210" y1="210" x2={210+Math.cos(i*Math.PI/6)*184} y2={210+Math.sin(i*Math.PI/6)*184}/>)}</g></svg>
          <button ref={webRef} className="assembly-web-trigger" aria-label="Create a team by activating the spider web" onClick={()=>choose('team')}><img src={spiderWebArt} alt="Spider and web symbol"/></button>
        </div>
        <button className="assembly-label assembly-team-label" onClick={()=>choose('team')}><Zap size={12}/> CREATE A TEAM <small>BUILD YOUR SQUAD</small></button>
      </article>
      <article className="assembly-solo">
        <div className="assembly-solo-copy"><small>02 / SOLO PROTOCOL</small><h2>GO SOLO</h2><p>“FOR THOSE WHO DARE ALONE.”</p><label>NO SQUAD. NO BACKUP. JUST YOU.</label></div>
        <img className="assembly-hulk" src={hulkArt} alt="Subtle Hulk-inspired silver line art"/>
        <img ref={deadpoolRef} className="assembly-deadpool" src={deadpoolSketch} alt="Silver pencil sketch of Deadpool"/>
        <button ref={gunRef} className="assembly-gun-trigger" aria-label="Go solo by activating the crossed pistols" onClick={()=>choose('solo')}><img src={deadpoolGuns} alt="Deadpool crossed pistols"/></button>
        <button className="assembly-label assembly-solo-label" onClick={()=>choose('solo')}><Zap size={12}/> GO SOLO <small>ENTER ALONE</small></button>
      </article>
    </section>
    <footer className="assembly-footer"><span>GAMMA FIELD // STABLE</span><span>INTERACTIVE MODE SELECTION</span><span>TOUCH OR SELECT AN OBJECT TO CONTINUE</span></footer>
  </main>;
};
