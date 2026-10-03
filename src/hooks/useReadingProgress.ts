import { useEffect, useState, RefObject } from 'react';

export function useReadingProgress(targetRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = targetRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const currentScroll = window.scrollY;

      const totalScrollable = elementHeight - viewportHeight;
      if (totalScrollable <= 0) {
        setProgress(100);
        setIsCompleted(true);
        return;
      }

      const relativeScroll = currentScroll - elementTop;
      const calculatedPercent = Math.min(
        100,
        Math.max(0, Math.round((relativeScroll / totalScrollable) * 100))
      );

      setProgress(calculatedPercent);
      if (calculatedPercent >= 92) {
        setIsCompleted(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return { progress, isCompleted };
}
