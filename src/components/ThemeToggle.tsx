"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  // resolvedTheme is "dark" or "light", even when following the device setting
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark mode"
      className="rounded border border-brand-gray/30 px-3 py-1 text-sm text-brand-gray transition hover:border-brand-cyan hover:text-brand-cyan"
    >
      {/* CSS shows the right label, which avoids a flash on load */}
      <span className="dark:hidden">☾ Dark</span>
      <span className="hidden dark:inline">☀ Light</span>
    </button>
  );
}