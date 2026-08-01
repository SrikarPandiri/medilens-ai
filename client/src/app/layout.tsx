import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediLens AI",
  description: "Understand your health reports, instantly."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

