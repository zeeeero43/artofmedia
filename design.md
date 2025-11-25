# art.of.media - Design System Dokumentation

## Inhaltsverzeichnis
1. [Design-Philosophie](#design-philosophie)
2. [Farbsystem](#farbsystem)
3. [Typografie](#typografie)
4. [Spacing & Layout](#spacing--layout)
5. [Komponenten-Architektur](#komponenten-architektur)
6. [Animations & Interaktionen](#animations--interaktionen)
7. [Sprache & Tonalität](#sprache--tonalität)
8. [Bildsprache](#bildsprache)
9. [Komponenten-Katalog](#komponenten-katalog)
10. [Best Practices](#best-practices)

---

## Design-Philosophie

### Konzept: "Neon Noir" - Klinische Präzision mit High-Tech-Energie

Das Design kombiniert zwei scheinbar gegensätzliche Welten:

- **NOIR**: Dunkel, minimalistisch, professionell, sachlich
- **NEON**: Explosive Energie durch toxisches Grün (#00FF29)

### Kernprinzipien

1. **Klinische Präzision**: Klare Hierarchien, viel Weißraum, Swiss Grid
2. **Dominanz durch Kontrast**: Schwarz/Weiß mit gezielten Neon-Akzenten
3. **Messbarkeit**: Zahlen, Daten und Fakten stehen im Vordergrund
4. **Direktheit**: Keine Floskeln - konkrete, provokante Aussagen
5. **Performance-Orientierung**: Jedes Element muss einen Zweck haben

---

## Farbsystem

### Primärfarben

```javascript
colors: {
  brand: {
    DEFAULT: '#00FF29',  // Toxic Green - Hauptakzent
    glow: 'rgba(0, 255, 41, 0.2)',  // Glow-Effekte
    dim: '#00CC21',  // Hover-State
  }
}
```

**Brand Green (#00FF29)**
- **Verwendung**: CTAs, Hover-States, Progress-Indikatoren, Highlights
- **Psychologie**: Energie, Wachstum, "Go", Dominanz
- **Effekte**: Glows, Schatten, Pulse-Animationen
- **Niemals**: Als Hintergrundfarbe für große Flächen

### Neutrale Palette

```javascript
neutral: {
  50: '#FAFAFA',   // Hellste - Backgrounds (Light Mode)
  100: '#F5F5F5',  // Subtle Backgrounds
  200: '#E5E5E5',  // Borders, Grid Lines
  300: '#D4D4D4',  // Disabled States
  800: '#262626',  // Dark Backgrounds
  900: '#171717',  // Darker
  950: '#050505',  // Tiefes Schwarz - Hero Sections, Kontrast
}
```

### Farbhierarchie

1. **Primär**: Weiß (#FFFFFF) - Haupthintergrund
2. **Sekundär**: Neutral-950 (#050505) - Invertierte Sections
3. **Akzent**: Brand (#00FF29) - Fokuspunkte, CTAs
4. **Text**:
   - Haupttext: neutral-950 auf weiß / weiß auf neutral-950
   - Subtext: neutral-500 / neutral-400

### Farbregeln

- **80/15/5 Regel**: 80% Neutral (weiß/schwarz), 15% Grau-Töne, 5% Brand Green
- **Kontrast-Minimum**: WCAG AAA für Text (7:1)
- **Glow-Effekte**: Nur bei Brand-Farbe, nie bei Grau
- **Inversionen**: Sections wechseln zwischen Weiß und Schwarz für Rhythmus

---

## Typografie

### Font-Hierarchie

```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],      // Body Text
  display: ['Syne', 'sans-serif'],     // Headlines, Display
}
```

### 1. Syne (Display Font)

**Charakteristik**: Geometrisch, bold, modern, technisch

**Verwendung**:
- Headlines (H1-H3)
- Logo/Branding
- Zahlen in Statistiken
- CTAs (Button-Text)
- Navigation

**Gewichte**:
- `font-bold` (700): Standard für Headlines
- `font-black` (800): Massive Hero-Titles

**Typische Größen**:
```css
/* Hero Headline */
text-6xl md:text-8xl lg:text-9xl  /* 60-128px */

/* Section Headlines */
text-4xl md:text-6xl lg:text-7xl  /* 36-72px */

/* Card Headlines */
text-3xl md:text-4xl  /* 30-36px */
```

### 2. Inter (Body Font)

**Charakteristik**: Lesbar, neutral, professionell

**Verwendung**:
- Fließtext
- Beschreibungen
- Listen
- Meta-Information

**Gewichte**:
- `font-light` (300): Große Zahlen
- `font-normal` (400): Standard-Body
- `font-medium` (500): Betonungen
- `font-semibold` (600): Sub-Headlines

**Typische Größen**:
```css
/* Body Text */
text-base md:text-lg  /* 16-18px */

/* Sub-Headlines */
text-xl md:text-2xl   /* 20-24px */

/* Small Text / Labels */
text-xs  /* 12px */
```

### Typografie-Patterns

**Uppercase + Tracking**:
```css
uppercase tracking-[0.3em]  /* Für Labels, Badges */
uppercase tracking-widest   /* Für Buttons, Tags */
uppercase tracking-tighter  /* Für massive Headlines */
```

**Leading (Zeilenhöhe)**:
```css
leading-[0.9]     /* Eng für Display Headlines */
leading-tight     /* Kompakte Überschriften */
leading-relaxed   /* Fließtext, Lesbarkeit */
```

**Font Mono**:
- Technische Labels
- Metadaten (z.B. "Agency Relaunch 2026")
- Kleine Uppercase-Texte

---

## Spacing & Layout

### Grid System

**Swiss Grid Background** (Signature Element):
```css
bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),
    linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
bg-[size:4rem_4rem]
```

**Container Sizes**:
```css
max-w-4xl   /* 56rem / 896px  - Textblöcke */
max-w-5xl   /* 64rem / 1024px - Standard Content */
max-w-6xl   /* 72rem / 1152px - Wide Content */
max-w-7xl   /* 80rem / 1280px - Full Layouts */
```

### Spacing Scale

**Padding (Sections)**:
```css
py-24    /* 96px  - Kleine Sections */
py-32    /* 128px - Standard */
py-40    /* 160px - Große Sections */
```

**Gaps**:
```css
gap-4    /* 16px - Eng */
gap-6    /* 24px - Standard */
gap-8    /* 32px - Weit */
gap-12   /* 48px - Sehr weit */
```

### Layout-Prinzipien

1. **Vertikaler Rhythmus**: Sections wechseln zwischen hell/dunkel
2. **Borders**: Haarfeine Linien (1px) in neutral-200/neutral-800
3. **Weißraum**: Großzügig, niemals "voll"
4. **Center-Aligned**: Text meist zentriert, außer bei langen Absätzen

---

## Komponenten-Architektur

### Struktur

```
App.tsx                          # Main Router & State
├── components/
│   ├── hero-section.tsx         # Hero mit Switcher
│   ├── intro-gate.tsx           # Initiale Auswahl (Digital/Physical)
│   ├── preloader.tsx            # Ladeanimation
│   ├── navigation.tsx           # Fixed Top Navigation
│   ├── footer.tsx               # CTA Footer
│   ├── service-bento.tsx        # Service Grid
│   ├── switcher.tsx             # Mode Toggle (Digital/Physical)
│   ├── process-section.tsx      # Timeline
│   ├── testimonials.tsx         # Review Cards + Modal
│   ├── detail-accordion.tsx     # Benefit Grid + Modal
│   ├── faq-section.tsx          # Accordion FAQ
│   ├── comparison-section.tsx   # Before/After Slider
│   ├── contact-modal.tsx        # Kontaktformular
│   ├── trust-bar.tsx            # Logo Marquee
│   ├── content-sections.tsx     # Stats Section
│   └── ui/
│       ├── scramble-text.tsx    # Text-Scramble-Effekt
│       └── cursor.tsx
└── app/
    ├── webdesign/page.tsx       # Subpage
    ├── consulting/page.tsx      # Subpage
    └── ecommerce/page.tsx       # Subpage
```

### State Management

**Global State** (in App.tsx):
```typescript
const [mode, setMode] = useState<ServiceCategory>('digital');
const [currentView, setCurrentView] = useState<'home' | 'webdesign' | ...>('home');
const [hasEnteredSite, setHasEnteredSite] = useState(false);
const [isContactOpen, setIsContactOpen] = useState(false);
```

**Session Storage**:
- Prüfung ob User bereits besucht hat
- Überspringen von Preloader + IntroGate bei Rückkehr

---

## Animations & Interaktionen

### Framer Motion Patterns

**1. Scroll-basierte Parallax**:
```typescript
const { scrollYProgress } = useScroll();
const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
```

**2. View-basierte Animationen**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
/>
```

**3. Hover-States**:
```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -4 }}
  transition={{ duration: 0.3 }}
/>
```

**4. Stagger Children**:
- Cards erscheinen versetzt
- `delay: index * 0.1`

### Easing-Kurven

```javascript
// Smooth Entrance
ease: [0.22, 1, 0.36, 1]  // "easeOutExpo"

// Bounce
ease: "backOut"

// Linear für Scrolls
ease: "linear"
```

### Signature Effekte

**Brand Glow**:
```css
shadow-[0_0_20px_rgba(0,255,41,0.4)]
```

**Pulse Animation** (Dot Indicator):
```css
animate-pulse
```

**Image Zoom on Hover**:
```css
transition-transform duration-700 group-hover:scale-110
```

**Grayscale to Color**:
```css
grayscale group-hover:grayscale-0
```

---

## Sprache & Tonalität

### Grundprinzipien

1. **Du-Ansprache**: Direkt, persönlich, auf Augenhöhe
2. **Provokant**: "Unsichtbar sein kostet Geld", "Deine Website verkauft nicht?"
3. **Messbar**: Konkrete Zahlen ("+300% Leads", "3 Sekunden")
4. **Klar**: Keine Marketing-Floskeln, keine Füllwörter
5. **Deutsch**: Primär Deutsch, technische Begriffe in Englisch

### Textmuster

**Headlines**:
- UPPERCASE für Dramatik
- Kurze, prägnante Sätze
- Oft als Frage oder Aussage-Provokation
- Beispiele:
  - "KUNST DER MEDIEN"
  - "WARUM DU GELD VERBRENNST"
  - "DESIGN, DAS VERKAUFT"

**Sublines**:
- Lösungsorientiert
- Konkret, was der Nutzer bekommt
- Beispiel: "Wir entwickeln High-Performance Websites und digitale Ökosysteme."

**CTAs**:
- Handlungsaufforderung + Benefit
- "KOSTENLOSES STRATEGIEGESPRÄCH"
- "JETZT WEBSEITE CHECKEN KOSTENLOS"
- "ANFRAGE ABSENDEN"

**Badges/Labels**:
- Uppercase + Wide Tracking
- Technisch/Kategorisch
- "VERIFIED CASE", "FOKUS: MARKE", "PRO"

### Ton nach Kontext

- **Hero/Landing**: Provokant, mutig
- **Prozess**: Sachlich, professionell
- **Testimonials**: Authentisch, menschlich
- **FAQ**: Direkt, hilfreich

---

## Bildsprache

### Bild-Strategie

**Unsplash als Quelle**:
- Hochwertige, professionelle Fotos
- Technisch, clean, modern
- Keine Stock-Klischees

**Kategorien**:
1. **Tech/Digital**: Laptops, Code, Dashboards, Analytics
2. **Physical**: Vehicles, Print, Signage, Materials
3. **People**: Real portraits (nicht gestellt), diverse
4. **Abstract**: Patterns, Textures (für Backgrounds)

### Bild-Behandlung

**Standard-Flow**:
```css
/* Base */
object-cover w-full h-full

/* Hover-Effect */
transition-transform duration-700 group-hover:scale-110

/* Overlay */
absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent

/* Grayscale für Kontrast */
grayscale group-hover:grayscale-0
```

**Image Opacity**:
- Hintergrundbilder: `opacity-50` bis `opacity-60`
- Overlay-Gradients für Lesbarkeit

**Aspect Ratios**:
- Hero: Full viewport
- Cards: 1:1 oder 3:2
- Testimonials: 16:9

---

## Komponenten-Katalog

### 1. Hero Section

**Datei**: `components/hero-section.tsx`

**Aufbau**:
```
┌─────────────────────────┐
│   [Dot] Agency Relaunch │  <- Label
│                         │
│    KUNST DER MEDIEN     │  <- Massive Headline (Syne Black)
│                         │
│   [Digital|Physical]    │  <- Switcher
│                         │
│   Subline Text...       │  <- Dynamisch basierend auf Mode
│                         │
│     [Scroll Indicator]  │
└─────────────────────────┘
```

**Features**:
- Parallax Scroll (yText, opacity)
- ScrambleText-Effekt auf "MEDIEN"
- Integrierter Mode-Switcher
- Animated Scroll-Indicator

### 2. Switcher (Toggle)

**Datei**: `components/switcher.tsx`

**Design**:
- Industrial Bezel (neutral-100 background)
- Sliding White Background (framer-motion layout)
- Brand Dot Indicator (glowing green dot)
- Smooth Spring Animation

**States**:
- Active: Schwarzer Text + Brand Dot
- Inactive: Grauer Text + Grauer Dot
- Hover: Dot wird dunkler

### 3. Service Bento Grid

**Datei**: `components/service-bento.tsx`

**Pattern**: Masonry-Style Grid
- 3 Columns Desktop
- Variable Höhen (cols: 1 oder 2)
- Grayscale → Color on Hover
- Image Zoom + Border Glow (#00FF29)

**Card-Struktur**:
```
Background Image (grayscale)
├── Dark Gradient Overlay
├── Icon (top-left, brand-colored)
├── Title (large, white, Syne)
├── Description (neutral-400)
└── Arrow Icon (top-right, appears on hover)
```

### 4. Intro Gate (Split Screen)

**Datei**: `components/intro-gate.tsx`

**Konzept**: Vollbild-Auswahl zwischen Digital/Physical

**Layout**:
```
┌──────────────┬──────────────┐
│   DIGITAL    │   PHYSICAL   │
│   (Blau)     │   (Grau)     │
│              │              │
│   [Icon]     │   [Icon]     │
│   Headline   │   Headline   │
│   Subtext    │   Subtext    │
│   [Button]   │   [Button]   │
└──────────────┴──────────────┘
```

**Interaktion**:
- Hover: Side expandiert (50% → 60%)
- Click: Curtain Slide Effect (brand/schwarz)
- Exit Animation: Fade out + Scale

### 5. Process Timeline

**Datei**: `components/process-section.tsx`

**Design**: Vertikale Timeline mit Scroll-Progress

```
     [01]
─────●────── Text Block (Left)
     │
     │
     [02]
─────●────── Text Block (Right)
     │
```

**Features**:
- Zentrale Linie füllt sich beim Scrollen (scaleY)
- Dots auf der Linie
- Alternating Left/Right Layout
- Smooth Scroll-Trigger

### 6. Comparison Slider

**Datei**: `components/comparison-section.tsx`

**Mechanik**: Before/After mit Draggable Handle

**Struktur**:
- Before: Grayscale, links
- After: Full Color, rechts
- Handle: Brand Circle mit MoveHorizontal Icon
- Labels: "Standard" vs "High-Performance"

### 7. Testimonials

**Datei**: `components/testimonials.tsx`

**Grid**: 3 Cards → Modal on Click

**Card**:
- Hintergrundbild (grayscale → color)
- 5 Stars (Brand)
- Quote
- Avatar + Name + Company
- Stats als Badge

**Modal**:
- Split: Image Left / Content Right
- Detailed Text
- Stats Grid (2x2)
- Close Button (X)

### 8. FAQ Accordion

**Datei**: `components/faq-section.tsx`

**Pattern**: 2-Column Grid, Click to Expand

**Item**:
- Bold Question (Syne)
- Plus/Minus Icon (rotiert)
- Answer Slide-In (AnimatePresence)
- Border-Bottom (schwarz)

### 9. Contact Modal

**Datei**: `components/contact-modal.tsx`

**Layout**: Split Modal
- **Left (Dark)**: Kontaktinfos, Icons, Öffnungszeiten
- **Right (Light)**: Formular (Name, Email, Message, etc.)

**Features**:
- Backdrop Blur
- Smooth Scale Animation
- Icon-Hover-Effects (bg-brand transition)

### 10. Footer

**Datei**: `components/footer.tsx`

**Sections**:
1. **Hero CTA**: Massive Headline + Button
2. **Footer Grid**: Logo, Kontakt, Rechtliches
3. **Copyright**

**CTA-Pattern**:
```
GENUG THEORIE.
LASS UNS STARTEN. <- Brand-colored

[Großer Brand-Button]

Dauer: 30 Min • 100% Mehrwert • 0% Druck
```

---

## Best Practices

### Neue Seiten erstellen

1. **Struktur kopieren** von existierenden Subpages (z.B. `app/webdesign/page.tsx`)
2. **Navigation integrieren**: `<Navigation onNavigate={handleNavigate} showBack={true} />`
3. **Footer einbinden**: `<Footer onContactClick={handleContactClick} />`
4. **Progress Bar** (optional): `useScroll` + Fixed Top Bar
5. **Grid Background**: Fixed inset-0 Layer mit Swiss Grid

### Farbwahl-Guide

**Wann Brand Green verwenden:**
- CTAs (Buttons)
- Hover-States (wichtige Links)
- Progress-Bars
- Highlights/Badges
- Icons (Checkmarks, Indicators)
- Glows/Schatten

**Wann NICHT Brand Green:**
- Niemals als Hintergrund für Text
- Niemals für große Flächen
- Nicht bei Warnings/Errors (Rot verwenden)

### Animation-Guide

**Do's**:
- Smooth Transitions (0.3s - 0.8s)
- Ease-Out Curves für Entrances
- whileInView mit `once: true` für Performance
- Hover-States subtil (scale 1.05)

**Don'ts**:
- Keine Loop-Animationen außer Preloader
- Keine Auto-Play-Videos
- Keine parallelen Animationen (max 1-2 gleichzeitig)

### Responsiveness

**Breakpoints** (Tailwind Standard):
- `md:` 768px (Tablet)
- `lg:` 1024px (Desktop)
- `xl:` 1280px (Large)

**Mobile-First Approach**:
```css
/* Base: Mobile */
text-4xl py-20

/* Tablet+ */
md:text-6xl md:py-32

/* Desktop+ */
lg:text-8xl
```

**Kritische Anpassungen**:
- Hero: Stack auf Mobile
- Grids: 1 Col → 2/3 Cols
- Text-Sizes: Reduzieren
- Padding: Halbieren

### Performance-Tipps

1. **Lazy Load Images**: Unsplash mit `loading="lazy"`
2. **Framer Motion**: `viewport={{ once: true }}` für einmalige Animationen
3. **AnimatePresence**: `mode="wait"` für saubere Transitions
4. **CSS**: Nutze `transform` statt `top/left`

### Accessibility

- **Kontrast**: Minimum AAA (7:1)
- **Focus States**: Immer sichtbar
- **Alt-Texte**: Beschreibend für Bilder
- **Keyboard Navigation**: Alle Interaktionen erreichbar
- **Screen Reader**: Semantisches HTML (nav, section, footer)

---

## Technischer Stack

**Framework**: React 19.2.0 + Vite 6.2.0
**Styling**: TailwindCSS (via CDN)
**Animation**: Framer Motion 12.23.24
**Icons**: Lucide React 0.554.0
**Utilities**: clsx, tailwind-merge
**Sprache**: TypeScript 5.8.2

---

## Zusammenfassung

**Kern-DNA des Designs**:
1. Schwarz/Weiß + Neon-Grün
2. Syne (Display) + Inter (Body)
3. Swiss Grid als Textur
4. Große Headlines, viel Weißraum
5. Direkte, provokante Sprache (Deutsch)
6. Smooth Animations mit Framer Motion
7. Messbare, datengetriebene Inhalte
8. Grayscale → Color Transformationen
9. Split Sections (Hell/Dunkel-Wechsel)
10. High-End, aber klar strukturiert

**Beim Erstellen neuer Seiten beachten**:
- Beginne mit Hero + Grid Background
- Halte die Farbhierarchie ein (80/15/5)
- Nutze bestehende Komponenten
- Konsistente Animationen (0.6s Standard)
- Deutsche Texte, provokante Headlines
- Mindestens eine Brand-CTA pro Section
