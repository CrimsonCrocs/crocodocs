import { Wordmark } from '@/components/wordmark';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
        <div>
          <Wordmark size="large" />
          <p className="mt-2 text-xs text-muted-foreground">&copy; {new Date().getFullYear()} CrocoDocs</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 text-sm">
          <Link href="/docs/starter-guide" className="inline-flex min-h-11 items-center hover:text-primary">Starter Guide</Link>
          <Link href="/docs/engineering" className="inline-flex min-h-11 items-center hover:text-primary">Engineering</Link>
          <Link href="/docs" className="inline-flex min-h-11 items-center hover:text-primary">Programming</Link>
          <Link href="/docs/portfolio" className="inline-flex min-h-11 items-center hover:text-primary">Portfolio</Link>
          <a href="https://github.com/CrimsonCrocs/crocodocs" className="inline-flex min-h-11 items-center hover:text-primary" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/CrimsonCrocs/crocodocs/issues" className="inline-flex min-h-11 items-center hover:text-primary" target="_blank" rel="noreferrer">Report an issue</a>
          <a href="https://www.crimsoncrocs.org" className="inline-flex min-h-11 items-center hover:text-primary" target="_blank" rel="noreferrer">Crimson Crocs</a>
          <a href="https://ftc-docs.firstinspires.org/en/latest/programming_resources/index.html" className="inline-flex min-h-11 items-center hover:text-primary" target="_blank" rel="noreferrer">Official FTC resources</a>
        </nav>
      </div>
    </footer>
  );
}
