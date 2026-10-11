import Image from "next/image";

const Footer = () => {
  return (
     <footer className="relative w-full overflow-hidden border-t border-border bg-background px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute bottom-0 right-0 h-full w-full bg-primary/[0.03] blur-[120px] sm:w-1/2"></div>
        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16 lg:gap-20">
        <div className="flex max-w-sm flex-col gap-6 sm:gap-8">
        <div className="flex items-center gap-3 sm:gap-4">
        <Image src="/crocodocs.svg" alt="CrocoDocs" width={50} height={50} className="h-[1.8em] w-auto shrink-0" />
        <span className="font-sans text-2xl tracking-tighter text-foreground sm:text-3xl">CROCO<span className="text-primary italic">DOCS</span></span>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                            Student-written programming notes for FIRST Tech Challenge teams.
                        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            &copy; {new Date().getFullYear()} CrocoDocs · FTC Team 16075
                        </p>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14 lg:gap-20"> 
        <div className="flex flex-col gap-5 sm:gap-6">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground">RESOURCES</span>
        <a className="text-sm font-bold uppercase text-muted-foreground transition-all hover:text-primary" href="https://github.com/upsidedly/myFIRSTjournal" target="_blank" rel="noreferrer">GitHub repository</a>
        <a className="text-sm font-bold uppercase text-muted-foreground transition-all hover:text-primary" href="/docs">Documentation</a>
        <a className="text-sm font-bold uppercase text-muted-foreground transition-all hover:text-primary" href="https://ftc-resources.firstinspires.org/ftc/programming" target="_blank" rel="noreferrer">Official FTC resources</a>
        </div>
        <div className="flex flex-col gap-5 sm:gap-6">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground">THE TEAM</span>
        <a className="text-sm font-bold uppercase text-muted-foreground transition-all hover:text-primary" href="/docs">About CrocoDocs</a>
        <a className="text-sm font-bold uppercase text-muted-foreground transition-all hover:text-primary" href="https://github.com/upsidedly/myFIRSTjournal/issues" target="_blank" rel="noreferrer">Report an issue</a>
        </div>
        </div>
        </div>
        </footer>
  );
};

export default Footer;
