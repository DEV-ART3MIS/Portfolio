import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export interface TextScrambleProps {
  text: string;
  className?: string;
}

export function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = text.length * 3;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * text.length);

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedLength) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  }, [text]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className={cn(
        "group relative inline-flex cursor-pointer select-none flex-col",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative font-mono text-lg uppercase tracking-widest text-inherit">
        {displayText.split("").map((char, i) => (
          <span
            key={i}
            className={cn(
              "inline-block transition-all duration-150",
              isScrambling && char !== text[i]
                ? "scale-110 text-amber-400"
                : "text-inherit"
            )}
            style={{
              transitionDelay: `${i * 10}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </span>

      <span className="relative mt-2 h-px w-full overflow-hidden">
        <span
          className={cn(
            "absolute inset-0 origin-left bg-white transition-transform duration-500 ease-out",
            isHovering ? "scale-x-100" : "scale-x-0"
          )}
        />
        <span className="absolute inset-0 bg-white/15" />
      </span>

      <span
        className={cn(
          "absolute -inset-4 -z-10 rounded-lg bg-amber-400/10 transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
