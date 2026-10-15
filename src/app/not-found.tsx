import { HomeLayout } from "fumadocs-ui/layouts/home";
import Link from "next/link";
import { baseOptions } from "./layout.config";

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions}>
      <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5 py-16 text-center">
        <h1 className="text-7xl">
          404
        </h1>
        <h2 className="text-3xl">
          Page not found
        </h2>
        <Link
          className="brand-button"
          href="/"
        >
          Go back home
        </Link>
      </main>
    </HomeLayout>
  );
}
