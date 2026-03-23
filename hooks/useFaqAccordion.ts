'use client';
import { useState, useCallback } from 'react';

export function useFaqAccordion(defaultOpen = 0) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return { openIndex, toggle };
}
