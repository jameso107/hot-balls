import type { Metadata } from "next";
import { Inter, Oxanium } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "../lib/site";
import "./globals.css";

const headingFont = Oxanium({ subsets: ["latin"], weight: ["600", "700"] });
const bodyFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hot Balls Golf Ball Warmer Sack | Winter Distance Starts Here",
  description:
    "Keep your golf balls warm in cold weather with the Hot Balls insulated warming sack. Designed for 3 balls and heat pads so you can keep distance, launch, and feel through winter rounds.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Hot Balls Golf Ball Warmer Sack",
    description:
      "A golf-themed one-page site built to help winter golfers keep their balls warm and hit with confidence.",
    url: SITE_URL,
    siteName: "Hot Balls",
    images: [
      {
        url: "/og-hot-balls.svg",
        width: 1200,
        height: 630,
        alt: "Hot Balls golf ball warmer sack on a green fairway background"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Balls Golf Ball Warmer Sack",
    description: "Golf ball warming sack for cold weather golf performance.",
    images: ["/og-hot-balls.svg"]
  },
  keywords: [
    "golf ball warmer",
    "golf ball warming sack",
    "hot golf balls cold weather",
    "winter golf distance",
    "golf gift for men",
    "golf gifts for golfers"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.className} ${bodyFont.className}`}>
        {children}
        <Script id="etsy-click-tracking" strategy="afterInteractive">
          {`
            window.addEventListener("click", function onClick(event) {
              const target = event.target instanceof Element ? event.target.closest("a[data-etsy-cta='true']") : null;
              if (!target) return;
              if (typeof window.gtag === "function") {
                window.gtag("event", "click_outbound_etsy", {
                  event_category: "conversion",
                  event_label: target.getAttribute("data-cta-label") || "etsy_cta",
                  transport_type: "beacon"
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
