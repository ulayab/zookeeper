"use client";

import Link from "next/link";
import { ModeToggle } from "@/src/components/ModeToggle";
import { useMode, type Mode } from "@/src/context/ModeContext";

const profileCopy: Record<Mode, { label: string; body: string }> = {
  professional: {
    label: "Notes",
    body: "Frontend engineer and product-minded builder. Thrives on collaboration and exploring the web's curiosities. Solves everyday problems with code and a constant stream of fresh ideas.",
  },
  human: {
    label: "Sightings",
    body: "Espresso enthusiast exploring the world of coffee beans. Animal lover and keeper of a 35cm nano planted tank. Loves story-rich games, though admittedly better at enjoying the plot than actually playing them.",
  },
};

export default function Home() {
  const { mode } = useMode();
  const titleSuffix = mode === "professional" ? "Technical Blog" : "Personal Life";
  const profile = profileCopy[mode];

  return (
    <main className="min-h-screen bg-bg-primary px-6 py-8 text-text-primary transition-colors duration-1000 ease-out sm:px-10 lg:px-16">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col">
        <header className="flex flex-col gap-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-[0.24em] text-text-secondary no-underline"
          >
            Zookeeper.dev // {titleSuffix}
          </Link>
          <ModeToggle />
        </header>

        <hr />

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1fr_18rem] lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent">
              Frontend Engineer / Product-Minded Builder
            </p>
            <h3 className="font-display text-5xl font-semibold leading-[0.96] tracking-[var(--tracking-display)] text-text-primary sm:text-7xl lg:text-8xl">
              I build interfaces that feel precise, calm, and alive.
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl sm:leading-9">
              Managing complex codebases and capturing life&apos;s sightings.
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl sm:leading-9">
              content
            </p>
          </div>

          <aside className="border-y border-border py-6 transition-colors duration-1000 ease-out">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
              About / {profile.label}
            </p>

            <div className="grid gap-6">
              <div
                className="grid aspect-square w-36 place-items-center rounded-full border border-border bg-bg-secondary shadow-[var(--surface-shadow)] transition-colors duration-1000 ease-out"
                aria-label="Profile image placeholder"
              >
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
                  Portrait
                </span>
              </div>
              <p className="text-base leading-7 text-text-secondary">
                {profile.body}
              </p>
            </div>
          </aside>
        </div>

        <hr />

        <footer className="flex flex-col gap-3 py-6 font-mono text-xs uppercase tracking-[0.22em] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Available for frontend roles</span>
          <span>Welcome all feedback</span>
        </footer>
      </section>
    </main>
  );
}
