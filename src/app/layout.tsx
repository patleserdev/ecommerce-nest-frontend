import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Providers from "@/redux/providers/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
<head>
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        const html = document.documentElement;
        html.classList.add('light');
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
      })();
    `,
  }}
/>

</head>
    
      <body className={`${lexendRegular.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
