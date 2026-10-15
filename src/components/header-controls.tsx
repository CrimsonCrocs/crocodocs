'use client';

import { MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/wordmark';

export function SearchTrigger({ className = '' }: { className?: string }) {
  const { setOpenSearch, hotKey } = useSearchContext();

  return (
    <button type="button" className={`docs-search ${className}`} onClick={() => setOpenSearch(true)} aria-label="Search documentation">
      <MagnifyingGlass size={17} aria-hidden="true" />
      <span>Search…</span>
      <kbd aria-hidden="true">{hotKey.map((key, index) => <span key={index}>{key.display}</span>)}</kbd>
    </button>
  );
}

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === 'dark';

  return (
    <button type="button" className="theme-switch" data-theme-toggle="" role="switch" aria-label="Dark theme" aria-checked={dark} onClick={() => setTheme(dark ? 'light' : 'dark')}>
      <span className="theme-switch-track" aria-hidden="true">
        <span className="theme-switch-thumb">
          <Sun className="theme-switch-sun" size={16} weight="fill" />
          <Moon className="theme-switch-moon" size={15} weight="fill" />
        </span>
      </span>
    </button>
  );
}

export function HomeHeader() {
  return (
    <header id="nd-nav" className="home-header">
      <Link href="/" aria-label="CrocoDocs home"><Wordmark size="large" /></Link>
      <div className="home-header-actions"><SearchTrigger /><ThemeSwitch /></div>
    </header>
  );
}
