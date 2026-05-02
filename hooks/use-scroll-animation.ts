'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      console.log('❌ Element not found');
      return;
    }

    console.log('✅ Setting up observer for:', element.id);

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(`📊 ${element.id} - Intersecting: ${entry.isIntersecting}, Ratio: ${entry.intersectionRatio.toFixed(2)}`);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          console.log(`🎬 Animating ${element.id}`);
          setIsVisible(true);
          // Once visible, stop observing
          observer.unobserve(element);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -200px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
