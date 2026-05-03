import type { Metadata } from "next";
import Script from "next/script";
import { ModeProvider } from "@/src/context/ModeContext";
import "./globals.css";

const modeInitScript = `
(() => {
  try {
    const storedMode = window.localStorage.getItem("zookeeper:mode");
    const mode = storedMode === "human" ? "human" : "professional";
    document.documentElement.dataset.mode = mode;
  } catch {
    document.documentElement.dataset.mode = "professional";
  }
})();
`;

export const metadata: Metadata = {
  title: "Zookeeper.dev",
  description:
    "A focused portfolio for frontend engineering craft, product thinking, and personal notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode="professional"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full bg-bg-primary text-text-primary">
        <Script
          id="zookeeper-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: modeInitScript }}
        />
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
