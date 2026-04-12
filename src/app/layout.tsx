import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { hasClerk } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adtlafrica.org"),
  title: {
    default: "ADTL Africa",
    template: "%s | ADTL Africa",
  },
  description:
    "Driving AI and digital transformation across Africa through practical systems, institutional partnerships, and capacity building.",
  icons: {
    icon: "/ADTL AFRICA_LOGO.png",
    shortcut: "/ADTL AFRICA_LOGO.png",
    apple: "/ADTL AFRICA_LOGO.png",
  },
  openGraph: {
    title: "ADTL Africa",
    description:
      "Driving AI and digital transformation across Africa through practical systems, institutional partnerships, and capacity building.",
    type: "website",
    url: "https://adtlafrica.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-white text-ink" style={{ "fontFamily": "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" }}>
        <Providers clerkEnabled={hasClerk}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader clerkEnabled={hasClerk} />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
