import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

type Props = {
  hero: ReactNode;
  featured: ReactNode;
  techStack: ReactNode;
  experience: ReactNode;
  education: ReactNode;
  about: ReactNode;
  letsConnect: ReactNode;
};

/**
 * Stacking-card scroll layout  –  v3 "seamless, no gaps"
 *
 * Final tuning:
 * · Shorter scroll distances eliminate "dead zones"
 * · Spring-smoothed values → buttery interpolation
 * · Cards scale from center with very gentle dim → no visible border/gap
 * · Each wrapper div has matching bg color to prevent dark bleed-through
 * · Progressive shadow depth per card layer
 */

/* ── Scroll-segment heights ─────────────────────────────────────────── */
const HERO_PROJECTS_SCROLL = "min-h-[200vh]";
const SECTION_SCROLL = "min-h-[150vh]";

/* Hero handoff: how early projects card arrives */
const HERO_HANDOFF = 0.5;

/* Spring config for buttery smooth glide */
const SPRING = { stiffness: 100, damping: 30, mass: 0.6 } as const;

/* ── Styling ─────────────────────────────────────────────────────────── */
const CARD_INNER =
  "h-full min-h-0 max-h-[100dvh] overflow-x-hidden overflow-y-auto overscroll-y-auto [scrollbar-gutter:stable]";

/** Progressive shadow depths */
const SHADOW = [
  "0 -6px 24px -4px rgba(0,0,0,0.18), 0 -2px 6px rgba(0,0,0,0.06)",
  "0 -10px 32px -4px rgba(0,0,0,0.22), 0 -3px 10px rgba(0,0,0,0.08)",
  "0 -14px 40px -4px rgba(0,0,0,0.26), 0 -5px 14px rgba(0,0,0,0.10)",
  "0 -18px 46px -4px rgba(0,0,0,0.30), 0 -7px 16px rgba(0,0,0,0.11)",
  "0 -22px 52px -4px rgba(0,0,0,0.34), 0 -9px 18px rgba(0,0,0,0.12)",
  "0 -26px 58px -4px rgba(0,0,0,0.38), 0 -11px 20px rgba(0,0,0,0.13)",
] as const;

/** Card classes (white variant) */
const CARD_WHITE =
  "sticky top-0 h-[100dvh] w-full overflow-hidden rounded-t-[clamp(1rem,3vw,2rem)] bg-white text-neutral-950 will-change-transform";
const CARD_DARK =
  "sticky top-0 h-[100dvh] w-full overflow-hidden rounded-t-[clamp(1rem,3vw,2rem)] bg-neutral-950 text-white will-change-transform";

/* ── Dim params: opacity dims slightly, scale shrinks minimally from center */
const DIM_OPACITY: [number, number] = [1, 0.92];
const DIM_SCALE: [number, number] = [1, 0.97];
const ORIGIN = "50% 50%";

/** Smooth a raw scroll progress through a spring */
function useSmooth(raw: MotionValue<number>) {
  return useSpring(raw, SPRING);
}

export function StackedScrollView({
  hero,
  featured,
  techStack,
  experience,
  education,
  about,
  letsConnect,
}: Props) {
  const reduceMotion = useReducedMotion();
  const heroProjectsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  /* ── Raw scroll progress ────────────────────────────────────────────── */
  const { scrollYProgress: heroRaw } = useScroll({
    target: heroProjectsRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: techRaw } = useScroll({
    target: techRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: expRaw } = useScroll({
    target: expRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: eduRaw } = useScroll({
    target: eduRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: aboutRaw } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: connectRaw } = useScroll({
    target: connectRef,
    offset: ["start end", "start start"],
  });

  /* ── Smoothed progress ──────────────────────────────────────────────── */
  const heroS = useSmooth(heroRaw);
  const techS = useSmooth(techRaw);
  const expS = useSmooth(expRaw);
  const eduS = useSmooth(eduRaw);
  const aboutS = useSmooth(aboutRaw);
  const connectS = useSmooth(connectRaw);

  /* ── Hero exit ──────────────────────────────────────────────────────── */
  const heroOpacity = useTransform(heroS, [0, HERO_HANDOFF * 0.6], [1, 0], {
    clamp: true,
  });
  const heroScale = useTransform(heroS, [0, HERO_HANDOFF], [1, 0.97], {
    clamp: true,
  });
  const featuredY = useTransform(
    heroS,
    [0.06, HERO_HANDOFF],
    ["100%", "0%"],
    { clamp: true }
  );

  /* ── Card dim when next card stacks on top ──────────────────────────── */
  const featuredDimOp = useTransform(techS, [0, 1], DIM_OPACITY);
  const featuredDimSc = useTransform(techS, [0, 1], DIM_SCALE);

  const techY = useTransform(techS, [0, 1], ["100%", "0%"]);
  const techDimOp = useTransform(expS, [0, 1], DIM_OPACITY);
  const techDimSc = useTransform(expS, [0, 1], DIM_SCALE);

  const expY = useTransform(expS, [0, 1], ["100%", "0%"]);
  const expDimOp = useTransform(eduS, [0, 1], DIM_OPACITY);
  const expDimSc = useTransform(eduS, [0, 1], DIM_SCALE);

  const eduY = useTransform(eduS, [0, 1], ["100%", "0%"]);
  const eduDimOp = useTransform(aboutS, [0, 1], DIM_OPACITY);
  const eduDimSc = useTransform(aboutS, [0, 1], DIM_SCALE);

  const aboutY = useTransform(aboutS, [0, 1], ["100%", "0%"]);
  const aboutDimOp = useTransform(connectS, [0, 1], DIM_OPACITY);
  const aboutDimSc = useTransform(connectS, [0, 1], DIM_SCALE);

  const connectY = useTransform(connectS, [0, 1], ["100%", "0%"]);

  const skip = !!reduceMotion;

  return (
    <div className="bg-neutral-950 text-white">
      {/* ═══ Hero + Projects ══════════════════════════════════════════ */}
      <div
        ref={heroProjectsRef}
        className={`relative ${HERO_PROJECTS_SCROLL}`}
      >
        {/* Anchor for Projects: centered in the 100vh-200vh glory zone */}
        <div id="projects" className="absolute left-0 top-[150vh] pointer-events-none" />
        {/* Hero: sticky, fades + subtly scales out */}
        <div className="sticky top-0 z-10 h-[100dvh] w-full overflow-hidden">
          <motion.div
            className="h-full"
            style={
              skip
                ? {}
                : {
                    opacity: heroOpacity,
                    scale: heroScale,
                    transformOrigin: "50% 60%",
                  }
            }
          >
            {hero}
          </motion.div>
        </div>

        {/* Featured projects card – glides in over hero */}
        <motion.div
          className={`${CARD_WHITE} z-20 -mt-[100dvh]`}
          style={
            skip
              ? { opacity: featuredDimOp, scale: featuredDimSc, transformOrigin: ORIGIN }
              : {
                  y: featuredY,
                  opacity: featuredDimOp,
                  scale: featuredDimSc,
                  transformOrigin: ORIGIN,
                  boxShadow: SHADOW[0],
                }
          }
          tabIndex={-1}
        >
          <div className={CARD_INNER}>{featured}</div>
        </motion.div>
      </div>

      {/* ═══ Tech Stack ═══════════════════════════════════════════════ */}
      <div ref={techRef} className={`relative bg-white ${SECTION_SCROLL}`}>
        {/* Navigation Anchor: centered in the 100vh - 150vh glory zone (0-50vh after top-start) */}
        <div id="tech-stack" className="absolute left-0 top-[25vh] pointer-events-none" />
        <motion.div
          className={`${CARD_WHITE} z-30`}
          style={
            skip
              ? { opacity: techDimOp, scale: techDimSc, transformOrigin: ORIGIN }
              : {
                  y: techY,
                  opacity: techDimOp,
                  scale: techDimSc,
                  transformOrigin: ORIGIN,
                  boxShadow: SHADOW[1],
                }
          }
          tabIndex={-1}
        >
          <div className={CARD_INNER}>{techStack}</div>
        </motion.div>
      </div>

      {/* ═══ Experience ═══════════════════════════════════════════════ */}
      <div ref={expRef} className={`relative bg-white ${SECTION_SCROLL}`}>
        {/* Navigation Anchor: centered in glory zone */}
        <div id="experience" className="absolute left-0 top-[25vh] pointer-events-none" />
        <motion.div
          className={`${CARD_WHITE} z-[35]`}
          style={
            skip
              ? { opacity: expDimOp, scale: expDimSc, transformOrigin: ORIGIN }
              : {
                  y: expY,
                  opacity: expDimOp,
                  scale: expDimSc,
                  transformOrigin: ORIGIN,
                  boxShadow: SHADOW[2],
                }
          }
          tabIndex={-1}
        >
          <div className={CARD_INNER}>{experience}</div>
        </motion.div>
      </div>

      {/* ═══ Education ════════════════════════════════════════════════ */}
      <div ref={eduRef} className={`relative bg-white ${SECTION_SCROLL}`}>
        {/* Navigation Anchor: centered in glory zone */}
        <div id="education" className="absolute left-0 top-[25vh] pointer-events-none" />
        <motion.div
          className={`${CARD_WHITE} z-[38]`}
          style={
            skip
              ? { opacity: eduDimOp, scale: eduDimSc, transformOrigin: ORIGIN }
              : {
                  y: eduY,
                  opacity: eduDimOp,
                  scale: eduDimSc,
                  transformOrigin: ORIGIN,
                  boxShadow: SHADOW[3],
                }
          }
          tabIndex={-1}
        >
          <div className={CARD_INNER}>{education}</div>
        </motion.div>
      </div>

      {/* ═══ About ════════════════════════════════════════════════════ */}
      <div ref={aboutRef} className={`relative bg-neutral-950 ${SECTION_SCROLL}`}>
        {/* Navigation Anchor: centered in glory zone */}
        <div id="about" className="absolute left-0 top-[25vh] pointer-events-none" />
        <motion.div
          className={`${CARD_DARK} z-40`}
          style={
            skip
              ? { opacity: aboutDimOp, scale: aboutDimSc, transformOrigin: ORIGIN }
              : {
                  y: aboutY,
                  opacity: aboutDimOp,
                  scale: aboutDimSc,
                  transformOrigin: ORIGIN,
                  boxShadow: SHADOW[4],
                }
          }
          tabIndex={-1}
        >
          <div className={CARD_INNER}>{about}</div>
        </motion.div>
      </div>

      {/* ═══ Let's Connect ════════════════════════════════════════════ */}
      <div ref={connectRef} className={`relative bg-white ${SECTION_SCROLL}`}>
        {/* Navigation Anchor: centered in glory zone */}
        <div id="connect" className="absolute left-0 top-[25vh] pointer-events-none" />
        <motion.div
          className={`${CARD_WHITE} z-[42]`}
          style={
            skip
              ? { transformOrigin: ORIGIN }
              : {
                  y: connectY,
                  transformOrigin: ORIGIN,
                  boxShadow: SHADOW[5],
                }
          }
          tabIndex={-1}
        >
          <div className={CARD_INNER}>{letsConnect}</div>
        </motion.div>
      </div>
    </div>
  );
}
