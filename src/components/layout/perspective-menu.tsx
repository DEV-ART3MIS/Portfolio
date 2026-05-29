import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/* ── Navigation links ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/DEV-ART3MIS" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sarwadnya-maile" },
  { label: "Email", href: "mailto:Sarwadnyam@gmail.com" },
] as const;

/* ── Animation config ─────────────────────────────────────────────────── */
const EASE = [0.76, 0, 0.24, 1] as const; // cubic-bezier for premium feel
const DURATION = 0.9;

/** Page tilt when menu is open (3D perspective card effect) */
const PAGE_OPEN_DESKTOP = {
  scale: 0.58,
  x: "42vw",
  rotateY: -15,
  borderRadius: "2rem",
};

const PAGE_OPEN_MOBILE = {
  scale: 0.8,
  x: "15vw",
  rotateY: -8,
  borderRadius: "1.5rem",
};

const PAGE_CLOSED = {
  scale: 1,
  x: "0vw",
  rotateY: 0,
  borderRadius: "0rem",
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function PerspectiveMenu({ isOpen, onClose, children }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [scrollPos, setScrollPos] = useState(0);

  const pageOpenState = isMobile ? PAGE_OPEN_MOBILE : PAGE_OPEN_DESKTOP;

  /* Lock body scroll when menu is open */
  useEffect(() => {
    if (isOpen) {
      setScrollPos(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleNavClick = useCallback(
    (href: string) => {
      onClose();
      // small delay to let menu close animation start before scrolling
      if (href !== "#") {
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 750);
      }
    },
    [onClose]
  );

  return (
    <div
      className="relative min-h-[100dvh] w-full"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
    >
      {/* ═══ Menu background layer (behind the page) ══════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[-1] bg-neutral-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION * 0.5, ease: EASE }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 opacity-[0.25] grayscale-[0.5]"
              style={{
                backgroundImage: "url('/images/abstract-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Menu content */}
            <div className="relative flex h-full w-full flex-col">
              {/* Close button (top-left) */}
              <header className="flex items-center px-[clamp(1.5rem,5vw,3rem)] py-[clamp(1.25rem,4vw,2rem)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex cursor-pointer items-center gap-[0.65rem] border-0 bg-transparent p-0 font-[inherit] text-white opacity-90 transition-opacity hover:opacity-100"
                  aria-label="Close menu"
                >
                  <motion.span
                    className="text-[clamp(1rem,1.8vw,1.25rem)] font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    ✕
                  </motion.span>
                  <motion.span
                    className="text-[clamp(0.875rem,1.5vw,1rem)] tracking-[0.02em]"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    Close
                  </motion.span>
                </button>
              </header>

              {/* Nav links + image layout */}
              <div className="flex flex-1 items-start gap-0 overflow-hidden">
                {/* Left: Nav links */}
                <nav className="flex flex-1 flex-col justify-center px-[clamp(1.5rem,5vw,3rem)] py-12">
                  <ul className="list-none space-y-1 p-0">
                    {NAV_LINKS.map((link, i) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{
                          duration: 0.7,
                          ease: EASE,
                          delay: 0.15 + i * 0.06,
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className="group inline-block py-2 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white/90 no-underline transition-all duration-300 hover:text-white hover:translate-x-2"
                        >
                          {link.label}
                          <span className="ml-3 inline-block h-[2px] w-0 translate-y-[-0.15em] bg-white/60 transition-all duration-500 group-hover:w-8" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Social links */}
                  <motion.div
                    className="mt-auto flex gap-6 pt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[clamp(0.8rem,1.2vw,0.95rem)] text-white/40 no-underline transition-colors duration-300 hover:text-white/80"
                      >
                        {social.label}
                      </a>
                    ))}
                  </motion.div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Page content (tilts into a "card" when menu opens) ════════ */}
      <motion.div
        className="relative z-10 min-h-[100dvh] w-full bg-neutral-950"
        style={{
          transformOrigin: `50vw calc(50vh + ${scrollPos}px)`,
          transformStyle: "preserve-3d",
          boxShadow: isOpen
            ? "-30px 0 80px -10px rgba(0,0,0,0.5), 0 30px 60px -10px rgba(0,0,0,0.4)"
            : "none",
        }}
        animate={isOpen ? pageOpenState : PAGE_CLOSED}
        transition={{
          duration: DURATION,
          ease: EASE,
        }}
      >
        {/* Click-away overlay */}


        {/* Clicking the tilted page closes the menu */}
        {isOpen && (
          <div
            className="absolute inset-0 z-[9998] cursor-pointer rounded-[inherit]"
            onClick={onClose}
            aria-label="Close menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onClose();
            }}
          />
        )}

        {children}
      </motion.div>
    </div>
  );
}
