import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adtlafrica.org"),
  title: {
    default: "ADTL Africa",
    template: "%s | ADTL Africa",
  },
  description:
    "Driving AI and digital transformation across Africa through practical systems, institutional partnerships, and capacity building.",
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
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-ink">
        {/* Auth provider intentionally disabled for now.
        <ClerkProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ClerkProvider>
        */}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
