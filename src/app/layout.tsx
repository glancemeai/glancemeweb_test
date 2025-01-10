import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Alert from "./components/utils/alert/alert";
import Providers from "./redux/provider/provider";
import Footer from "./home/footer/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const ubuntu = Ubuntu({ weight:['300','400','500','700'],subsets:['cyrillic','latin'] });

export const metadata: Metadata = {
  title: "Glanceme.Ai",
  description: "Glanceme.Ai Save notes Generate videos summary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={ubuntu.className}>
      <Providers>
        {children}
        <section>
          <Alert />
        </section>
        <Footer/>
        </Providers>
        <SpeedInsights />
        </body>
    </html>
  );
}
