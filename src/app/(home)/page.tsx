"use client"
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BracketsCurlyIcon, GearSixIcon, GraduationCapIcon, RocketLaunchIcon, UsersThreeIcon, WarningCircleIcon, CircuitryIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
  <section>
  <main className="relative isolate flex w-full flex-col gap-10 overflow-hidden bg-background px-5 pb-20 pt-12 text-foreground sm:px-8 sm:pb-24 sm:pt-16 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-20 xl:px-16 2xl:px-24 dark:bg-[#0F090B] dark:text-white">
    <div className="pointer-events-none absolute left-10 top-24 z-0 hidden max-w-xs rounded-2xl border border-border/60 bg-card/90 p-4 font-mono text-[11px] leading-relaxed text-foreground/70 shadow-2xl backdrop-blur-md xl:block dark:border-white/10 dark:bg-black/40 dark:text-[#ffb3ad] animate-drift-slow">
      <pre>{`void autonomous_mode() {
  navigation.target(120, 45);
  while (!at_position()) {
    pid.update();
    drive.power(pid.output());
  }
}`}</pre>
    </div>
    <div className="pointer-events-none absolute right-12 top-40 z-0 hidden max-w-xs rounded-2xl border border-border/60 bg-card/90 p-4 font-mono text-[11px] leading-relaxed text-foreground/70 shadow-2xl backdrop-blur-md xl:block dark:border-white/10 dark:bg-black/40 dark:text-[#e5bdb9] animate-drift-gentle [animation-delay:-3s]">
      <pre>{`@Autonomous(name="PowerShot")
public class AutoShoot extends LinearOpMode {
  shooter.setVelocity(2400);
}`}</pre>
    </div>
    <div className="pointer-events-none absolute bottom-24 left-[18%] z-0 hidden rounded-full border border-[#E43437]/20 bg-card/95 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70 shadow-xl backdrop-blur-md lg:block dark:bg-black/45 dark:text-[#ffb3ad] animate-drift-gentle [animation-delay:-5s]">
      // code_stable
    </div>
    <div className="pointer-events-none absolute bottom-36 right-[20%] z-0 hidden rounded-full border border-[#E43437]/20 bg-card/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground shadow-xl backdrop-blur-md lg:block dark:bg-white/80 dark:text-black animate-drift-slow [animation-delay:-4s]">
      FTC 16075
    </div>
    <div className="pointer-events-none absolute left-20 top-[18%] z-0 h-28 w-28 rounded-full bg-[#E43437]/10 blur-3xl animate-drift-gentle" />
    <div className="pointer-events-none absolute bottom-[14%] right-[12%] z-0 h-36 w-36 rounded-full bg-[#E43437]/8 blur-[90px] animate-drift-slow [animation-delay:-6s]" />
    <div className="relative z-10 flex w-full flex-col justify-center lg:min-w-0 lg:flex-[1.12] lg:pl-6 xl:pl-10">
      <div className="flex w-full flex-col items-start gap-5 lg:max-w-2xl lg:gap-7">
        <div className="inline-flex max-w-full items-center gap-2 rounded-lg bg-[#E43437] px-3 py-2 text-white shadow-sm sm:gap-3">
          <RocketLaunchIcon className="h-5 w-5 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wide sm:text-sm">FIRST Tech Challenge guide</span>
        </div>
        <h1 className="text-[clamp(2.75rem,11vw,5rem)] uppercase leading-[0.95] text-foreground lg:text-7xl xl:text-8xl dark:text-white">
          <span>Croco</span>
          <span className="text-[#E43437] italic">Docs</span>
        </h1>
        <p className="max-w-xl text-base leading-snug text-foreground sm:text-xl lg:text-2xl xl:text-3xl dark:text-white">
          A practical, student-written guide to programming <span className="font-bold">FIRST</span> robots.
        </p>
        <blockquote className="max-w-xl border-l-4 border-border pl-4 text-sm text-muted-foreground sm:text-base dark:border-[#2f2a2a] dark:text-[#e5bdb9]/70">
          <p>Learn the fundamentals, compare FTC libraries, and find primary sources for the details that change from season to season.</p>
        </blockquote>
        <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full rounded-lg bg-[#ff4b44] px-8 text-base font-bold text-white shadow-[0_6px_0_0_rgba(120,20,18,0.85)] transition-transform hover:-translate-y-0.5 hover:bg-[#ff5a54] sm:w-auto">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full rounded-lg border-border bg-background px-8 text-base font-bold text-foreground hover:bg-muted sm:w-auto dark:border-[#222] dark:bg-transparent dark:text-white dark:hover:bg-white/5 dark:hover:text-white">
            <Link href="https://github.com/upsidedly/myFIRSTjournal" target="_blank" rel="noreferrer">
              View source
            </Link>
          </Button>
        </div>
      </div>
    </div>
    <div className="relative z-10 flex w-full items-center justify-center pb-4 sm:py-4 lg:min-w-0 lg:flex-[0.88] lg:pr-6 xl:pr-10">
      <div className="pointer-events-none absolute right-6 top-6 hidden opacity-20 sm:block">
        <GearSixIcon className="h-24 w-24 rotate-12 text-[#E43437]" />
      </div>
      <div className="pointer-events-none absolute bottom-10 left-4 hidden opacity-20 sm:block">
        <BracketsCurlyIcon className="h-16 w-16 -rotate-45 text-[#E43437]" />
      </div>

      <div className="relative w-full max-w-[25rem] sm:max-w-[32rem] motion-safe:lg:animate-card-float">
        <div className="absolute inset-0 hidden -translate-x-3 translate-y-3 rotate-[-4deg] rounded-3xl bg-[#E43437]/15 sm:block" />
        <div className="relative overflow-hidden rounded-3xl border border-[#E43437]/20 bg-gradient-to-br from-[#fff8f7] via-white to-[#ffe5e1] p-5 shadow-[0_20px_55px_rgba(80,15,17,0.17)] sm:p-8 dark:border-white/10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E43437]/15 blur-3xl" />
          <Image
            src="/crocodocs.svg"
            alt="CrocoDocs crocodile mascot emerging from an open book"
            width={679}
            height={571}
            priority
            className="relative mx-auto block h-auto w-full max-w-[28rem] drop-shadow-[0_18px_20px_rgba(80,15,17,0.18)]"
          />
          <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5a3333] sm:text-xs">
            <span>2026–27 season</span>
            <span>Team 16075</span>
          </div>
        </div>
      </div>
    </div>
    <div className="wave-bottom pointer-events-none z-20 text-[#FBF1F0] dark:text-[#131313]">
      <svg data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
        <path className="shape-fill" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
      </svg>
    </div>
  </main>

  <section className="relative bg-[#FBF1F0] py-16 text-foreground md:py-20 dark:bg-[#131313] dark:text-white">
    <div className="mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
      <div className="mb-10 flex flex-col gap-4 md:mb-12">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-primary"></div>
          <span className="font-mono text-sm uppercase tracking-[0.4em] text-primary">CORE PRINCIPLES</span>
        </div>
        <h2 className="max-w-4xl font-sans text-3xl uppercase leading-tight tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          ENGINEERED FOR <br />
          <span className="text-primary italic">MAXIMUM</span> PERFORMANCE.
        </h2>
        <div className="h-1.5 w-28 bg-primary"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl transition-all duration-500 hover:border-primary/30 sm:p-8 md:col-span-8 lg:min-h-[24rem] lg:p-10 dark:border-outline-variant/20 dark:bg-[#1C1B1B]">
          <div className="absolute -right-14 -top-14 p-8 opacity-[0.05] transition-opacity group-hover:opacity-[0.1]">
            <GraduationCapIcon className="h-48 w-48 text-[#ffb3ad] lg:h-56 lg:w-56" />
          </div>
          <div className="relative z-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110 lg:mb-8 lg:h-14 lg:w-14">
              <GraduationCapIcon className="h-6 w-6 text-primary lg:h-7 lg:w-7" />
            </div>
            <h3 className="mb-4 font-sans text-3xl uppercase tracking-tight text-foreground lg:mb-6">
              Accessible Learning
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Complex robotics concepts broken down into digestible, modular components. Designed specifically for rookie programmers and veteran leads alike.
            </p>
            <div className="mt-8 lg:mt-12">
              <Link href="/docs/getting-started" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary transition-all group-hover:gap-5">
                Read Documentation
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:col-span-4 md:gap-8">
          <div className="group rounded-3xl border border-border bg-card p-6 shadow-xl transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 lg:min-h-[12rem] lg:p-8 dark:border-outline-variant/20 dark:bg-[#1C1B1B]">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:rotate-12 lg:h-12 lg:w-12">
              <UsersThreeIcon className="h-5 w-5 text-primary lg:h-6 lg:w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-foreground lg:mb-3">
              Student-Created
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Notes and explanations written to help FTC students learn robotics programming.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-6 shadow-xl transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 lg:min-h-[12rem] lg:p-8 dark:border-outline-variant/20 dark:bg-[#1C1B1B]">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:rotate-12 lg:h-12 lg:w-12">
              <WarningCircleIcon className="h-5 w-5 text-primary lg:h-6 lg:w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-foreground lg:mb-3">
              Edge Cases
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Practical debugging notes sit alongside links to official APIs and references.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-2xl transition-all hover:border-primary/20 sm:p-8 md:col-span-12 lg:min-h-[20rem] lg:flex-row lg:gap-12 lg:p-10 dark:border-outline-variant/20 dark:bg-[#1C1B1B]">
          <div className="flex-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 lg:mb-6 lg:h-14 lg:w-14">
              <CircuitryIcon className="h-6 w-6 text-primary lg:h-7 lg:w-7" />
            </div>
            <h3 className="mb-3 font-sans text-3xl uppercase tracking-tight text-foreground lg:mb-4">
              Central Control Hub
            </h3>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              One single source of truth for your team's code standards, logic flows, and hardware integration maps. Built to sustain team knowledge across seasons.
            </p>
          </div>

          <div className="group w-full max-w-full overflow-x-auto rounded-3xl border border-border bg-[#0F090B] p-5 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary/40 sm:p-6 lg:min-h-[15rem] lg:w-[400px] lg:p-8 dark:border-outline-variant/40">
            <div className="mb-4 flex gap-2.5 lg:mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <pre className="font-mono text-xs leading-relaxed text-primary/90 transition-colors group-hover:text-primary lg:text-sm">{`{
 "system": "ACTIVE",
  "optimization": 0.98,
  "telemetry": "CONNECTED",
  "team": "16075",
  "status": "CHAMPIONSHIP_READY",
  "logs": [
    "PID_TUNE: STABLE",
    "CV_SCAN: DETECTED"
  ]
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
 <Footer/>
  
  </section>
  );
}
