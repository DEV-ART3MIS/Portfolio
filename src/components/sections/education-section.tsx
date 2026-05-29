import { motion } from "framer-motion";

import { portfolioEducation } from "@/data/portfolio";

const EDUCATIONS = portfolioEducation;

const ease = [0.22, 1, 0.36, 1] as const;

export function EducationSection() {
  return (
    <section
      className="light-section flex min-h-full flex-col bg-white text-neutral-950"
      aria-label="Education"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-[clamp(1.5rem,5vw,3rem)] py-[clamp(2.5rem,6vh,4rem)]">
        <motion.h2
          className="mb-12 text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-neutral-900"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
        >
          Education
          <sup className="ml-2 align-super text-[clamp(1rem,3vw,2rem)] font-normal text-neutral-400">
            ({EDUCATIONS.length})
          </sup>
        </motion.h2>

        <div className="flex flex-col">
          <motion.div
            className="h-px bg-neutral-200"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease }}
          />

          {EDUCATIONS.map((edu, i) => (
            <motion.div
              key={`${edu.institution}-${i}`}
              className="group flex flex-col items-start gap-1 border-b border-neutral-200 py-6 transition-colors duration-300 hover:bg-neutral-50 md:grid md:grid-cols-[2fr_2fr_2fr_1fr] md:items-center md:gap-4 md:py-7"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease, delay: i * 0.07 }}
            >
              <span className="text-[clamp(1.1rem,1.8vw,1.2rem)] font-medium text-neutral-900 transition-colors duration-300">
                {edu.institution}
              </span>
              <span className="text-[clamp(0.9rem,1.5vw,1.05rem)] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-700">
                {edu.degree}
              </span>
              <span className="font-mono text-[clamp(0.8rem,1.3vw,0.95rem)] tabular-nums text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600">
                {edu.period}
              </span>
              <span className="text-left text-[clamp(0.8rem,1.3vw,0.95rem)] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600 md:text-right">
                {edu.location}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
