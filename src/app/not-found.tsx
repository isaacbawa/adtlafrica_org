import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold text-ink">Page not found</h1>
      <p className="mt-4 text-base text-muted">The page you requested does not exist or has been moved.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-sm bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-strong"
      >
        Return Home
      </Link>
    </main>
  );
}
