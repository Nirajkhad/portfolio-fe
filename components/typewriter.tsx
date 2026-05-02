'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  readonly text: string;
  readonly speed?: number;
  readonly delay?: number;
  readonly className?: string;
  readonly cursor?: boolean;
}

export function Typewriter({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  cursor = true 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);

    // Initial delay before starting
    const delayTimeout = setTimeout(() => {
      setCurrentIndex(1);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [text, delay]);

  useEffect(() => {
    if (currentIndex === 0 || currentIndex > text.length) {
      if (currentIndex > text.length) {
        setIsComplete(true);
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <span className="animate-pulse text-[#4ade80]">|</span>
      )}
      {cursor && isComplete && (
        <span className="animate-blink text-[#4ade80]">|</span>
      )}
    </span>
  );
}
