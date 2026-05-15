'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useReducedMotion } from 'motion/react';

export default function NavigationProgress() {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(false);

  function clearTimers() {
    if (startTimerRef.current) clearTimeout(startTimerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  function startProgress() {
    if (shouldReduce) return;
    clearTimers();
    // Defer setState — cannot schedule state updates during useInsertionEffect
    startTimerRef.current = setTimeout(() => {
      setVisible(true);
      setWidth(8);
      let current = 8;
      intervalRef.current = setInterval(() => {
        current = Math.min(current + Math.random() * 12, 85);
        setWidth(current);
      }, 250);
    }, 0);
  }

  function completeProgress() {
    clearTimers();
    setWidth(100);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 350);
  }

  useEffect(() => {
    const originalPush = window.history.pushState.bind(window.history);
    const originalReplace = window.history.replaceState.bind(window.history);

    window.history.pushState = (...args: Parameters<typeof window.history.pushState>) => {
      startProgress();
      return originalPush(...args);
    };
    window.history.replaceState = (...args: Parameters<typeof window.history.replaceState>) => {
      startProgress();
      return originalReplace(...args);
    };

    return () => {
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduce]);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    completeProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none"
    >
      <div
        className="h-full bg-neutral-900 transition-[width] duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
