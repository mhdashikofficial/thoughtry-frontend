import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thoughtry | Your Voice, Your Revenue",
  description: "A premium blogging platform where writers earn 70% of ad revenue.",
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
