import { useEffect, useState } from "react";

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
  "Problem Solver",
] as const;

const TYPE_MS = 52;
const DELETE_MS = 38;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

export function useTypingRoles() {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseUntil = 0;
    let typeTimer: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;

    const step = () => {
      const now = performance.now();
      const phrase = ROLES[phraseIndex];

      if (now < pauseUntil) {
        raf = requestAnimationFrame(step);
        return;
      }

      if (!deleting) {
        if (charIndex < phrase.length) {
          charIndex++;
          setText(phrase.slice(0, charIndex));
          typeTimer = setTimeout(step, TYPE_MS);
          return;
        }
        pauseUntil = now + PAUSE_AFTER_TYPE;
        deleting = true;
        raf = requestAnimationFrame(step);
        return;
      }

      if (charIndex > 0) {
        charIndex--;
        setText(phrase.slice(0, charIndex));
        typeTimer = setTimeout(step, DELETE_MS);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % ROLES.length;
      pauseUntil = now + PAUSE_AFTER_DELETE;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      if (typeTimer) clearTimeout(typeTimer);
    };
  }, []);

  return text;
}
