'use client';

import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface GlossaryTermProps {
  term: string;
  definition: string;
  href?: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ term, definition, href, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mode = useRef<'hover' | 'focus' | 'press'>('hover');
  const restoreFocus = useRef(false);
  const ignoreFocus = useRef(false);
  const keyboardActivation = useRef(false);

  function cancelClose() {
    clearTimeout(closeTimer.current);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function leave(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || mode.current !== 'hover') return;
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={trigger}
          type="button"
          className="glossary-term"
          aria-describedby={open ? `${id}-definition` : undefined}
          onPointerEnter={event => {
            if (event.pointerType !== 'mouse') return;
            cancelClose();
            if (!open) mode.current = 'hover';
            setOpen(true);
          }}
          onPointerLeave={leave}
          onFocus={event => {
            if (!ignoreFocus.current && event.currentTarget.matches(':focus-visible')) {
              mode.current = 'focus';
              setOpen(true);
            }
          }}
          onClick={event => {
            event.preventDefault();
            cancelClose();
            if (open && mode.current === 'press') {
              setOpen(false);
            } else {
              mode.current = 'press';
              keyboardActivation.current = event.detail === 0;
              setOpen(true);
              if (content.current && keyboardActivation.current) {
                content.current.focus();
                keyboardActivation.current = false;
              }
            }
          }}
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        ref={content}
        className="glossary-popup"
        side="bottom"
        align="start"
        sideOffset={6}
        collisionPadding={12}
        aria-label={term}
        aria-describedby={`${id}-definition`}
        onOpenAutoFocus={event => {
          event.preventDefault();
          if (keyboardActivation.current) content.current?.focus();
          keyboardActivation.current = false;
        }}
        onCloseAutoFocus={event => {
          event.preventDefault();
          if (restoreFocus.current) {
            ignoreFocus.current = true;
            trigger.current?.focus();
            ignoreFocus.current = false;
          }
          restoreFocus.current = false;
        }}
        onEscapeKeyDown={() => { restoreFocus.current = true; }}
        onPointerEnter={cancelClose}
        onPointerLeave={leave}
      >
        <div className="glossary-popup-heading">
          <strong>{term}</strong>
          <button type="button" className="glossary-close" aria-label={`Close definition of ${term}`} onClick={() => {
            restoreFocus.current = true;
            setOpen(false);
          }}>×</button>
        </div>
        <p id={`${id}-definition`}>{definition}</p>
        {href && <Link href={href} className="glossary-reference" onClick={() => setOpen(false)}>
          {href.includes('/glossary') ? 'Open glossary' : 'Read more'}
        </Link>}
      </PopoverContent>
    </Popover>
  );
}
