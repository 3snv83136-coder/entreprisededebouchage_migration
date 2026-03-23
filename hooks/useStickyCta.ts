'use client';
import { useState, useEffect } from 'react';

export function useStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    function onScroll() {
      const current = window.scrollY;
      if (current > 400) {
        setVisible(current < lastScroll || current > 600);
      } else {
        setVisible(false);
      }
      lastScroll = current;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible;
}
