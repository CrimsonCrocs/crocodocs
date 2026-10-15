'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { BracketsCurly, GearSix, List, Notebook, X } from '@phosphor-icons/react';
import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import { Navbar } from 'fumadocs-ui/layouts/docs';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarPageTree, SidebarViewport } from 'fumadocs-ui/components/layout/sidebar';
import { SearchTrigger, ThemeSwitch } from '@/components/header-controls';
import { Wordmark } from '@/components/wordmark';

export function DocsHeader() {
  const pathname = usePathname();
  const engineering = pathname.startsWith('/docs/engineering');
  const portfolio = pathname.startsWith('/docs/portfolio');
  const { open, setOpen } = useSidebar();

  return (
    <Navbar className="docs-header">
      <div className="docs-header-main">
        <Link href="/" aria-label="CrocoDocs home" className="docs-brand"><Wordmark size="large" /></Link>
        <SearchTrigger />
        <div className="docs-header-actions">
          <ThemeSwitch />
          <button id="docs-menu-trigger" type="button" className="docs-menu-button" aria-label="Open navigation" aria-expanded={open} aria-controls="nd-sidebar-mobile" onClick={() => setOpen(!open)}>
            <List size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav className="docs-sections" aria-label="Documentation sections">
        <Link href="/docs" aria-current={!engineering && !portfolio ? 'location' : undefined} onClick={() => setOpen(false)}><BracketsCurly weight="duotone" size={20} aria-hidden="true" />Programming</Link>
        <Link href="/docs/engineering" aria-current={engineering ? 'location' : undefined} onClick={() => setOpen(false)}><GearSix weight="duotone" size={20} aria-hidden="true" />Engineering</Link>
        <Link href="/docs/portfolio" aria-current={portfolio ? 'location' : undefined} onClick={() => setOpen(false)}><Notebook weight="duotone" size={20} aria-hidden="true" />Portfolio</Link>
      </nav>
    </Navbar>
  );
}

export function DocsSidebar() {
  const { open, setOpen } = useSidebar();
  useEffect(() => {
    if (!open) return;
    const background = document.querySelectorAll<HTMLElement>('#nd-subnav, .docs-article, #nd-toc, #nd-tocnav');
    const previousOverflow = document.body.style.overflow;
    background.forEach(element => { element.inert = true; });
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => document.getElementById('docs-menu-close')?.focus());
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll<HTMLElement>('#nd-sidebar-mobile a[href], #nd-sidebar-mobile button')].filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(focusFrame);
      desktop.removeEventListener('change', closeOnDesktop);
      background.forEach(element => { element.inert = false; });
      document.body.style.overflow = previousOverflow;
      document.getElementById(desktop.matches ? 'main-content' : 'docs-menu-trigger')?.focus();
    };
  }, [open, setOpen]);
  return (
    <Sidebar collapsible={false} className="docs-sidebar" aria-label="Article navigation" role={open ? 'dialog' : undefined} aria-modal={open || undefined}>
      <SidebarHeader className="docs-mobile-sidebar-header">
        <span className="font-semibold">Documentation</span>
        <button id="docs-menu-close" type="button" aria-label="Close navigation" onClick={() => {
          setOpen(false);
          document.getElementById('docs-menu-trigger')?.focus();
        }}><X size={20} aria-hidden="true" /></button>
      </SidebarHeader>
      <SidebarViewport><SidebarPageTree /></SidebarViewport>
      <SidebarFooter className="docs-mobile-sidebar-footer"><span>Appearance</span><ThemeSwitch /></SidebarFooter>
    </Sidebar>
  );
}
