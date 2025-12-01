import Link from "next/link";
import ThemeSwitcher from "./components/ThemeSwitcher";

const features = [
  {
    title: "Real-time Dialogue",
    description: "Precision streaming responses with contextual memory for every conversation.",
    icon: (
      <svg className="w-6 h-6 text-[var(--nebula-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: "Team-Ready Spaces",
    description: "Shared workspaces and curated prompts to keep your entire team in flow.",
    icon: (
      <svg className="w-6 h-6 text-[var(--nebula-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Enterprise Security",
    description: "Granular permissions, audit-ready logging, and role-based access control.",
    icon: (
      <svg className="w-6 h-6 text-[var(--nebula-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-y-auto bg-[var(--nebula-bg)] text-white selection:bg-[var(--nebula-primary)] selection:text-black">
      {/* Background Effects */}
      <div className="nebula-bg" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      {/* Floating Orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--nebula-primary)] rounded-full blur-[100px] opacity-20 animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--nebula-secondary)] rounded-full blur-[120px] opacity-20 animate-float" style={{ animationDelay: "2s" }} />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--nebula-primary)] to-[var(--nebula-secondary)] shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
          <span className="font-bold text-xl tracking-wide">CLARITY</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
            Sign In
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--nebula-primary)] animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-[var(--text-secondary)]">
              System Online v2.0
            </span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              CLARITY
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed">
            Experience the next evolution of AI conversation.
            <br className="hidden sm:block" />
            Designed for clarity, built for speed, styled for the future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/chat"
              className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Chat with Clarity
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-full glass-panel text-white font-medium hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-panel p-8 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--nebula-primary)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-[var(--text-tertiary)]">
        <p>© 2024 Clarity AI. All systems operational.</p>
      </footer>
    </div>
  );
}
