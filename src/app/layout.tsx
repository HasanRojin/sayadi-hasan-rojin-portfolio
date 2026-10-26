import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://rojin-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sayadi Hasan Rojin | Mechatronics Engineer & Roblox Developer",
  description:
    "Mechatronics Engineer & Roblox Game Developer crafting immersive 3D worlds, precision hardware, and custom electronics — from CAD, CNC & PCBs to playable Roblox universes.",
  keywords: [
    "Sayadi Hasan Rojin",
    "Mechatronics Engineer",
    "Roblox Developer",
    "Blender",
    "SolidWorks",
    "Arduino",
    "ESP32",
    "3D Artist",
  ],
  authors: [{ name: "Sayadi Hasan Rojin" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Sayadi Hasan Rojin | Mechatronics Engineer & Roblox Developer",
    description:
      "Mechatronics Engineer & Roblox Game Developer crafting immersive 3D worlds, precision hardware, and custom electronics — from CAD, CNC & PCBs to playable Roblox universes.",
    type: "website",
    url: SITE_URL,
    siteName: "Sayadi Hasan Rojin — Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sayadi Hasan Rojin — Mechatronics Engineer, Roblox Developer & 3D Artist portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayadi Hasan Rojin | Mechatronics Engineer & Roblox Developer",
    description:
      "Mechatronics Engineer & Roblox Game Developer crafting immersive 3D worlds, precision hardware, and custom electronics.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05030a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased bg-[#05030a] text-slate-200">
        {children}
      </body>
    </html>
  );
}
