'use client';

import { ArrowUpRight, Play } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { playgroundExamples, playgroundUrl, type PlaygroundExampleId } from '@/lib/playground-examples';

export function FTCPlayground({ example }: { example: PlaygroundExampleId }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lesson = playgroundExamples[example];
  const theme = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';
  const url = playgroundUrl(lesson, theme);

  return (
    <div className="ftc-playground not-prose">
      <div className="ftc-playground-heading">
        <div><Play size={16} weight="fill" aria-hidden="true" /><span>{lesson.title}</span></div>
        <a href={url} target="_blank" rel="noopener noreferrer">Open example<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> in a new tab</span></a>
      </div>
      {mounted ? <iframe
        src={url}
        title={`FTC playground: ${lesson.title}`}
        width="100%"
        height="600"
        loading="lazy"
        allow="fullscreen; gamepad"
        allowFullScreen
      /> : <div className="ftc-playground-placeholder" aria-hidden="true" />}
      <p className="ftc-playground-note">Edit the example, then press Play. Reloading this page or changing theme restores the example.</p>
    </div>
  );
}
