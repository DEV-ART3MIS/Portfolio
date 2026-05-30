import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useRef } from "react";

const ABOUT_COPY =
  "I'm Sarwadnya Maile. I like making software that feels simple on the surface and solid underneath—clear interfaces, careful engineering, and a bit of room for delight. I care about the details people notice and the ones they shouldn't have to.";

const WORDS = ABOUT_COPY.split(/\s+/);
const GREY = "rgb(115, 115, 115)";
const WHITE = "rgb(255, 255, 255)";

function ScrollWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(scrollYProgress, [start, end], [GREY, WHITE]);

  return (
    <motion.span className="inline text-left" style={{ color }}>
      {word}
    </motion.span>
  );
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
  });

  const imageY = useTransform(smoothProgress, [0, 1], [140, -110]);

  if (reduceMotion) {
    return (
      <section
        className="flex min-h-full flex-col overflow-x-hidden bg-neutral-950 text-white"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-12 px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,10vh,6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-x-16 lg:gap-y-0">
          <div className="min-w-0">
            <h2
              id="about-heading"
              className="font-geist mb-8 text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em] text-white"
            >
              About me
            </h2>
            <p className="font-geist text-left text-[clamp(1.35rem,3.2vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.02em] text-white/90">
              {ABOUT_COPY}
            </p>
          </div>
          <div className="relative w-full justify-self-center lg:max-w-[380px] lg:justify-self-end">
            <div className="overflow-hidden rounded-[28px] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <img
                src="/images/IMAGE1.png"
                alt="Sarwadnya Maile"
                className="block aspect-[3/4] h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="flex min-h-full flex-col overflow-x-hidden bg-neutral-950 text-white"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-12 px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,10vh,6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-x-16 lg:gap-y-0">
        <div className="min-w-0">
          <h2
            id="about-heading"
            className="font-geist mb-8 text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em] text-white"
          >
            About me
          </h2>
          <p className="font-geist max-w-none break-words text-left text-pretty text-[clamp(1.35rem,3.2vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.02em]">
            {WORDS.map((word, i) => (
              <Fragment key={`${i}-${word}`}>
                {i > 0 ? " " : null}
                <ScrollWord
                  word={word}
                  index={i}
                  total={WORDS.length}
                  scrollYProgress={scrollYProgress}
                />
              </Fragment>
            ))}
          </p>
        </div>

        <div className="relative w-full justify-self-center lg:max-w-[380px] lg:justify-self-end">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            <motion.div
              className="absolute left-0 top-[-12%] h-[124%] w-full will-change-transform"
              style={{ y: imageY }}
            >
              <img
                src="/images/IMAGE.png"
                alt="Sarwadnya Maile"
                className="block h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
