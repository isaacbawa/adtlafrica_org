import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">ADTL Africa</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Driving AI and digital transformation across Africa through practical systems, partnerships,
            and capacity building.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            <li>Mr. Barfour Frimpong - Operations & Relations</li>
            <li>+233 592 413 228</li>
            <li>info@adtlafrica.org</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/services" className="text-ink hover:text-brand-primary">
                Services
              </Link>
            </li>
            <li>
              <Link href="/partnership" className="text-ink hover:text-brand-primary">
                Partnership
              </Link>
            </li>
            <li>
              <Link href="/career" className="text-ink hover:text-brand-primary">
                Career
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        {new Date().getFullYear()} ADTL Africa. All rights reserved.
      </div>
    </footer>
  );
}
