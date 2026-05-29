import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { portfolioProjects, type ProjectItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export type { ProjectItem };

/** Portfolio project list — edit `src/data/portfolio.ts` */
export const DEFAULT_PROJECTS: ProjectItem[] = portfolioProjects;

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export interface ProjectShowcaseProps {
  projects?: ProjectItem[];
  className?: string;
  /** Dark UI for near-black section backgrounds */
  variant?: "light" | "dark";
}

export function ProjectShowcase({
  projects = DEFAULT_PROJECTS,
  className,
  variant = "dark",
}: ProjectShowcaseProps) {
  const isDark = variant === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [containerRect, setContainerRect] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);

  const updateContainerRect = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setContainerRect({
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    });
  }, []);

  useEffect(() => {
    updateContainerRect();
    window.addEventListener("scroll", updateContainerRect, true);
    window.addEventListener("resize", updateContainerRect);
    return () => {
      window.removeEventListener("scroll", updateContainerRect, true);
      window.removeEventListener("resize", updateContainerRect);
    };
  }, [updateContainerRect]);

  useEffect(() => {
    const animate = () => {
      if (activeRef.current) {
        setSmoothPosition((prev) => ({
          x: lerp(prev.x, mouseTargetRef.current.x, 0.15),
          y: lerp(prev.y, mouseTargetRef.current.y, 0.15),
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseTargetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (index: number) => {
    activeRef.current = true;
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    activeRef.current = false;
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative mx-auto w-full max-w-2xl px-4 py-8 md:px-6 md:py-10",
        className
      )}
    >
      <div
        className="pointer-events-none fixed z-[100] hidden overflow-hidden rounded-xl shadow-2xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:block"
        style={{
          left: containerRect.left,
          top: containerRect.top,
          width: 280,
          height: 180,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0) scale(${isVisible ? 1 : 0.8})`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={cn(
            "relative h-[180px] w-[280px] overflow-hidden rounded-xl",
            isDark ? "bg-neutral-900" : "bg-neutral-100"
          )}
        >
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform:
                  hoveredIndex === index ? "scale(1)" : "scale(1.1)",
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t to-transparent",
              isDark ? "from-black/40" : "from-white/20"
            )}
          />
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.link}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
          >
            <div
              className={cn(
                "relative border-t py-5 transition-all duration-300 ease-out",
                isDark ? "border-neutral-800" : "border-neutral-200"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 -mx-4 scale-95 rounded-lg px-4 transition-all duration-300 ease-out",
                  isDark ? "bg-white/5" : "bg-neutral-100/80",
                  hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0"
                )}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2">
                    <h3
                      className={cn(
                        "text-lg font-medium tracking-tight",
                        isDark ? "text-neutral-100" : "text-neutral-900"
                      )}
                    >
                      <span className="relative">
                        {project.title}
                        <span
                          className={cn(
                            "absolute -bottom-0.5 left-0 h-px transition-all duration-300 ease-out",
                            isDark ? "bg-white" : "bg-neutral-900",
                            hoveredIndex === index ? "w-full" : "w-0"
                          )}
                        />
                      </span>
                    </h3>

                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 transition-all duration-300 ease-out",
                        isDark ? "text-neutral-400" : "text-neutral-500",
                        hoveredIndex === index
                          ? "translate-x-0 translate-y-0 opacity-100"
                          : "-translate-x-2 translate-y-2 opacity-0"
                      )}
                    />
                  </div>

                  <p
                    className={cn(
                      "mt-1 text-sm leading-relaxed transition-all duration-300 ease-out",
                      hoveredIndex === index
                        ? isDark
                          ? "text-neutral-300"
                          : "text-neutral-600"
                        : isDark
                          ? "text-neutral-500"
                          : "text-neutral-500"
                    )}
                  >
                    {project.description}
                  </p>
                </div>

                <span
                  className={cn(
                    "tabular-nums font-mono text-xs transition-all duration-300 ease-out",
                    isDark ? "text-neutral-500" : "text-neutral-500",
                    hoveredIndex === index &&
                      (isDark ? "text-neutral-300" : "text-neutral-700")
                  )}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </motion.a>
        ))}

        <div
          className={cn(
            "border-t",
            isDark ? "border-neutral-800" : "border-neutral-200"
          )}
        />
      </div>
    </div>
  );
}
