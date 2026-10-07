import Link from "next/link";

export default function NotFound() { 
  return (
    <main className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="text-7xl font-bold text-cyan-text">404</p>
      <span className="mx-auto mt-4 block h-1 w-14 bg-brand-red" />
      <h1 className="mt-6 text-2xl font-semibold">This road ends here</h1>
      <p className="mt-2 text-muted">The page or vehicle you are looking for is not available.</p>
      <Link href="/inventory" className="mt-8 inline-block rounded bg-brand-cyan px-6 py-3 font-semibold text-brand-black transition hover:brightness-110">
        Back to inventory
      </Link>
    </main>
  );
}