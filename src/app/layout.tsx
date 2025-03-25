import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Winnow Management Solutions",
  description:
    "Streamline your anti-money laundering processes with cutting-edge solutions. Stay compliant, reduce risks, and protect your business.",
  icons: {
    icon: "./favicon.ico",
  },
  keywords: ["AML", "Compliance Consultancy", "Risk Management", "UAE"],
  authors: [
    { name: "Winnow Management Solutions", url: "https://winnowms.com" },
  ],
  openGraph: {
    title: "Winnow Management Solutions",
    description:
      "Expert guidance in anti-money laundering compliance and risk management.",
    url: "https://winnowms.com",
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: "Winnow Management Solutions Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Winnow Management Solutions",
    description: "Your partner in AML compliance and risk management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
