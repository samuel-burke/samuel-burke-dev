import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · ${site.role}`,
  description:
    "Samuel Burke is a full-stack engineer and founder of Burke Systems. He built ShiftView, a scheduling and time-clock app for retail and fulfillment teams.",
  openGraph: { title: site.name, description: `${site.role}. Builder of ShiftView.`, url: site.url, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-ui focus:bg-white focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
