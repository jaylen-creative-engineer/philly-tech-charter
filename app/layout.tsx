import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Philadelphia Declaration — 250",
  description:
    "A living document written in Philadelphia on the occasion of America's 250th year — establishing a collective intention for how we integrate AI and technology with culture.",
  openGraph: {
    title: "Philadelphia Declaration — 250",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
