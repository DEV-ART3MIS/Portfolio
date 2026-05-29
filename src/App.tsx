import { useState, useCallback, useEffect } from "react";
import { BackgroundPathsBackdrop } from "@/components/ui/background-paths";
import { TextScramble } from "@/components/ui/text-scramble";
import { AboutSection } from "@/components/sections/about-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { LetsConnectSection } from "@/components/sections/lets-connect-section";
import { StackedScrollView } from "@/components/layout/stacked-scroll-view";
import { PerspectiveMenu } from "@/components/layout/perspective-menu";
import { SplashLoader } from "@/components/layout/splash-loader";
import { useTypingRoles } from "@/hooks/use-typing-roles";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const roleText = useTypingRoles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Lock scroll while splash is showing
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSplash]);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const hero = (
    <section
      className="relative isolate flex min-h-[100dvh] flex-col"
      aria-label="Introduction"
    >
      <BackgroundPathsBackdrop />

      <header className="relative z-10 flex items-center justify-between px-[clamp(1.5rem,5vw,3rem)] py-[clamp(1.25rem,4vw,2rem)]">
        <button
          type="button"
          onClick={openMenu}
          className="inline-flex cursor-pointer items-center gap-[0.65rem] border-0 bg-transparent p-0 font-[inherit] text-white opacity-90 transition-opacity hover:opacity-100"
          aria-label="Open menu"
        >
          <span
            className="block h-0.5 w-[18px] rounded-[1px] bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]"
            aria-hidden
          />
          <span className="text-[clamp(0.875rem,1.5vw,1rem)] tracking-[0.02em]">
            Menu
          </span>
        </button>
        <span className="text-[clamp(0.875rem,1.5vw,1rem)] tracking-[0.12em] opacity-95">
          S.M
        </span>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-[clamp(1.5rem,5vw,3rem)] pb-[clamp(5rem,12vh,7rem)] pt-[clamp(2rem,8vh,5rem)]">
        <div className="max-w-[min(42rem,100%)]">
          <h1 className="mb-[clamp(0.75rem,2vw,1.25rem)] text-[clamp(2rem,5.5vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.02em]">
            Sup, I&apos;m Sarwadnya Maile.
          </h1>
          <p
            className="mb-[clamp(1rem,3vw,1.75rem)] min-h-[1.3em] text-[clamp(1.5rem,4vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.02em]"
            aria-live="polite"
          >
            <span className="mr-[0.35em]">I&apos;m a</span>
            <span className="text-white/[0.98]">{roleText}</span>
            <span
              className="ml-0.5 inline-block h-[0.85em] w-0.5 animate-cursor-blink align-[-0.08em] bg-white/85 motion-reduce:animate-none motion-reduce:opacity-100"
              aria-hidden
            />
          </p>
          <p className="mb-8 max-w-[28rem] text-[clamp(0.95rem,1.8vw,1.125rem)] font-medium leading-[1.65] text-white/60">
            Passionately creating innovative digital experiences, rooted in user
            needs.
          </p>
          <a
            href="#projects"
            className="inline-flex text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="View projects"
          >
            <TextScramble text="VIEW WORK" />
          </a>
        </div>
      </main>

      <div
        className="pointer-events-none absolute bottom-[clamp(1.5rem,4vh,2.5rem)] left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <span className="relative block h-9 w-[22px] rounded-[12px] border-[1.5px] border-white/35">
          <span className="absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/55" />
        </span>
      </div>
    </section>
  );

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashLoader onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
        animate={
          showSplash
            ? { opacity: 0, scale: 1.05, filter: "blur(4px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="w-full"
      >
        <PerspectiveMenu
          isOpen={menuOpen}
          onClose={closeMenu}
        >
          <StackedScrollView
            hero={hero}
            featured={<FeaturedProjects />}
            techStack={<TechStackSection />}
            experience={<ExperienceSection />}
            education={<EducationSection />}
            about={<AboutSection />}
            letsConnect={<LetsConnectSection />}
          />
        </PerspectiveMenu>
      </motion.div>
    </>
  );
}
