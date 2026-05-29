import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "@/hooks/use-media-query";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkillItem {
  id: string;
  /** SVG icon URL (devicon CDN, etc.) */
  image: string;
  title: string;
  /** Brand background colour — when set the card renders in icon mode */
  bg: string;
}

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200";

// ─── ProjectCard ──────────────────────────────────────────────────────────────

interface ProjectCardProps {
  image: string;
  bg: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  totalCount: number;
  onClick: () => void;
  isSelected: boolean;
  isMobile?: boolean; // Mobile-specific sizing
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, bg, title, delay, isVisible, index, totalCount, onClick, isSelected, isMobile }, ref) => {
    const middleIndex = (totalCount - 1) / 2;
    const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;
    const rotation = factor * (isMobile ? 20 : 25);
    const translationX = factor * (isMobile ? 60 : 85);
    const translationY = Math.abs(factor) * (isMobile ? 8 : 12);
    const translateY = isMobile ? -80 : -100;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute cursor-pointer group/card",
          isMobile ? "w-16 h-24" : "w-20 h-28",
          isSelected && "opacity-0"
        )}
        style={{
          transform: isVisible
            ? `translateY(calc(${translateY}px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          zIndex: 10 + index,
          left: isMobile ? "-32px" : "-40px",
          top: isMobile ? "-48px" : "-56px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div
          className="w-full h-full rounded-lg overflow-hidden shadow-xl border border-white/20 relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:scale-125"
          style={{ background: bg }}
        >
          {/* Icon centred, no cover-crop */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 m-auto w-10 h-10 object-contain drop-shadow-lg"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -60%)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
          {/* Subtle bottom fade so the title is readable */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[8px] font-black uppercase tracking-tighter text-white truncate drop-shadow-md">
            {title}
          </p>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

// ─── ImageLightbox ────────────────────────────────────────────────────────────

interface ImageLightboxProps {
  skills: SkillItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  sourceRect: DOMRect | null;
  onCloseComplete?: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  skills,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}) => {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">(
    "initial"
  );
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = skills.length;
  const hasNext = internalIndex < total - 1;
  const hasPrev = internalIndex > 0;
  const current = skills[internalIndex];

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      setIsSliding(true);
      const t = setTimeout(() => {
        setInternalIndex(currentIndex);
        setIsSliding(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [currentIndex, isOpen, internalIndex, isSliding]);

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex);
      setIsSliding(false);
    }
  }, [isOpen, currentIndex]);

  const navigateNext = useCallback(() => {
    if (internalIndex >= total - 1 || isSliding) return;
    onNavigate(internalIndex + 1);
  }, [internalIndex, total, isSliding, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return;
    onNavigate(internalIndex - 1);
  }, [internalIndex, isSliding, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      setAnimationPhase("initial");
      onCloseComplete?.();
    }, 500);
  }, [onClose, onCloseComplete]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
    };
    window.addEventListener("keydown", onKey);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, navigateNext, navigatePrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true);
      setAnimationPhase("initial");
      setIsClosing(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimationPhase("animating"))
      );
      const t = setTimeout(() => setAnimationPhase("complete"), 700);
      return () => clearTimeout(t);
    }
  }, [isOpen, sourceRect]);

  if (!shouldRender || !current) return null;

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tw = Math.min(480, vw - 64);
    const th = Math.min(vh * 0.6, 400);
    const tx = (vw - tw) / 2;
    const ty = (vh - th) / 2;
    const scale = Math.max(sourceRect.width / tw, sourceRect.height / th);
    return {
      transform: `translate(${
        sourceRect.left + sourceRect.width / 2 - (tx + tw / 2) + window.scrollX
      }px, ${
        sourceRect.top + sourceRect.height / 2 - (ty + th / 2) + window.scrollY
      }px) scale(${scale})`,
      opacity: 0.5,
      borderRadius: "12px",
    };
  };

  const finalStyles: React.CSSProperties = {
    transform: "translate(0,0) scale(1)",
    opacity: 1,
    borderRadius: "24px",
  };

  const currentStyles =
    animationPhase === "initial" && !isClosing ? getInitialStyles() : finalStyles;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-2xl"
        style={{
          opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
          transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <button
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-30px)",
          transition: "opacity 400ms ease-out 400ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 400ms",
        }}
      >
        <X className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
        disabled={!hasPrev || isSliding}
        className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 600ms",
        }}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={3} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); navigateNext(); }}
        disabled={!hasNext || isSliding}
        className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 600ms",
        }}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={3} />
      </button>

      {/* Lightbox card */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing ? "translate(0,0) scale(0.92)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease-out, border-radius 700ms ease",
          transformOrigin: "center center",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[inherit] border border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]"
          style={{ background: current?.bg ?? "#1e1e1e" }}
        >
          {/* Icon display */}
          <div className="flex items-center justify-center" style={{ height: "240px" }}>
            <div
              className="flex w-full h-full transition-transform duration-500"
              style={{
                transform: `translateX(-${internalIndex * 100}%)`,
                transition: isSliding ? "transform 500ms cubic-bezier(0.16,1,0.3,1)" : "none",
              }}
            >
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="min-w-full h-full flex items-center justify-center"
                  style={{ background: skill.bg }}
                >
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className="w-24 h-24 object-contain drop-shadow-2xl select-none"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-5 bg-black/30 backdrop-blur-sm border-t border-white/10"
            style={{
              opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
              transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 500ms ease-out 500ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 500ms",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{current?.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-1 px-2 py-0.5 bg-white/10 rounded-full">
                    {skills.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => !isSliding && idx !== internalIndex && onNavigate(idx)}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-500",
                          idx === internalIndex ? "bg-white scale-150" : "bg-white/30 hover:bg-white/60"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/40 font-mono">
                    {internalIndex + 1}/{total}
                  </span>
                </div>
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-black bg-white hover:brightness-90 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Info <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── AnimatedFolder ───────────────────────────────────────────────────────────

export interface AnimatedFolderProps {
  title: string;
  skills: SkillItem[];
  className?: string;
  gradient?: string;
}

export const AnimatedFolder: React.FC<AnimatedFolderProps> = ({
  title,
  skills,
  className,
  gradient,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const preview = skills.slice(0, 5);

  const handleClick = (skill: SkillItem, index: number) => {
    const el = cardRefs.current[index];
    if (el) setSourceRect(el.getBoundingClientRect());
    setSelectedIndex(index);
    setHiddenCardId(skill.id);
  };

  const backBg =
    gradient || "linear-gradient(135deg, var(--folder-back) 0%, var(--folder-tab) 100%)";
  const tabBg = gradient || "var(--folder-tab)";
  const frontBg =
    gradient || "linear-gradient(135deg, var(--folder-front) 0%, var(--folder-back) 100%)";

  const accentColor = gradient?.match(/#[a-fA-F0-9]{3,6}/)?.[0] ?? "transparent";

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer md:p-6",
          "bg-card border border-border",
          "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:shadow-2xl",
          className
        )}
        style={{
          minWidth: isMobile ? "140px" : "180px",
          minHeight: isMobile ? "200px" : "260px",
          perspective: "1200px",
          transform: isHovered ? "scale(1.04) rotate(-1.5deg)" : "scale(1) rotate(0deg)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 70%, ${accentColor} 0%, transparent 70%)`,
            opacity: isHovered ? 0.18 : 0,
          }}
        />

        {/* Folder 3-D shape */}
        <div
          className="relative flex items-center justify-center mb-3"
          style={{ height: "130px", width: "170px" }}
        >
          {/* Back */}
          <div
            className="absolute w-28 h-20 rounded-lg shadow-md border border-white/10"
            style={{
              background: backBg,
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-20deg) scaleY(1.05)" : "rotateX(0deg) scaleY(1)",
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
              zIndex: 10,
            }}
          />
          {/* Tab */}
          <div
            className="absolute w-10 h-3.5 rounded-t-md border-t border-x border-white/10"
            style={{
              background: tabBg,
              top: "calc(50% - 40px - 10px)",
              left: "calc(50% - 56px + 14px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-30deg) translateY(-3px)" : "rotateX(0deg)",
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
              zIndex: 10,
            }}
          />

          {/* Skills fan */}
          <div
            className="absolute"
            style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 20 }}
          >
            {preview.map((skill, i) => (
              <ProjectCard
                key={skill.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                image={skill.image}
                bg={skill.bg}
                title={skill.title}
                delay={i * 50}
                isVisible={isHovered}
                index={i}
                totalCount={preview.length}
                onClick={() => handleClick(skill, i)}
                isSelected={hiddenCardId === skill.id}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Front */}
          <div
            className="absolute w-28 h-20 rounded-lg shadow-lg border border-white/20"
            style={{
              background: frontBg,
              top: "calc(50% - 40px + 4px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg)",
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
              zIndex: 30,
            }}
          />
          {/* Glare */}
          <div
            className="absolute w-28 h-20 rounded-lg overflow-hidden pointer-events-none"
            style={{
              top: "calc(50% - 40px + 4px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg)",
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
              zIndex: 31,
            }}
          />
        </div>

        {/* Labels */}
        <div className="text-center">
          <h3
            className="text-sm font-bold text-foreground mt-2 transition-all duration-500"
            style={{ transform: isHovered ? "translateY(2px)" : "translateY(0)" }}
          >
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {skills.length} {skills.length === 1 ? "skill" : "skills"}
          </p>
        </div>

        <p
          className="absolute bottom-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 transition-all duration-500 md:block"
          style={{
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? "translateY(8px)" : "translateY(0)",
          }}
        >
          {isMobile ? "Tap" : "Hover"}
        </p>
      </div>

      <ImageLightbox
        skills={skills}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={() => { setSelectedIndex(null); setSourceRect(null); }}
        sourceRect={sourceRect}
        onCloseComplete={() => setHiddenCardId(null)}
        onNavigate={(i) => {
          setSelectedIndex(i);
          setHiddenCardId(skills[i]?.id ?? null);
        }}
      />
    </>
  );
};
