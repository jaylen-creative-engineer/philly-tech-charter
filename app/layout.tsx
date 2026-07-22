import type { Metadata } from "next";
import { Archivo, DM_Sans, Pinyon_Script } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
});

export const metadata: Metadata = {
  title: "Philadelphia Declaration 250",
  description:
    "A living document written in Philadelphia on the occasion of America's 250th year, establishing a collective intention for how we integrate AI and technology with culture.",
  openGraph: {
    title: "Philadelphia Declaration 250",
    description: "A gift to America. A design for what comes next.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmSans.variable} ${pinyonScript.variable}`}>
      <body>{children}</body>
    </html>
  );
}
