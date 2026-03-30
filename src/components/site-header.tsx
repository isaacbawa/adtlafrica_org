import Link from "next/link";
import { navItems } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3" aria-label="ADTL Africa Home">
          <div className="h-8 w-8 rounded-sm bg-brand-primary" />
          <div>
            <p className="text-xl font-semibold tracking-wide text-ink">ADTL</p>
            <p className="text-xs text-muted">AI & Digital Transformative Lab</p>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-medium text-ink">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-brand-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
