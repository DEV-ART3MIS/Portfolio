import { motion } from "framer-motion";

import { AnimatedFolder, type SkillItem } from "@/components/ui/3d-folder";

// Devicon CDN base
const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// ─── Folder data ──────────────────────────────────────────────────────────────

const FOLDERS: { title: string; gradient: string; skills: SkillItem[] }[] = [
  {
    title: "Frontend",
    gradient: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
    skills: [
      { id: "fe-react",    title: "React",        image: `${D}/react/react-original.svg`,             bg: "#20232a" },
      { id: "fe-next",     title: "Next.js",      image: `${D}/nextjs/nextjs-original.svg`,           bg: "#000000" },
      { id: "fe-ts",       title: "TypeScript",   image: `${D}/typescript/typescript-original.svg`,   bg: "#3178c6" },
      { id: "fe-tailwind", title: "Tailwind CSS", image: `${D}/tailwindcss/tailwindcss-original.svg`, bg: "#0f172a" },
      { id: "fe-html",     title: "HTML5",        image: `${D}/html5/html5-original.svg`,             bg: "#e34f26" },
      { id: "fe-css",      title: "CSS3",         image: `${D}/css3/css3-original.svg`,               bg: "#1572b6" },
      { id: "fe-vite",     title: "Vite",         image: `${D}/vitejs/vitejs-original.svg`,           bg: "#1e1b4b" },
    ],
  },
  {
    title: "Languages",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    skills: [
      { id: "lg-js",     title: "JavaScript", image: `${D}/javascript/javascript-original.svg`, bg: "#f7df1e" },
      { id: "lg-ts",     title: "TypeScript", image: `${D}/typescript/typescript-original.svg`, bg: "#3178c6" },
      { id: "lg-python", title: "Python",     image: `${D}/python/python-original.svg`,         bg: "#3776ab" },
      { id: "lg-cpp",    title: "C++",        image: `${D}/cplusplus/cplusplus-original.svg`,   bg: "#00599c" },
      { id: "lg-sql",    title: "SQL",        image: `${D}/azuresqldatabase/azuresqldatabase-original.svg`, bg: "#0078d4" },
    ],
  },
  {
    title: "Backend",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    skills: [
      { id: "be-node",    title: "Node.js",    image: `${D}/nodejs/nodejs-original.svg`,    bg: "#215732" },
      { id: "be-express", title: "Express.js", image: `${D}/express/express-original.svg`,  bg: "#333333" },
      { id: "be-redis",   title: "Redis",      image: `${D}/redis/redis-original.svg`,      bg: "#dc382d" },
      { id: "be-docker",  title: "Docker",     image: `${D}/docker/docker-original.svg`,    bg: "#1d63ed" },
    ],
  },
  {
    title: "Database",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    skills: [
      { id: "db-pg",       title: "PostgreSQL", image: `${D}/postgresql/postgresql-original.svg`, bg: "#336791" },
      { id: "db-prisma",   title: "Prisma",     image: `${D}/prisma/prisma-original.svg`,         bg: "#2d3748" },
      { id: "db-supabase", title: "Supabase",   image: `${D}/supabase/supabase-original.svg`,     bg: "#1c1c1c" },
      { id: "db-redis",    title: "Redis",      image: `${D}/redis/redis-original.svg`,           bg: "#dc382d" },
      { id: "db-mysql",    title: "MySQL",      image: `${D}/mysql/mysql-original.svg`,           bg: "#00618a" },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function TechStackSection() {
  return (
    <section
      className="light-section flex min-h-full flex-col bg-white text-neutral-950"
      aria-label="Tech Stack"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-[clamp(1.5rem,5vw,3rem)] py-[clamp(2.5rem,6vh,4rem)]">
        <motion.h2
          className="mb-10 text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-neutral-900"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
        >
          Tech stack
        </motion.h2>

        <div className="grid flex-1 grid-cols-2 gap-6 md:grid-cols-4">
          {FOLDERS.map((folder, i) => (
            <motion.div
              key={folder.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease, delay: i * 0.09 }}
            >
              <AnimatedFolder
                title={folder.title}
                skills={folder.skills}
                gradient={folder.gradient}
                className="w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
