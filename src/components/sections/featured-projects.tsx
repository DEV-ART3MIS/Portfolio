import { motion } from "framer-motion";

import { ProjectShowcase } from "@/components/ui/project-showcase";

export function FeaturedProjects() {
  return (
    <section
      className="flex min-h-full flex-col bg-white text-neutral-950"
      aria-labelledby="featured-projects-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-[clamp(1.5rem,5vw,3rem)] py-[clamp(3rem,8vh,5rem)]">
        <motion.h2
          id="featured-projects-heading"
          className="font-geist mb-10 text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-neutral-900"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Featured projects
        </motion.h2>

        <ProjectShowcase className="max-w-none flex-1 px-0" variant="light" />
      </div>
    </section>
  );
}
