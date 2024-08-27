import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./reset.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Products Online - Shop the Latest Deals | Your Store Name",
  description: "Discover top-rated products at the best prices. Shop now and enjoy fast, reliable delivery. Find electronics, fashion, and more with ease.",
  keywords: "online shopping, best products, ecommerce, deals, buy online, electronics, fashion, shopping cart",
  applicationName: "Your Store Name",
  openGraph: {
    title: "Best Products Online - Shop the Latest Deals | Your Store Name",
    description: "Find the best products and add them to your cart for seamless shopping. Enjoy the latest deals on electronics, fashion, and more.",
    url: "greyball",
    type: "website",
    images: [
      {
        url: "greyball",
        width: 1200,
        height: 630,
        alt: "Your Store Name - Best Products Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Products Online - Shop the Latest Deals | Your Store Name",
    description: "Shop the latest deals on top-rated products. Fast delivery, easy checkout, and great prices!",
    images: [
      {
        url: "greyball",
        alt: "Your Store Name - Best Products Online",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow",
  alternates: {
    canonical: "greyball",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}