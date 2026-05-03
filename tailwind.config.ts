import type { Config } from "tailwindcss";

const withOpacity =
  (variableName: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `rgb(var(${variableName}))`
      : `rgb(var(${variableName}) / ${opacityValue})`;

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: withOpacity("--color-accent"),
        "accent-soft": withOpacity("--color-accent-soft"),
        border: withOpacity("--color-border"),
        rule: withOpacity("--color-rule"),
        "bg-primary": withOpacity("--color-bg-primary"),
        "bg-secondary": withOpacity("--color-bg-secondary"),
        "bg-muted": withOpacity("--color-bg-muted"),
        "text-primary": withOpacity("--color-text-primary"),
        "text-secondary": withOpacity("--color-text-secondary"),
        "text-muted": withOpacity("--color-text-muted"),
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        surface: "var(--surface-shadow)",
      },
    },
  },
} satisfies Config;

export default config;
