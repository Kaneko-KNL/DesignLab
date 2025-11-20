import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignLab",
  description: "AI-Driven Design System Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
