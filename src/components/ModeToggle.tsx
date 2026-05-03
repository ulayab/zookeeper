"use client";

import { useMode, type Mode } from "@/src/context/ModeContext";

const modeOptions: Array<{ mode: Mode; label: string; index: string }> = [
  { mode: "professional", label: "Notes", index: "01" },
  { mode: "human", label: "Sightings", index: "02" },
];

const activePosition: Record<Mode, string> = {
  professional: "translate-x-0",
  human: "translate-x-full",
};

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div
      className="relative grid w-[15rem] grid-cols-2 rounded-full border border-[rgb(var(--color-text-secondary)/0.7)] bg-[rgb(var(--color-text-secondary))] p-2 transition-colors duration-1000 ease-out"
      role="group"
      aria-label="Display mode"
    >
      <span
        className={[
          "absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full bg-[rgb(var(--color-bg-primary))] shadow-[0_8px_24px_rgb(var(--color-text-primary)/0.18)] transition-transform duration-500 ease-out",
          activePosition[mode],
        ].join(" ")}
        aria-hidden="true"
      />
      {modeOptions.map((option) => {
        const isActive = mode === option.mode;

        return (
          <button
            key={option.mode}
            type="button"
            aria-pressed={isActive}
            onClick={() => setMode(option.mode)}
            className={[
              "relative z-10 flex h-9 items-center justify-center gap-2 rounded-full px-5 text-base transition-colors duration-500",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isActive
                ? "text-[rgb(var(--color-text-secondary))]"
                : "text-[rgb(var(--color-bg-secondary))]",
            ].join(" ")}
          >
            <span className="font-mono">{option.label}</span>
            {/* <sup className="font-mono text-[0.52rem] leading-none">
              {option.index}
            </sup> */}
          </button>
        );
      })}
    </div>
  );
}
