import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "P-CLINIC-ADMIN",
  description: "P-CLINIC-ADMIN",
  icons: "/icons/layout/p-clinic.png",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <html lang={params?.locale} suppressHydrationWarning={true} className="dark">
      <body
        className={cn(inter.className)}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
