# HEROES OF CODE
### Flagship Hackathon & Technical Conclave
**GeeksforGeeks Student Chapter × Bennett University**

> *Where Builders Assemble.* A cinematic, Marvel-inspired futuristic creative-agency event microsite and mission briefing experience.

---

## 🌟 Visual & Cinematic Experience
- **Cinematic Opening Sequence**: Starts in pure space-black darkness as bioluminescent particles converge into the glowing brand seal: *GFG × BENNETT UNIVERSITY* → *HEROES OF CODE* → *THE SIGNAL IS LIVE*.
- **Abyssal Hero Statement**: High-contrast editorial typography, live hackathon mission countdown, etched monochrome Iron Man blueprint, and real-time telemetry.
- **Mesh Flow 2D Canvas**: Gravitational dot-matrix field that warps continuously around the user's pointer with spring physics and relaxes to equilibrium.
- **Live Custom Cursor**: Multi-layer trailing energy ring that expands on interactive cards and changes color temperature according to the active hero sector (Red+Amber → Red+Blue → Electric Blue+Violet → Green).
- **The Mission (Post Carousel)**: 3D stacked cards reacting to drag, touch swipe, wheel, and arrow keys with parallax depth. Accompanied by editable metadata cards (*DATE: TBA, TIME: TBA, VENUE: Bennett University*).
- **The Challenge (Spiral Slider)**: 3D helix slider showcasing 5 core tracks (*CODE, AI, WEB, BUILD, COMPETE*) with reactive category glows.
- **The Sequence (Wave Timeline)**: Flowing horizontal sinusoidal timeline on desktop and responsive vertical timeline on mobile, with Captain America's etched shield geometry.
- **The Hero Vault (Rewards)**: 3D floating energy chamber with central champion podium, rotating energy rings, orbiting particle fields, and domain awards.
- **The Assemble Portal**: Signature golden energy portal ring that intensifies on hover and expands with a particle warp transition directly into the registration flow.
- **Authentication & Security Suite**: Complete frontend auth flow (`/login`, `/register`, `/dashboard`) with strong password validation, input sanitization against XSS, deterministic Operative ID badges (`GFG-BU-XXXX`), team management, and demo mode.

---

## 🚀 Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom space-dark tokens and HUD glassmorphism
- **Animation**: GSAP + ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Interactive Shaders & Canvas**: Native HTML5 Canvas 2D (Mesh Flow, Particle Vortex, Portal Warp)
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti

---

## 🛠️ Quick Start & Local Development

### 1. Clone & Install
```bash
git clone <repo-url>
cd gfg
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The dev server will launch at `http://127.0.0.1:5173/`.

### 3. Build Production Bundle
```bash
npm run build
```
Creates an optimized, minified production build in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deploying to Replit
This project is configured to run out-of-the-box on Replit:
1. Import this repository into a new **Node.js / React** Repl.
2. In the Replit `.replit` configuration, specify the run command:
   ```toml
   run = "npm run dev -- --host 0.0.0.0 --port 5173"
   ```
3. Replit will automatically detect port `5173` and expose the webview interface.
4. For production deployment on Replit, run `npm run build` and serve `dist/` with a static server or preview command.

---

## ⚙️ Central Event Configuration
To update dates, times, venue, tracks, or registration limits, edit [src/data/event.ts](file:///c:/Users/anike/OneDrive/Desktop/gfg/src/data/event.ts):

```typescript
export const EVENT_CONFIG = {
  eventName: "HEROES OF CODE",
  tagline: "WHERE BUILDERS ASSEMBLE.",
  date: "TBA (AUTUMN 2026)",
  time: "TBA (09:00 HRS IST)",
  venue: "Bennett University, Greater Noida",
  sector: "BU-SECTOR-01",
  registration: {
    status: "OPEN",
    statusText: "LIMITED SLOTS AVAILABLE",
    registeredCount: 342,
    slotsLimit: 500,
  },
  // ...
};
```

---

## 🛡️ Authentication Architecture & Security
- Located in [src/context/AuthContext.tsx](file:///c:/Users/anike/OneDrive/Desktop/gfg/src/context/AuthContext.tsx).
- **Security Compliance**:
  - Passwords are never stored in plaintext or persisted to insecure storage.
  - All input fields are sanitized against script injections.
  - Active sessions use ephemeral `sessionStorage` with token expiration modeling.
  - Clearly separated demo/sandbox state with toggle ready for Supabase Auth, Firebase Auth, or custom REST/GraphQL APIs.
  - Protected routes redirect unauthenticated users back to `/login`.

---

## 🎨 Asset Provenance
See [ASSETS_README.md](file:///c:/Users/anike/OneDrive/Desktop/gfg/ASSETS_README.md) for full documentation of procedurally generated vector blueprints, Canvas mesh systems, and font licensing.
