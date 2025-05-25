import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Providers from "@/redux/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexendRegular = Lexend({
  variable: "--font-lexend-regular",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Ecommerce",
  description: "Boutique ecommerce liée à Nest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendRegular.variable} antialiased`}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
