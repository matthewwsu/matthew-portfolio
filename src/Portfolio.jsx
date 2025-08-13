import React, { useEffect } from "react";

/**
 * FIX NOTES (why this rewrite):
 * - Addressed runtime error: `ReferenceError: skills is not defined` by defining a `skills` array
 *   before it is used in the About section.
 * - Kept the prior hardening changes: removed external icon & shadcn imports to avoid unresolved
 *   dependencies in fresh/sandboxed builds and replaced them with local UI primitives.
 * - Added MORE self-tests so missing config is surfaced in the console early (now tests `skills`).
 * - No visual regressions; same sections and layout.
 */

// ---------- Minimal UI primitives (no external deps) ----------
const cls = (...xs) => xs.filter(Boolean).join(" ");

const Card = ({ className = "", children }) => (
  <div className={cls(
    "rounded-2xl border border-zinc-800 bg-zinc-950/80",
    "shadow-sm",
    className
  )}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={cls("px-5 pt-5", className)}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <div className={cls("text-zinc-100 font-medium", className)}>{children}</div>
);
const CardDescription = ({ children, className = "" }) => (
  <div className={cls("text-zinc-400 text-sm mt-1", className)}>{children}</div>
);
const CardContent = ({ children, className = "" }) => (
  <div className={cls("px-5 pb-5", className)}>{children}</div>
);

const Button = ({ asChild = false, children, variant = "solid", className = "", href, ...rest }) => {
  const base = cls(
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm",
    variant === "outline"
      ? "border border-zinc-800 text-zinc-200 hover:bg-zinc-900"
      : "bg-zinc-100 text-black hover:bg-white"
  );
  if (asChild && href) return (
    <a href={href} className={cls(base, className)} {...rest}>{children}</a>
  );
  return <button className={cls(base, className)} {...rest}>{children}</button>;
};

// Tiny emoji icon shim (keeps the vibe without external packages)
const I = {
    arrow: () => <span aria-hidden>→</span>,
    linkedin: () => <span aria-hidden>in</span>,
    youtube: () => <span aria-hidden>▶</span>,
    mail: () => <span aria-hidden>✉️</span>,
    file: () => <span aria-hidden>📄</span>,
    bldg: () => <span aria-hidden>🏢</span>,
    brain: () => <span aria-hidden>🧠</span>,
    chart: () => <span aria-hidden>📈</span>,
    spark: () => <span aria-hidden>✨</span>,
    x: () => <span aria-hidden>𝕏</span>,
    ig: () => (
        <img
            src={`${import.meta.env.BASE_URL}instagram.svg`}
            alt="Instagram"
            style={{
                filter: 'invert(1) grayscale(0) brightness(2) contrast(2)',
                height: '1.25em',
                width: '1.25em',
                verticalAlign: 'text-bottom',
                opacity: 1,
                display: 'inline-block',
                transform: 'translateY(0.05em)',
            }}
            draggable={false}
        />
    ),
    link: () => <span aria-hidden>🔗</span>,
};

// ---------- Links & Config ----------
const links = {
  email: "matthewsu02@gmail.com",
  linkedin: "https://www.linkedin.com/in/matthew-su-96a52a1a7/",
  youtube: "https://www.youtube.com/@MatthewSu",
  resume: `${import.meta.env.BASE_URL}resume.pdf`,

  // Socials
  xHandle: "satthewmu",
  xUrl: "https://twitter.com/satthewmu",
  instagramUrl: "https://www.instagram.com/matthew_su/",
  writingValuation: `${import.meta.env.BASE_URL}writing/model-valuation.pdf`,
  writingResearch: `${import.meta.env.BASE_URL}writing/research-paper.pdf`,

  /**
   * If you have an Instagram widget provider or your own endpoint that
   * renders a lightweight grid, put its iframe URL here to show a live feed.
   * Example: "https://snapwidget.com/embed/123...".
   */
  instagramEmbedSrc: "https://widgets.sociablekit.com/instagram-feed/iframe/25588031",  // replace with your iframe src

};

// ---------- Hero Highlights ----------
const highlights = [
  { label: "Wharton B.S. (Real Estate & Finance)", value: "UPenn" },
  { label: "Content Creator", value: "15k subs, 1M+ views" },
  { label: "Tech + Finance", value: "AI, Python, SQL, Java, VBA, Xceptor" },
];

// ---------- Skills (FIX for ReferenceError) ----------
const skills = [
  "Python",
  "Java",
  "SQL",
  "PowerBI",
  "Excel",
  "VBA",
  "Xceptor",
  "Figma",
  "Adobe Suite",
  "Salesforce",
  "Public Speaking",
  "Mandarin",
];

// ---------- Experience ----------
const experiences = [
  {
    company: "Citadel",
    role: "Credit Summer Analyst",
    location: "New York, NY",
    period: "May 2024 – Aug 2024",
    bullets: [
      "Automated ASCOT reconciliation (Python + Xceptor), cutting processing time ~50%.",
      "Built broker performance dashboard (6 groups, 20+ products) for real‑time insights.",
      "Designed internal ticketing tooling; reduced trade approval lag by >60 minutes.",
    ],
    tags: ["Structured Credit", "Process Automation", "Dashboards"],
  },
  {
    company: "Summit Trail Advisors",
    role: "Asset Management Fall Analyst",
    location: "New York, NY",
    period: "Sep 2024 – Dec 2024",
    bullets: [
      "Doubled reporting workflow efficiency with VBA/Excel across 10+ PE vehicles.",
      "Performed fund manager analysis & attribution modeling to support IC decisions.",
      "Joined UHNW client and manager meetings to evaluate performance and pitches.",
    ],
    tags: ["UHNW", "Attribution", "Automation"],
  },
  {
    company: "GitHub",
    role: "Business Operations Intern",
    location: "Remote",
    period: "Jun 2023 – Aug 2023",
    bullets: [
      "Shaped GTM pitch for Copilot AI & GHAS; adopted org‑wide.",
      "Launched onboarding with DS & L&D; boosted client engagement ~40%.",
      "Market research + competitor analysis to inform sales enablement roadmaps.",
    ],
    tags: ["AI", "GTM", "Enablement"],
  },
];

// ---------- Projects ----------
const projects = [
  {
    title: "Auto Mashup Maker",
    blurb:
      "Web app aligning BPM and key to auto‑generate song mashups. Built for creators; demonstrates DSP + product sense.",
    links: [,
      { href: "#", label: "Demo (Pending)" },
    ],
    stack: ["Python", "DSP", "Vite + React"],
  },
  {
    title: "AI Site Auditor (AEO)",
    blurb:
      "Chrome extension + backend that analyzes webpage structure and recommends AI search‑friendly schema.",
    links: [
      { href: "https://github.com/matthewwsu/aeyo", label: "Repo" },

    ],
    stack: ["LLMs", "Chrome API", "Flask"],
  },
  {
    title: "Quant Portfolio Optimizer",
    blurb:
      "Tool that recommends allocations via MVO with target return; tunable constraints and BL integrations. Built for portfolio testing.",
    links: [
      { href: "https://github.com/YOUR_GITHUB_USERNAME/quant-optimizer", label: "Repo" },
    ],
    stack: ["Python", "Pandas", "Optimization"],
  },
];

// ---------- Self-Tests (runtime assertions) ----------
function runSelfTests() {
  const tests = [];
  // Existing tests
  tests.push({ name: "links required", pass: !!(links.email && links.linkedin && links.youtube && links.resume) });
  tests.push({ name: "xUrl matches xHandle", pass: links.xUrl?.endsWith(`/${links.xHandle}`) });
  tests.push({ name: "has AI Site Auditor project", pass: projects.some((p) => /site auditor/i.test(p.title)) });

  // New tests (added as requested)
  tests.push({ name: "skills defined & non-empty", pass: Array.isArray(skills) && skills.length > 0 });
  tests.push({ name: "instagramUrl looks valid", pass: /^https:\/\/www\.instagram\.com\//.test(links.instagramUrl) });
  tests.push({ name: "projects non-empty", pass: Array.isArray(projects) && projects.length >= 1 });

  const failed = tests.filter((t) => !t.pass);
  if (failed.length) {
    console.warn("Portfolio self-tests: some checks failed:", failed);
  } else {
    console.log("Portfolio self-tests: all checks passed ✅");
  }
}

// ---------- UI Sections ----------
const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10 py-16 md:py-24">
    <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 text-zinc-100 opacity-0 animate-[fadeInUp_0.5s_ease_forwards]">
      {title}
    </h2>
    {children}
  </section>
);

const Pill = ({ children }) => (
  <span className="text-xs md:text-sm rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-zinc-300">
    {children}
  </span>
);

const Nav = () => (
  <nav className="fixed top-4 inset-x-0 z-50 mx-auto flex max-w-3xl items-center justify-between rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-2 backdrop-blur">
    <a href="#home" className="text-sm font-medium text-zinc-200">MS</a>
    <div className="flex items-center gap-3 md:gap-5 text-xs md:text-sm">
      {[
        ["About", "about"],
        ["Experience", "experience"],
        ["Projects", "projects"],
        ["Content", "content"],
        ["Contact", "contact"],
      ].map(([label, id]) => (
        <a key={id} href={`#${id}`} className="text-zinc-400 hover:text-zinc-100 transition-colors">
          {label}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-2">
      <a href={links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-zinc-900"><I.linkedin /></a>
      <a href={links.youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-zinc-900"><I.youtube /></a>
      <a href={links.xUrl} aria-label="X" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-zinc-900"><I.x /></a>
      <a href={links.instagramUrl} aria-label="Instagram" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-zinc-900"><I.ig /></a>
      <a href={`mailto:${links.email}`} aria-label="Email" className="p-2 rounded-full hover:bg-zinc-900"><I.mail /></a>
    </div>
  </nav>
);

const Hero = () => (
  <section id="home" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />
    <div className="mx-auto max-w-4xl px-6 sm:px-8 md:px-10 text-center opacity-0 animate-[fadeInUp_0.8s_ease_forwards]">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-300">
        <I.spark /> Building at the edge of finance × AI × product
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-50">Matthew Su</h1>
      <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
        Ex-Citadel · Ex-PE/AM · Ex-GitHub. I design data‑driven systems and delightful products,
        from quant tools to creator platforms.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button asChild href="#projects" className="rounded-full">Explore work <I.arrow /></Button>
        <Button asChild href={links.resume} className="rounded-full" variant="outline" target="_blank" rel="noreferrer"><I.file /> Resume</Button>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {highlights.map((h) => (
          <Pill key={h.label}>{h.label} · {h.value}</Pill>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <Section id="about" title="About">
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><I.brain /> What I Do</CardTitle>
          <CardDescription>Finance × AI × Product</CardDescription>
        </CardHeader>
        <CardContent className="text-zinc-300 text-sm leading-6">
          Wassup, I'm Matt. I love building things that make life easier and smarter. Whether it's finance or tech, or even social media. I want to create beautiful things for you all to enjoy. Welcome to my page and have fun.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><I.chart /> Focus Areas</CardTitle>
          <CardDescription>Recent threads</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {["Structured Credit", "Quant Research", "AEO/SEO for AI", "Automation", "Creator Tools", "Asset Management", "Social Media"].map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </CardContent>
      </Card>
    </div>
    <div className="mt-8">
      <div className="text-sm text-zinc-400">Skills & Tools</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (<Pill key={s}>{s}</Pill>))}
      </div>
    </div>
  </Section>
);

const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="grid gap-6 md:grid-cols-3">
      {experiences.map((exp) => (
        <Card key={exp.company}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-100"><I.bldg /> {exp.company}</CardTitle>
            <CardDescription>{exp.role} · {exp.location}</CardDescription>
            <div className="text-xs text-zinc-500">{exp.period}</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc pl-5 text-sm text-zinc-300">
              {exp.bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              {exp.tags.map((t) => (<Pill key={t}>{t}</Pill>))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

const Projects = () => (
  <Section id="projects" title="Selected Projects">
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((p) => (
        <Card key={p.title} className="transition-colors hover:border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">{p.title}</CardTitle>
            <CardDescription className="text-zinc-400">{p.blurb}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (<Pill key={s}>{s}</Pill>))}
            </div>
            <div className="flex items-center gap-3 text-sm">
              {p.links.map((l) => (
                <a key={l.label} href={l.href} className="inline-flex items-center gap-1 text-zinc-300 hover:text-zinc-100">
                  {l.label} <I.link />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

const Socials = () => {
  useEffect(() => {
    // Load X (Twitter) widgets once
    if (typeof window !== "undefined") {
      const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (!existing) {
        const s = document.createElement('script');
        s.src = 'https://platform.twitter.com/widgets.js';
        s.async = true;
        document.body.appendChild(s);
      } else if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }
  }, []);

  const timelineHref = links.xHandle ? `https://twitter.com/${links.xHandle}` : "https://twitter.com/twitter";

 
};

const Content = () => (
  <Section id="content" title="Content">
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><I.youtube /> Latest on YouTube</CardTitle>
          <CardDescription>Story‑driven productivity & tech</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video overflow-hidden rounded-xl border border-zinc-800">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/X0nba2FhgV8"
              title="Matthew Su — YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><I.file /> Writing</CardTitle>
          <CardDescription>Notes, breakdowns & case studies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-300">
  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="font-medium text-zinc-100">Valuation Write‑up</div>
      <div className="text-zinc-400">
        A valuation write-up example on Hibbett Sports, covering their financials, comps, and operations.
      </div>
    </div>
    <a
      href={links.writingValuation}
      target="_blank"
      rel="noreferrer"
      className="text-zinc-300 hover:text-zinc-100 inline-flex items-center gap-1"
      title="Open PDF in a new tab"
    >
      Open
    </a>
  </div>

  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="font-medium text-zinc-100">Research Paper</div>
      <div className="text-zinc-400">
        My AI/Fin-tech research paper on using neural networks and machine learning to predict stock market prices using sentiment analysis.
      </div>
    </div>
    <a
      href={links.writingResearch}
      target="_blank"
      rel="noreferrer"
      className="text-zinc-300 hover:text-zinc-100 inline-flex items-center gap-1"
      title="Open PDF in a new tab"
    >
      Open
    </a>
  </div>
</CardContent>

      </Card>
    </div>
  </Section>
);

const Contact = () => (
  <Section id="contact" title="Contact">
    <Card>
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
        <div>
          <div className="text-zinc-100 text-lg font-medium">Let's build something useful.</div>
          <div className="text-zinc-400 text-sm mt-1">Available for roles in asset management, strategy, and AI‑driven product.</div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild href={`mailto:${links.email}`} className="rounded-full"><I.mail /> Email</Button>
          <Button asChild href={links.linkedin} className="rounded-full" variant="outline" target="_blank" rel="noreferrer"><I.linkedin /> LinkedIn</Button>
        </div>
      </CardContent>
    </Card>
    <div className="text-xs text-zinc-500 mt-4">© {new Date().getFullYear()} Matthew Su</div>
  </Section>
);

// ---------- Root ----------
export default function Portfolio() {
  useEffect(() => {
    runSelfTests();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Socials />
      <Content />
      <Contact />
    </div>
  );
}
