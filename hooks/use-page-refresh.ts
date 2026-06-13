'use client';

import { useEffect, useState } from 'react';

export function usePageRefresh() {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setRefresh((c) => c + 1);
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  return refresh;
}
