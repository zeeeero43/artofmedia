import React, { useEffect, useState, useRef } from "react";
import { randomChar } from "../../lib/utils";
import { motion } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className, 
  delay = 0, 
  speed = 50 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    timeout = setTimeout(() => {
      startedRef.current = true;
      let iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return randomChar();
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsFinished(true);
        }

        iteration += 1 / 3; // Slow down the reveal
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || (startedRef.current ? "" : " ")} 
      {/* Blinking cursor effect while animating */}
      {!isFinished && <span className="animate-pulse text-brand">_</span>}
    </motion.span>
  );
};