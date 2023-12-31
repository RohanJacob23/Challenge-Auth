import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ModeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";

const noto_sans = Noto_Sans({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="absolute top-3 right-3 md:top-10 md:right-10">
            <ModeToggle />
          </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
