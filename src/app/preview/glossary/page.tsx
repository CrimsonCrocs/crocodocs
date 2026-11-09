import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GlossaryTerm } from '@/components/glossary-term';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Glossary interaction preview',
  robots: { index: false, follow: false },
};

export default function GlossaryPreview() {
  if (process.env.VERCEL_ENV === 'production') notFound();

  return (
    <main id="main-content" className="mx-auto w-full max-w-2xl px-6 py-12">
      <p className="mb-3 text-sm text-muted-foreground">Interaction preview · sample text</p>
      <h1 className="mb-4 text-2xl font-semibold">Definitions while you read</h1>
      <p className="mb-10 leading-7">Hover over an underlined term, focus it with Tab, or tap it. Move into the popup to keep reading. Close it with Escape, its close button, a second tap, or a tap outside.</p>
      <article className="space-y-8 leading-8">
        <p>An <GlossaryTerm term="OpMode" definition="One selectable FTC robot program." href="/docs/starter-guide/glossary">OpMode</GlossaryTerm> controls your robot. Later mentions of OpMode stay plain.</p>
        <p>A <GlossaryTerm term="Servo" definition="An actuator commonly commanded by position, or by speed in continuous-rotation mode." href="/docs/starter-guide/glossary">servo</GlossaryTerm> can move a mechanism. Try opening this definition after the first one.</p>
        <p>A <GlossaryTerm term="Program Delivery Partner" definition="The organization that runs FIRST programs in a country or region." href="/docs/starter-guide/glossary">Program Delivery Partner</GlossaryTerm> helps run the program locally. This longer term checks wrapping on a narrow screen.</p>
        <p>Code such as <code>servo.setPosition(0.5)</code>, existing links, and words without a glossary definition stay unchanged.</p>
      </article>
      <p className="mt-12 text-sm"><Link className="underline" href="/docs/starter-guide/first-program">Try the real lesson</Link></p>
    </main>
  );
}
