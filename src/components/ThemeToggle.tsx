"use client";

export default function ThemeToggle() {
  function toggle() {
    // classList.toggle returns true if "dark" was just added, false if removed
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light"); // remember the choice
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className="rounded border border-brand-gray/30 px-3 py-1 text-sm text-brand-gray transition hover:border-brand-cyan hover:text-brand-cyan">
      {/* In light mode show "Dark"; in dark mode show "Light" */}
      <span className="dark:hidden">☾ Dark</span>
      <span className="hidden dark:inline">☀ Light</span>
    </button>
  );
}
