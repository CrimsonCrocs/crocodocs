import Footer from '@/components/footer';
import { ArrowRight, BracketsCurly, CompassTool, GearSix, GithubLogo, Notebook } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <main id="main-content" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="home-hero" aria-labelledby="home-title">
          <div>
            <h1 id="home-title" className="croc-display">Croco<wbr /><span className="text-primary">Docs</span></h1>
            <p className="max-w-xl text-xl leading-relaxed sm:text-2xl">
              Engineering, programming, and portfolios for <em>FIRST</em> Tech Challenge.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Build your first robot, improve a mechanism, or work through the code
              that controls it. Document your season and prepare for judging.
              Practical guides by Crimson Crocs, FTC Team 16075, for new and
              experienced teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/docs/starter-guide" className="brand-button">
                Get started <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="https://github.com/CrimsonCrocs/crocodocs" className="inline-flex size-11 items-center justify-center self-center rounded-full text-muted-foreground transition-colors hover:text-foreground" target="_blank" rel="noreferrer" aria-label="View CrocoDocs on GitHub">
                <GithubLogo size={28} weight="fill" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="home-art mx-auto w-full max-w-sm">
            <Image
              src="/crocodocs.svg"
              alt="CrocoDocs crocodile reading an open book"
              width={679}
              height={571}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        <section className="home-starter" aria-labelledby="starter-home-title">
          <CompassTool size={36} weight="duotone" aria-hidden="true" />
          <div><p className="home-starter-label">New to FTC?</p><h2 id="starter-home-title">Rookie season</h2><p>What you need to get a team running and a robot ready for competition.</p></div>
          <Link href="/docs/starter-guide">Open the Starter Guide <ArrowRight size={18} aria-hidden="true" /></Link>
        </section>
        <section className="grid gap-6 pb-16 md:grid-cols-2 md:pb-24 lg:grid-cols-3" aria-label="Handbook sections">
          <div className="home-guide">
            <GearSix size={36} weight="duotone" className="text-primary" aria-hidden="true" />
            <h2 className="text-3xl">Engineering</h2>
            <p>
              Design, build, and test an FTC robot. Learn mechanical fundamentals,
              choose mechanisms, and make parts that fit together.
            </p>
            <Link href="/docs/engineering" className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
              Explore Engineering <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <div className="home-guide-links flex flex-wrap gap-x-6 text-sm">
              <Link href="/docs/engineering/first-build">Your first build</Link>
              <Link href="/docs/engineering/mechanisms/drivetrains">Drivetrains</Link>
              <Link href="/docs/engineering/design/cad">CAD</Link>
            </div>
          </div>
          <div className="home-guide">
            <BracketsCurly size={36} weight="duotone" className="text-primary" aria-hidden="true" />
            <h2 className="text-3xl">Programming</h2>
            <p>
              Set up your tools, control your hardware, and build reliable robot
              software. Work through autonomous movement, feedback control, and vision.
            </p>
            <Link href="/docs" className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
              Explore Programming <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <div className="home-guide-links flex flex-wrap gap-x-6 text-sm">
              <Link href="/docs/getting-started">Getting started</Link>
              <Link href="/docs/libraries">Libraries</Link>
              <Link href="/docs/cegp">Code organization</Link>
            </div>
          </div>
          <div className="home-guide md:col-span-2 lg:col-span-1">
            <Notebook size={36} weight="duotone" className="text-primary" aria-hidden="true" />
            <h2 className="text-3xl">Portfolio</h2>
            <p>
              Write about your robot, team, and outreach. Plan your pages,
              prepare for judging, and learn from four Inspire portfolios.
            </p>
            <Link href="/docs/portfolio" className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
              Explore Portfolio <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <div className="home-guide-links flex flex-wrap gap-x-6 text-sm">
              <Link href="/docs/portfolio/awards-and-inspire">Awards and Inspire</Link>
              <Link href="/docs/portfolio/planning">Planning</Link>
              <Link href="/docs/portfolio/case-studies">Case studies</Link>
            </div>
          </div>
        </section>
        <section aria-label="Crimson Crocs Software Collection" className="flex flex-col items-start gap-6 pb-16 md:flex-row md:items-center md:gap-12 md:pb-20">
          <Image
            src="/brand/crimson-crocs-collection.png"
            alt="Crimson Crocs — Crocs Collection"
            width={2172}
            height={497}
            sizes="(max-width: 512px) calc(100vw - 40px), 448px"
            className="h-auto w-full max-w-md rounded-xl"
          />
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            CrocoDocs is part of the{' '}
            <strong className="font-semibold text-foreground">Crimson Crocs Software Collection</strong>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
