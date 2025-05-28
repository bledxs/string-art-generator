import { useEffect } from 'react';

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitorear performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          const fiEntry = entry as PerformanceEventTiming;
          console.log('FID:', fiEntry.processingStart - fiEntry.startTime);
        }
      }
    });

    observer.observe({
      entryTypes: ['largest-contentful-paint', 'first-input'],
    });

    return () => observer.disconnect();
  }, []);
};
