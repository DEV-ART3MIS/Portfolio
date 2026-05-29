import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  onComplete: () => void;
};

const FULL_TEXT = "Sarwadnya Maile.";

export function SplashLoader({ onComplete }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect logic
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Wait a beat after typing finishes before triggering the exit transition
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 100); // 100ms per character for a premium, deliberate typing speed

    return () => clearInterval(typingInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-neutral-800"
        // The container slides UP and fades out when it unmounts
        initial={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="flex items-center px-6 text-[clamp(2.25rem,10vw,4.5rem)] font-medium tracking-tight text-white sm:px-0">
          <span>{displayedText}</span>
          <motion.span
            className="ml-1 inline-block h-[1em] w-[4px] bg-white align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: isTyping ? Infinity : 0,
              repeatType: "reverse",
              ease: "circInOut",
            }}
            // Keep the cursor visible but not blinking after typing finishes,
            // or we could hide it. Let's hide it when done.
            style={{ opacity: isTyping ? 1 : 0 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
