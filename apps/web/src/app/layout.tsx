import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "News Web MVP",
  description: "Latest news from around the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
