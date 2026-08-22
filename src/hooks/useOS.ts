import { useEffect, useState } from 'react';

export type OS = 'macos' | 'windows' | 'linux';

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'linux';

  // Try modern userAgentData first
  const uad = (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData;
  if (uad?.platform) {
    const p = uad.platform.toLowerCase();
    if (p.includes('mac')) return 'macos';
    if (p.includes('win')) return 'windows';
    if (p.includes('linux') || p.includes('android')) return 'linux';
  }

  // Fallback to userAgent
  const ua = navigator.userAgent;
  const platform = navigator.platform || '';

  if (/Mac/.test(platform) || /Mac OS X/.test(ua)) return 'macos';
  if (/Win/.test(platform) || /Windows/.test(ua)) return 'windows';
  return 'linux';
}

export function useOS() {
  // SSR-safe: default to linux (neutral/common) then detect on mount
  const [os, setOS] = useState<OS>('linux');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOS(detectOS());
    setMounted(true);
  }, []);

  return { os, setOS, mounted };
}
