# Trustynets v4 Project — Complete Analysis

## 1. Project Overview

This is a **business website** for "Trustynets" — a company that installs **safety nets and invisible grills** for homes in South India (Bangalore, Hyderabad, Vizag, Bhubaneswar). The site serves as a digital storefront to attract customers, explain services, collect leads, and provide self-assessment tools.

**Tech Stack:** Pure HTML + CSS + JavaScript (no frameworks). A single CSS file (`assets/css/style.css`) styles everything. Two JS files handle interactivity.

---

## 2. Folder Structure

```
v4/
├── index.html                 # Homepage (landing page)
├── about.html                 # About the company
├── child-safety-nets.html     # Service page: child safety nets
├── invisible-grills.html      # Service page: invisible grills
├── pigeon-safety-nets.html    # Service page: pigeon control nets
├── rooftop-solutions.html     # Service page: rooftop safety nets
├── why-us.html                # Why choose Trustynets
├── faq.html                   # Frequently asked questions
├── locations.html             # Service locations with Google Maps
├── safety-advisor.html        # Interactive tools/calculators
└── assets/
    ├── css/
    │   └── style.css          # All styling (not read but linked)
    ├── js/
    │   ├── script.js          # Core JS (nav, slider, forms, etc.)
    │   └── crystal-cursor.js  # Fancy animated cursor effect
    └── images/                # ~100 images (logos, gallery, backgrounds)
```

---

## 3. File-by-File Breakdown

### 3.1 `index.html` — Homepage (893 lines)

**Purpose:** The main landing page. First impression for visitors.

**Structure (top to bottom):**

| Section | Lines | What it does |
|---------|-------|-------------|
| **SVG Gradients** | 18-43 | Defines colored circles (`<radialGradient>`) used for fancy "liquid" animated buttons |
| **Header Top Bar** | 49-62 | Shows cities served + email + phone number across the top |
| **Header Main Navigation** | 67-108 | Logo, nav links (Home, About, Services, etc.), WhatsApp button, liquid "Free Inspection" button, mobile hamburger |
| **Hero Slider** | 113-182 | 3 auto-rotating slides (each with background video/image, title, description, CTAs). Left/right arrows + dots for manual navigation |
| **CTA Strip** | 187-200 | "Book Free Inspection" call-to-action bar |
| **About Section** | 205-246 | Company intro with image, "10+ Years Experience" badge, 3 trust badges (ISO Certified, 1000+ Installs, 5-Year Warranty) |
| **Services Gallery** | 251-334 | 4 service cards in a grid: Invisible Grills, Child Safety Nets, Pigeon Nets, Rooftop Solutions |
| **Why Us + Before/After** | 339-406 | 4 selling points (Invisible Safety, Child & Pet Safe, Professional Installation, Long-Lasting Durability) + an interactive before/after image comparison slider |
| **Testimonials** | 411-476 | 3 customer review cards with star ratings |
| **FAQ Accordion** | 481-564 | 5 expandable questions (click to open/close) |
| **Locations** | 569-683 | 4 city cards with Google Maps embeds + contact info |
| **Quote Form** | 688-784 | Lead capture form: name, phone, city dropdown, service dropdown, property type radio, message, preferred call time |
| **Footer** | 789-851 | 4-column footer: logo+social, services, quick links, contact |
| **Floating Widgets** | 857-873 | Floating WhatsApp/Call buttons + mobile sticky bottom bar |
| **Success Modal** | 876-886 | Popup shown after form submit |
| **Scripts** | 889-890 | Loads `script.js` and `crystal-cursor.js` |

### 3.2 `about.html` — About Us (275 lines)

**Purpose:** Tells the company story.

**Key parts:**
- Hero banner with title + image
- "Our Mission & Vision" text
- Same 3 trust badges as homepage
- **Right sidebar** with a quote form (name, phone, city, service dropdowns) + quick support buttons
- Footer + floating widgets + success modal (same as homepage)

### 3.3 `child-safety-nets.html` — Child Safety Nets (361 lines)

**Purpose:** Detailed page for the child safety net service.

**Key parts:**
- Hero banner with icon + title
- **Main content** (left column):
  - Why child safety nets matter
  - Net types & materials (Monofilament vs Braided HDPE)
  - Technical specifications table (material, thickness, mesh size, breaking strength, knot system, fasteners)
  - Warranty info (3-year comprehensive)
  - Project gallery (6 images)
  - Customer testimonial
  - FAQ section (3 questions specific to child nets)
- **Right sidebar** with quote form + quick support (same as about.html)
- Footer + widgets

### 3.4 `invisible-grills.html` — Invisible Grills (365 lines)

**Purpose:** Detailed page for invisible grill service.

**Key parts:**
- Hero banner
- What are Invisible Grills? (SS 316 steel cables with nylon coating)
- Key benefits list (6 checkmark items)
- Technical specs table (material, wire thickness, tensile load, grid gaps, frame material, warranty)
- Pricing info (starts at ₹120/sq ft)
- Gallery + testimonial + FAQ (3 questions)
- Right sidebar quote form

### 3.5 `pigeon-safety-nets.html` — Pigeon Safety Nets (357 lines)

**Purpose:** Detailed page for pigeon control netting.

**Key parts:**
- Hero banner
- The problem with pigeons (health hazards: diseases, acidity, mites)
- Premium solution (chemical-free bird-proof barriers)
- Technical specs table (HDPE material, twine thickness, mesh grid, colors, tensile strength, weather tolerance)
- Warranty (3-year replacement)
- Gallery + testimonial + FAQ (3 questions)
- Right sidebar

### 3.6 `rooftop-solutions.html` — Rooftop Solutions (363 lines)

**Purpose:** Detailed page for rooftop safety netting.

**Key parts:**
- Hero banner
- Rooftop safety netting explanation
- Common use cases (play zones, elderly walkways, sports nets, courtyard closures)
- Technical specs table (HDPE, twine thickness, mesh dimensions, border rope, impact capacity, support cables)
- Warranty (3-year)
- Gallery + testimonial + FAQ (3 questions)
- Right sidebar

### 3.7 `why-us.html` — Why Choose Us (302 lines)

**Purpose:** Selling page — why Trustynets is better.

**Key parts:**
- Hero banner
- 4 key value propositions (same USP list from homepage)
- Before/after image comparison slider
- Right sidebar quote form

### 3.8 `faq.html` — FAQ Page (312 lines)

**Purpose:** Answers common customer questions.

**Key parts:**
- Hero banner
- 5 FAQ items (identical to the ones on homepage): kid safety, invisible grill benefits, warranty, cost, rust-proofing
- Right sidebar quote form

### 3.9 `locations.html` — Locations (307 lines)

**Purpose:** Shows where the company operates.

**Key parts:**
- Hero banner
- 4 location cards (Bangalore, Hyderabad, Vizag, Bhubaneswar) — each with:
  - Google Maps iframe embed
  - Address text
  - Phone number
  - Call/WhatsApp buttons
- Right sidebar quote form

### 3.10 `safety-advisor.html` — Interactive Tools (838 lines)

**Purpose:** The most complex page. Provides 5 interactive self-assessment calculators.

**This is a HYBRID page** — it uses both the custom CSS (`style.css`) AND **Tailwind CSS** (loaded via CDN) for its styling.

**5 Interactive Tools:**

| Tool | What it does | How it works |
|------|-------------|-------------|
| **1. Balcony Area Calculator** | Calculates balcony square footage | User enters length + width → JS multiplies them → shows sq ft + recommends net type → WhatsApp button pre-fills dimensions |
| **2. Child Safety Assessment** | Rates child fall risk | User checks 4 risk factors → JS scores 0-4 → shows "Low/Moderate/High Concern" badge + recommendation text |
| **3. Pigeon Severity Assessment** | Rates pigeon infestation | User checks 5 symptoms → JS counts 0-5 → shows "No/Minor/Moderate/Severe" level + hygiene recommendation |
| **4. Net Requirement Calculator** | Estimates net coverage area | User enters width + height → JS multiplies → shows sq ft |
| **5. Installation Complexity Estimator** | Rates installation difficulty | User selects net type + floor level + accessibility → JS scores complexity → shows "Low/Medium/High" badge |

**Each tool has:**
- Icon + title
- Input controls (number fields, checkboxes, dropdowns)
- Live result display (updates as user types/clicks)
- Recommendation text
- WhatsApp button (pre-fills a message with the tool's results)
- Call button

**Additional sections:**
- Trust badges banner ("Free guidance, No obligation, Quick consultation, Expert support")
- "Why Use Self-Assessment Tools?" info section
- "Send Photo on WhatsApp" dark section

**The JavaScript for these tools is inline** (written directly in the HTML file at lines 586-835, not in the external JS file).

### 3.11 `assets/js/script.js` — Core JavaScript (476 lines)

This file runs on **every page** (loaded via `<script src="...">`). It has 9 features:

| # | Feature | Lines | What it does |
|---|---------|-------|-------------|
| 1 | **Mobile Nav & Sticky Header** | 5-41 | Makes nav bar sticky on scroll. Hamburger toggles mobile menu. Closes menu when a link is clicked |
| 2 | **Scrollspy Navigation** | 46-67 | Highlights the current nav link based on which section is in view (for same-page anchor links like `#services`) |
| 3 | **Hero Image Slider** | 72-132 | Auto-rotates slides every 4 seconds. Click arrows or dots to navigate manually. Resets timer on manual interaction |
| 4 | **Before/After Slider** | 137-183 | Drag the handle left/right to reveal "before" vs "after" image. Works with mouse drag and touch |
| 5 | **FAQ Accordion** | 188-212 | Click a question → opens its answer, closes others. Uses `maxHeight` animation |
| 6 | **Form Validation & Modal** | 217-295 | Validates name (min 2 chars), phone (10 digits), city dropdown, service dropdown. Shows success modal if valid. Closes modal on "Done" or overlay click |
| 7 | **Back to Top** | 300-317 | Shows a floating up-arrow button after scrolling 400px. Click it → smooth scrolls to top |
| 8 | **Dynamic City Phone** | 322-345 | When user selects a city in the form, updates the header phone number (currently all same number, but ready for different regional numbers) |
| 9 | **Liquid Buttons** | 350-475 | Dynamically adds animated SVG gradient layers to all buttons. Detects button type (normal, WhatsApp, white) and uses matching color scheme |

### 3.12 `assets/js/crystal-cursor.js` — Cursor Effect (169 lines)

**Purpose:** A fancy visual effect — when the mouse moves, tiny crystal-like particles trail behind. When you click, particles shatter outward.

**How it works:**
- Creates a full-screen transparent `<canvas>` overlay (pointer-events: none so it doesn't block clicks)
- **On mouse move:** Randomly spawns "Crystal" objects (lines that grow outward and fade) — 60% chance per frame
- **On click:** Spawns 35 "Shard" particles that fly outward in random directions and fade
- Animates at 60fps via `requestAnimationFrame`
- **Disabled on mobile** (detects screen width < 768px) for performance

**Classes:**
- `CrystalCursor` — main controller, creates canvas, handles events, runs animation loop
- `Crystal` — individual trail particle (line that grows + rotates + fades)
- `Shard` — click explosion particle (circle that flies outward + fades)

---

## 4. Common Design Patterns (Repeated Across Pages)

1. **Header + Footer are IDENTICAL** on all pages (just the `active-link` class changes to highlight the current page)
2. **Service pages** (`child-safety-nets.html`, `invisible-grills.html`, etc.) all follow the same layout:
   - Hero banner → 2-column grid: left = main content, right = sticky sidebar quote form
   - Main content structure: description → specs table → gallery → testimonial → FAQ
3. **Quote form** appears in two places:
   - Homepage: embedded in the page as a section
   - All other pages: as a sticky right sidebar
4. **Success modal** + **floating contact widgets** + **back-to-top** + **mobile bottom bar** appear on every page

---

## 5. Interactive Features Summary

| Feature | Where | Technology |
|---------|-------|-----------|
| Hero image slider | index.html | Vanilla JS (setInterval + class toggling) |
| Before/after comparison | index.html, why-us.html | Vanilla JS (mouse/touch drag, calculates percentage) |
| FAQ accordion | All pages | Vanilla JS (click to toggle maxHeight) |
| Form validation | All pages w/ forms | Vanilla JS (checks name, phone, dropdowns) |
| Success modal | All pages | Vanilla JS (add/remove "show" class) |
| City phone updater | All pages | Vanilla JS (on change, updates header number) |
| Liquid buttons | All pages | Vanilla JS (injects SVG layers dynamically) |
| Scrollspy nav | index.html | Vanilla JS (tracks scroll position) |
| Sticky header | All pages | Vanilla JS (adds "scrolled" class on scroll) |
| Back to top | All pages | Vanilla JS (show/hide + smooth scroll) |
| Crystal cursor | All pages | Vanilla JS (canvas animation) |
| 5 Calculators | safety-advisor.html | Inline Vanilla JS (real-time input → output) |
| WhatsApp pre-fill | safety-advisor.html | Each tool updates the `href` with encoded text |

---

## 6. Business Logic / How the Site Works

1. **Attract visitors** via the homepage slider and services overview
2. **Educate** them through detailed service pages with specs, galleries, and testimonials
3. **Build trust** with "Why Us" page, before/after comparisons, and FAQ
4. **Engage** with interactive calculators on Safety Advisor page (visitors can assess their own needs)
5. **Convert leads** through:
   - Quote forms on every page (name + phone + city + service → success modal)
   - WhatsApp buttons (direct chat via `wa.me` link)
   - Phone call buttons (`tel:` link)
   - Each calculator tool has its own WhatsApp button that pre-fills a message with the tool results

The form does **NOT** actually send data to a server — it just validates and shows a success modal. The real lead capture happens through WhatsApp and phone calls.
