import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // CHANGED: Geist -> Outfit
import "./globals.css";

const outfit = Outfit({ // CHANGED: Geist -> Outfit
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instituto Sobre'Viver",
  description: "Cuidamos de pessoas que enfrentam doenças graves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
