/**
 * Single source of truth for every piece of content on the site.
 * Components read from here — nothing is hard-coded in the markup.
 */

export const PROFILE = {
  firstName: "Syed",
  middleName: "Shaban",
  lastName: "Ahmad",
  fullName: "Syed Shaban Ahmad",
  initials: "SA",
  title: "Full Stack Developer",
  subtitle: "MERN · Shopify · WordPress",
  location: "Lahore, Pakistan",
  city: "Lahore",
  timeZone: "Asia/Karachi",
  email: "syedshaban785@gmail.com",
  phone: "+92 307 941 5512",
  whatsapp: "https://wa.me/923079415512",
  github: "https://github.com/SyedShabanDeve",
  githubHandle: "SyedShabanDeve",
  linkedin: "https://www.linkedin.com/in/syedshaban785",
  linkedinHandle: "syedshaban785",
  site: "https://syedshabandeve.github.io/portfolio2/",
  resume: "Syed-Shaban-Ahmad-CV.pdf",
  resumeDocx: "Syed-Shaban-Ahmad-CV.docx",
  available: true,
  availability: "Open to full-time roles — remote or Lahore-based",
  responseTime: "Usually replies within a few hours",
  tagline:
    "I build production web applications end to end — React front ends, secure Node and Express APIs on MongoDB, Shopify storefronts and custom WordPress and WooCommerce platforms.",
  /** Hero pitch: strings render as-is, `{ em }` parts are set in the accent serif. */
  pitch: [
    "I build ",
    { em: "MERN applications" },
    ", ",
    { em: "Shopify stores" },
    " and ",
    { em: "WordPress platforms" },
    " — from the first brief all the way to production.",
  ],
  roles: [
    "MERN Stack Developer",
    "Shopify Developer",
    "React Engineer",
    "WordPress Specialist",
    "Full Stack Developer",
  ],
};

export const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { value: 3, suffix: "+", label: "Years building" },
  { value: 10, suffix: "+", label: "Projects shipped" },
  { value: 3, label: "Countries served" },
  { value: 3.4, decimals: 1, label: "CGPA / 4.0" },
];

export const ABOUT = {
  lead:
    "Full stack developer with three years of professional and freelance experience across the MERN stack, Shopify and WordPress.",
  body: [
    "I take client projects from the first brief all the way through to deployment and maintenance — scoping the work, building the front end and the API behind it, putting it live, and staying on for the fixes that follow launch.",
    "Most of what I build runs in production today: a news publication with a role-based editorial dashboard, a Shopify store rebuilt section by section, WooCommerce stores with bespoke child themes and payment gateways, and corporate sites tuned for speed. Clients have been based in Pakistan, the UAE and the United States.",
    "I am currently in the final semester of a BS in Computer Science at Riphah International University, Lahore.",
  ],
  highlights: [
    {
      icon: "layers",
      title: "End-to-end delivery",
      text: "Brief, build, deploy, maintain. Hosting, DNS and migrations included — not handed off.",
    },
    {
      icon: "shield",
      title: "Secure by default",
      text: "JWT authentication, role-based route protection and validated API surfaces on every build.",
    },
    {
      icon: "gauge",
      title: "Performance minded",
      text: "Route-level code splitting, lean bundles and MongoDB query tuning where it actually counts.",
    },
    {
      icon: "globe",
      title: "International clients",
      text: "Shipped for businesses across Pakistan, the UAE and the United States, working remotely.",
    },
  ],
};

export const SKILL_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "code",
    blurb: "Component systems, state and the interfaces users actually touch.",
    items: [
      "React 19",
      "JavaScript ES6+",
      "TypeScript",
      "React Router",
      "Context API",
      "Tailwind CSS",
      "Bootstrap 5",
      "HTML5",
      "CSS3",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    blurb: "APIs, data models and the auth layer that guards them.",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
      "JWT Auth",
      "Role-based access",
      "Schema design",
      "Query optimisation",
    ],
  },
  {
    id: "commerce",
    label: "E-commerce & CMS",
    icon: "cart",
    blurb: "Storefronts and content platforms a business can run without me.",
    items: [
      "Shopify",
      "Liquid",
      "Online Store 2.0 themes",
      "Admin GraphQL API",
      "WordPress",
      "WooCommerce",
      "Child themes",
      "Payment gateways",
      "Brilliant Directory",
      "PHP",
    ],
  },
  {
    id: "tooling",
    label: "Tooling & Deploy",
    icon: "terminal",
    blurb: "How the work gets built, checked and put in front of people.",
    items: [
      "Git & GitHub",
      "Vite",
      "ESLint",
      "GitHub Actions",
      "GitHub Pages",
      "Netlify",
      "Playwright",
      "cPanel",
      "DNS & migrations",
    ],
  },
];

/** The stack I reach for first — two scrolling rows of marks in the Stack section. */
export const CORE_STACK = [
  ["React", "Node.js", "Express", "MongoDB", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "Electron"],
  ["Shopify", "WordPress", "WooCommerce", "PHP", "Three.js", "Git", "GitHub Actions", "Netlify", "HTML5", "CSS"],
];

export const EXPERIENCE = [
  {
    period: "Jan 2024 — Present",
    current: true,
    role: "MERN Stack Developer",
    company: "Private Firm",
    location: "Lahore, Pakistan",
    type: "Full-time",
    bullets: [
      "Build React front ends with reusable component systems and Context API state.",
      "Write and maintain Express REST APIs over MongoDB, including schema design and reworking slow endpoints.",
      "Implement JWT authentication with role-based route protection across the app.",
      "Cut first-load weight on multi-page builds by moving inner routes behind React.lazy.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    period: "Jun 2023 — Dec 2023",
    role: "Web Development Intern",
    company: "Sani IT Consultant",
    location: "Lahore, Pakistan",
    type: "Internship",
    bullets: [
      "Six-month frontend programme covering HTML, CSS, JavaScript and early React.",
      "Contributed to live client websites under a senior developer's review.",
      "Customised WordPress themes and configured plugins against client requirements.",
      "Awarded an official internship certificate on completion.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "React", "WordPress"],
  },
  {
    period: "2022 — Present",
    role: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    type: "Freelance",
    bullets: [
      "Rebuilt the Elite Zone Shopify store: custom theme sections, cash-on-delivery and WhatsApp ordering, and theme releases scripted through the Admin GraphQL API.",
      "Built custom WordPress websites for clients in Pakistan, the UAE and the United States.",
      "Delivered WooCommerce stores end to end: catalogue setup, payment gateways and order handling.",
      "Set up Brilliant Directory platforms for membership and listing-based businesses.",
      "Handled hosting, DNS, migrations and post-launch fixes directly with clients.",
    ],
    stack: ["Shopify", "Liquid", "WordPress", "WooCommerce", "PHP", "cPanel"],
  },
];

export const EDUCATION = {
  degree: "BS Computer Science",
  school: "Riphah International University",
  location: "Lahore, Pakistan",
  period: "2023 — 2026",
  detail: "Final semester · expected graduation 2026",
  grade: "3.4 / 4.0",
};

export const CERTIFICATIONS = [
  {
    name: "Web Development Internship Certificate",
    issuer: "Sani IT Consultant",
    year: "2023",
  },
];

export const LANGUAGES = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

export const FILTERS = [
  { id: "all", label: "All work" },
  { id: "shopify", label: "Shopify" },
  { id: "fullstack", label: "Full stack" },
  { id: "wordpress", label: "WordPress" },
  { id: "oss", label: "Open source" },
];

/**
 * `repo` present  → source is public.
 * `repo` absent   → built under contract, repository stays with the client.
 * `image`         → base name of the captures in public/work/:
 *                   <image>.webp (first screen), <image>-full.webp (the page),
 *                   <image>-m.webp (phone). No image → a drawn cover.
 * `details`       → what the case-study panel shows.
 */
export const PROJECTS = [
  {
    id: "elitezone",
    name: "Elite Zone",
    kind: "Shopify · E-commerce",
    year: "2026",
    featured: true,
    isNew: true,
    categories: ["shopify"],
    summary:
      "A gadget and accessories store selling across Pakistan, rebuilt section by section on Shopify's Horizon theme — an animated hero with live product cards, cash-on-delivery and WhatsApp ordering on every product, and categories that build themselves from the catalogue.",
    tags: ["Shopify", "Liquid", "Horizon theme", "JavaScript", "CSS", "Admin GraphQL API"],
    url: "https://elitezone.zone",
    domain: "elitezone.zone",
    image: "elitezone",
    accent: "gold",
    highlights: [
      "Cash on delivery and WhatsApp ordering on every product page",
      "Menus, category circles and hero copy generate from live collections",
      "15 release rounds, each staged on a preview theme before going live",
    ],
    details: {
      role: "Theme engineering, store setup and SEO",
      timeline: "2026 · 15 release rounds",
      overview:
        "Elite Zone sells earbuds, headphones, chargers, power banks and other gadgets across Pakistan, with cash on delivery as the main way to pay. The store started on Shopify's Horizon theme; I rebuilt the storefront around how its customers buy — trust signals up front, WhatsApp as a second checkout path, and a catalogue the owner can grow without touching code.",
      built: [
        "A custom animated hero: rotating category words and floating product cards with live prices and discount badges.",
        "Product pages built for cash on delivery — a savings badge, delivery and returns promises, and Order on WhatsApp beside Add to cart.",
        "Shop by Category circles, the header dropdown, the mobile drawer and the footer columns all fill themselves from live collections, so a new category appears without a theme edit.",
        "Category chips with product counts and an inline product search on every collection page.",
        "A free-delivery progress bar in the cart drawer and on the cart page, plus quick add on mobile.",
        "How to Order, Spotlight, FAQ and trust sections, with scroll progress, back-to-top and card tilt on desktop — all of it respecting reduced-motion settings.",
        "SEO groundwork: favicon set, social share image, WebSite and BreadcrumbList structured data, and a homepage title and description built from the live categories.",
        "Abandoned-checkout recovery emails switched on through Shopify Messaging.",
        "Every release scripted: Node build scripts generate the theme files, push them to an unpublished preview theme through the Admin GraphQL API, and are checked on ten viewports from 320px to 1920px before publishing.",
      ],
      gallery: [
        { image: "elitezone-product", caption: "Product page — savings badge, COD promises and WhatsApp ordering" },
        { image: "elitezone-collection", caption: "Collection page — category chips with counts and inline search" },
      ],
      phones: ["elitezone-m", "elitezone-product-m"],
    },
  },
  {
    id: "times",
    name: "The Times of New York",
    kind: "Full-stack news platform",
    year: "2025",
    featured: true,
    categories: ["fullstack"],
    summary:
      "Production news publication with a ReactQuill editor, JWT admin dashboard, role-based access, draft workflow, SEO scoring and full CRUD across posts, categories and users.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    url: "https://www.thetimesofnewyork.com",
    domain: "thetimesofnewyork.com",
    image: "times",
    accent: "crimson",
    highlights: [
      "ReactQuill editor with a draft workflow",
      "JWT admin dashboard with role-based access",
      "SEO scoring and full CRUD over posts, categories and users",
    ],
    details: {
      role: "Full-stack build — front end, API and admin",
      timeline: "2025 · in production",
      overview:
        "A multi-category news and blog publication that runs in production. Editors write, save drafts and publish from their own dashboard, and every post is scored for SEO before it goes out.",
      built: [
        "React front end for the publication, its category pages and posts.",
        "Express REST API over MongoDB with full CRUD across posts, categories and users.",
        "JWT-protected admin dashboard with role-based access for the editorial team.",
        "A ReactQuill rich-text editor with a draft workflow.",
        "SEO scoring on every post before it publishes.",
      ],
    },
  },
  {
    id: "nexora",
    name: "Nexora",
    kind: "Desktop · Multi-agent AI",
    year: "2026",
    featured: true,
    categories: ["oss", "fullstack"],
    summary:
      "A desktop workspace you talk to. Four specialised AI agents share one machine — reading files, running commands and reporting back out loud — with parallel execution, a voice-first interface and security gates on every file or system change.",
    tags: ["Electron", "React 19", "TypeScript", "Three.js", "Vite"],
    url: "https://syedshabandeve.github.io/nexora/",
    domain: "syedshabandeve.github.io/nexora",
    repo: "https://github.com/SyedShabanDeve/nexora",
    image: "nexora",
    accent: "violet",
    highlights: [
      "Four agents with their own prompts, tools and queues, running in parallel",
      "A live voice loop that stops talking the moment you do",
      "Every write, move, delete or shell command waits for approval",
    ],
    details: {
      role: "Solo build — desktop app, Android companion and site",
      timeline: "2026 · early release",
      overview:
        "Nexora turns a PC into a workspace you talk to. Aria researches, Kai reads and fixes code, Vera handles files and Orion watches the machine — each a separate conversation with its own system prompt, tools and history, routed by a local orchestrator.",
      built: [
        "An Electron app that keeps keys, model connections and every tool call in the main process; the renderer only reaches a small preload bridge.",
        "One Provider interface over Gemini, Claude and Ollama, with history stored in a neutral shape and converted per backend.",
        "A local keyword-scored orchestrator instead of an extra model call, so routing adds no latency and no token cost.",
        "An approval gate on every change to the machine that shows the exact path or command and defaults to deny; credential stores are always refused.",
        "API keys encrypted with the OS account through Electron safeStorage.",
        "101 unit tests on the main process, builds for Windows and macOS, and an Android companion built with Capacitor.",
        "The marketing site in React 19, Vite, Tailwind v4 and React Three Fiber.",
      ],
    },
  },
  {
    id: "catchy",
    name: "Catchy Storefront",
    kind: "React · E-commerce",
    year: "2026",
    categories: ["oss", "fullstack"],
    summary:
      "Multi-page storefront with a variant-aware persistent cart, nested category routing, product detail pages, a checkout flow and a homepage content admin panel — built on React 19 and Context state.",
    tags: ["React 19", "React Router 7", "Context API", "Tailwind"],
    url: "https://syedshabandeve.github.io/catchy-storefront/",
    domain: "syedshabandeve.github.io/catchy-storefront",
    repo: "https://github.com/SyedShabanDeve/catchy-storefront",
    image: "catchy",
    accent: "gold",
    details: {
      role: "Solo build",
      timeline: "2026",
      overview:
        "A complete fashion-retail storefront front end, built to practise real e-commerce state problems — product variants, cart identity, and content a non-developer needs to change.",
      built: [
        "A homepage assembled from independent sections: hero slider, category carousel, new arrivals, best sellers, banners, testimonials and newsletter.",
        "Cart lines identified by id, size and colour, so variants never collide and repeat adds raise the quantity; the cart is mirrored to localStorage on every change.",
        "Nested category routing — one /:mainCategory/:subCategory/:item route drives the whole tree.",
        "Product pages with size and colour selection, plus deals, shipping and contact pages.",
        "An /admin editor for hero slides, headings, banners, brand story and newsletter copy, with shipped defaults as the fallback.",
      ],
    },
  },
  {
    id: "uforuae",
    name: "UFO R UAE",
    kind: "WordPress · WooCommerce",
    year: "2025",
    categories: ["wordpress"],
    summary:
      "UAE-based WooCommerce store with a bespoke child theme, plugin integrations, configured payment gateways and a performance-tuned product catalogue.",
    tags: ["WordPress", "WooCommerce", "PHP", "CSS"],
    url: "https://www.uforuae.com",
    domain: "uforuae.com",
    accent: "azure",
    details: {
      role: "WordPress and WooCommerce build",
      timeline: "2025",
      overview:
        "A WooCommerce store for a UAE-based business, built on a bespoke child theme rather than a page builder.",
      built: [
        "A bespoke child theme on top of the parent theme.",
        "Plugin integrations set up for the store.",
        "Payment gateways configured for checkout.",
        "A product catalogue tuned for performance.",
      ],
    },
  },
  {
    id: "sani-react",
    name: "Sani Corporate Website",
    kind: "React · Corporate",
    year: "2026",
    categories: ["oss"],
    summary:
      "Seven-page corporate site where every inner page is lazy-loaded into its own chunk, with hash-aware scroll restoration on navigation and an SPA redirect config for Netlify.",
    tags: ["React 19", "React Router 7", "Code splitting", "Netlify"],
    repo: "https://github.com/SyedShabanDeve/sani-corporate-website",
    domain: "sani-corporate-website",
    image: "sani-react",
    accent: "azure",
    details: {
      role: "Solo build",
      timeline: "2026",
      overview:
        "A marketing site for an IT consultancy, built around load performance: a visitor landing on the homepage should not pay to download six pages they may never open.",
      built: [
        "Route-level code splitting — only the homepage ships in the main bundle; each inner page is lazy-loaded behind a Suspense boundary.",
        "Scroll restoration that understands anchors: top of page on navigation, or a smooth scroll to the hash when the URL carries one.",
        "A blank-canvas Suspense fallback instead of a spinner, so fast connections never flash a loader.",
        "A catch-all route and an SPA redirect config for Netlify.",
      ],
    },
  },
  {
    id: "usd",
    name: "United States of Dollars",
    kind: "WordPress · Finance",
    year: "2024",
    categories: ["wordpress"],
    summary:
      "Custom WordPress build delivered from theme development through to handover, with third-party API connections, order workflows and front-end performance tuning.",
    tags: ["WordPress", "PHP", "JavaScript", "CSS"],
    url: "https://www.unitedstatesofdollars.com",
    domain: "unitedstatesofdollars.com",
    image: "usd",
    accent: "emerald",
    details: {
      role: "WordPress build and handover",
      timeline: "2024",
      overview:
        "A custom WordPress site for a finance business, delivered from theme development through to handover.",
      built: [
        "Theme development from the ground up.",
        "Third-party API connections.",
        "Order workflows.",
        "Front-end performance tuning before handover.",
      ],
    },
  },
  {
    id: "directory",
    name: "Directory Landing Redesign",
    kind: "React · Landing page",
    year: "2026",
    categories: ["oss"],
    summary:
      "Conversion-focused landing page redesign for a business directory product — a composite search bar, staggered motion on scroll and a mobile-first layout throughout.",
    tags: ["React 18", "Framer Motion", "Tailwind", "Vite"],
    repo: "https://github.com/SyedShabanDeve/directory-landing-redesign",
    domain: "directory-landing-redesign",
    image: "directory",
    accent: "emerald",
    details: {
      role: "Design and build",
      timeline: "2026",
      overview:
        "A redesign proposal for a local business directory. The brief was to make search unmissable and give the page a clear argument: search, proof, explanation, sign-up.",
      built: [
        "A composite search bar — query, location and category in one control that stacks on mobile and flattens into a row on larger screens.",
        "Category shortcuts rendered from a config array, so the set changes in one place.",
        "Staggered entrance animation with Framer Motion variants.",
        "Popular listings, a three-step explainer and a closing call to action.",
      ],
    },
  },
  {
    id: "sani-wp",
    name: "Sani IT Consultant",
    kind: "WordPress · Agency",
    year: "2023",
    categories: ["wordpress"],
    summary:
      "WordPress build for a Dubai-based marketing agency: service pages, lead capture forms and ongoing maintenance carried on past the internship period.",
    tags: ["WordPress", "HTML5", "CSS3", "JavaScript"],
    url: "https://saniitconsultant.com",
    domain: "saniitconsultant.com",
    image: "sani-wp",
    accent: "violet",
    details: {
      role: "WordPress build and maintenance",
      timeline: "2023 — ongoing",
      overview:
        "The website of a Dubai-based marketing agency — built in 2023 and maintained past the end of my internship.",
      built: [
        "Service pages for each of the agency's offerings.",
        "Lead capture forms.",
        "Ongoing maintenance carried on past the internship period.",
      ],
    },
  },
];

export const SERVICES = [
  {
    icon: "code",
    title: "Web applications",
    text: "React front ends backed by Express and MongoDB, with authentication, dashboards and role-aware access built in.",
    points: ["React, Node and MongoDB", "JWT auth and roles", "Admin dashboards"],
  },
  {
    icon: "cart",
    title: "Shopify stores",
    text: "Theme work past the editor — custom sections, product pages built to convert, and releases checked on a preview theme first.",
    points: ["Custom Liquid sections", "COD and WhatsApp ordering", "Store SEO"],
  },
  {
    icon: "wordpress",
    title: "WordPress & WooCommerce",
    text: "Custom child themes, plugin work, payment gateways and stores set up to be handed over and run without me.",
    points: ["Child themes", "Payment gateways", "Catalogue setup"],
  },
  {
    icon: "rocket",
    title: "Launch & maintenance",
    text: "Hosting, DNS, migrations and the post-launch fixes — the part most builds quietly need and rarely include.",
    points: ["Hosting and DNS", "Migrations", "Post-launch fixes"],
  },
];

/** How a project runs — the same four steps as the About copy. */
export const PROCESS = [
  {
    title: "Scope",
    text: "Goals, users, pages and data pinned down before anything is built.",
  },
  {
    title: "Build",
    text: "The front end and the API behind it, with auth and roles where they matter.",
  },
  {
    title: "Launch",
    text: "Hosting, DNS and migrations handled directly — put live, not handed off.",
  },
  {
    title: "Maintain",
    text: "I stay on for the fixes and changes that follow launch.",
  },
];
