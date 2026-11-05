# Suhail Sidheeq — Professional Personal Portfolio

A personal portfolio website for **Suhail Sidheeq Thandu Parakkal**, designed and structurally adapted from the [MS Holdings Founder Page](https://ms.holdings/founder).

---

## 1. Project Overview

This website serves as the standalone personal portfolio for Suhail Sidheeq Thandu Parakkal, currently serving as **Executive Assistant to the Associate Vice President (AVP) Office at MS GES / MS Holdings**. 

The design translates the editorial aesthetics, dark atmospheric palette, restrained typography, and interactive components of the MS Holdings Founder page into a professional identity tailored to Suhail's operational and human resources background.

### Core Professional Positioning
- **Primary Domain:** Business Operations, Executive Support & Office Coordination
- **Foundational Background:** B.Sc. Psychology & PGDM in Human Resource Management
- **Key Competencies:** Executive Office Support, Stakeholder Management, HR Structuring & SOP Development, Project Coordination, and Analytical Data Modeling

---

## 2. Technology Stack

Built strictly with vanilla web standards — no build tools, frameworks, or runtime dependencies:

- **HTML5:** Semantic architecture, accessible landmarks, Open Graph metadata, SVG icons.
- **CSS3:** Custom properties (design tokens), flexbox, CSS grid, backdrop filters, fluid typography, subtle keyframe animations, and multi-breakpoint responsive layouts.
- **Vanilla JavaScript (ES6+):** IntersectionObserver for active navigation tracking and scroll-reveal transitions, custom mobile drawer, segmented subnav dropdown, interactive speed-dial widget, and client-side form validation.
- **Typography:** Externally hosted [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts (weights 300, 400, 500, 600, 700).

---

## 3. Project Directory Structure

```text
suhail-portfolio/
├── index.html                  # Main portfolio single-page application
├── css/
│   ├── style.css               # Core styling, tokens, layout & section styling
│   ├── responsive.css          # Responsive breakpoint overrides (mobile, tablet, desktop)
│   └── animations.css          # Keyframes, scroll-reveal transitions, reduced-motion rules
├── js/
│   ├── main.js                 # Contact form validation & toast notifications
│   ├── navigation.js           # Section tracking, sticky subnav pill, mobile navigation
│   └── animations.js           # Scroll-triggered reveal animations
├── assets/
│   ├── images/
│   │   ├── suhail-hero.jpg     # Hero section photograph placeholder (1200x1600, aspect ~3:4)
│   │   └── suhail-portrait.jpg # About section portrait placeholder (900x1200, aspect 3:4)
│   ├── icons/                  # SVG assets
│   └── fonts/                  # Font resources
├── CV SUHAIL SIFHEEQ - HR .pdf # Primary verified source document
├── CV for HR Suhail Sidheeq from India.pdf # Supplementary material
└── README.md                   # Project documentation & local running instructions
```

---

## 4. Local Setup & Running Instructions

The website is standalone and runs on any modern web browser without compilation or package managers:

### Option A: Using Python's Built-in HTTP Server (Recommended)
Open a terminal in the project directory and run:

```bash
# Python 3
python3 -m http.server 8000
```
Then visit [`http://localhost:8000`](http://localhost:8000) in your browser.

### Option B: Using Node.js (npx serve)
```bash
npx serve .
```

### Option C: Direct File Opening
Simply double-click `index.html` or open it directly in Google Chrome, Firefox, Safari, or Microsoft Edge.

---

## 5. Design Adaptations Compared to Reference

| Section | MS Holdings Reference (`ms.holdings/founder`) | Adaptation for Suhail Sidheeq |
| :--- | :--- | :--- |
| **Hero Section** | Group CEO quote card with high-contrast low-key portrait and layered overlays. | Recreated with Suhail's name, professional designation, current MS GES role badge, and positioning copy focused on executive support and operational rigor. |
| **Sub-Navigation Pill** | Sticky white pill with interactive active tab states. | Exact recreation: sticky pill with active pill gradient, circular icon badges, and smooth scroll tracking via `IntersectionObserver`. |
| **About Section** | Founder biography and portfolio conglomerate logos. | 4-paragraph editorial biography highlighting academic background in Psychology/HRM, healthcare experience, and current executive office mandate. Continuous marquee ticker of verified institutional affiliations. |
| **Experience Section** | Founder milestone cards and strategic advisory slides. | Premium chronological cards with verified metrics (e.g. 53 recruitment TATs, 537 employees, 200+ audited JCI records, multilingual operations). All 7 roles chronologically presented with CV 2 fidelity. |
| **Philosophy Section** | Founder life mission statement and philanthropic vision. | Split-container layout with dark editorial framing, showcasing Suhail's documented objective and 3 foundational pillars: Strategic Alignment, Initiative & Team Support, and Continuous Unlearning/Relearning. |
| **Credentials Section** | Press appearances, podcasts, and media cards. | Reimagined as "Credentials & Development" using the reference's dark category cards: Formal Education (PGDM 84%, B.Sc. Psychology Grade A), Certifications (IIT Kharagpur NPTEL Emotional Intelligence Grade A, IIT Palakkad Analytics, RSET ML), and Institutional Leadership. |
| **Connect Section** | Dual-column contact form with newsletter signup and email. | Dual-column layout: left card features interactive form validation and direct mailto links; right card features LinkedIn link, direct email, location, and working languages. |
| **Floating Speed-Dial** | Circular bottom-right floating button expanding to section shortcuts. | Custom interactive speed-dial (`.speed-dial-wrap`) that expands on hover/tap to display section shortcuts with smooth tooltips. |

---

## 6. Photographic Assets

The two official photographs of Suhail have been integrated and calibrated:

1. **Spotlight / Hero Photograph:**
   - **Path:** `assets/images/suhail-hero.jpg` (961 × 1280 px)
   - **Integration:** Configured with `object-fit: cover` and `object-position: center 18%` with edge vignette and gradient blending, seamlessly integrating into the dark hero backdrop across desktop and mobile.

2. **Editorial Profile Portrait:**
   - **Path:** `assets/images/suhail-portrait.jpg` (1080 × 1080 px)
   - **Integration:** Set with `object-fit: cover` and framed in a 3:4 aspect-ratio card with smooth hover transitions from grayscale to full color, matching the editorial profile styling in the About section.

---

## 7. Verification & Quality Assurance

- **HTML5 & CSS3 Standards:** Semantic markup, valid CSS properties, accessible headings (`h1` through `h4`), visible focus outlines, and full ARIA landmarks.
- **Responsive Viewport Testing:** Tested and verified at standard desktop (1440×900, 1920×1080), tablet (768×1024), and mobile (390×844) viewport resolutions.
- **Zero Console Errors:** Verified with automated headless browser test harness.
- **Content Accuracy:** Strictly follows the primary CV (`CV SUHAIL SIFHEEQ - HR .pdf`), ensuring current role at MS GES / MS Holdings is prominently featured while preserving chronological accuracy for Meitra Hospital, Aster MIMS, YFYD, Creative Video Tech, and TiE Kerala.

