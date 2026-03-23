'use client';
import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((action: string, category: string, label?: string) => {
    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag: (...args: unknown[]) => void }).gtag === 'function') {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  }, []);

  const trackPhoneClick = useCallback(() => {
    trackEvent('click', 'phone', 'cta');
  }, [trackEvent]);

  return { trackEvent, trackPhoneClick };
}
