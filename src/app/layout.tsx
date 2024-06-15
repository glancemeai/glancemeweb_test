import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Alert from "./components/utils/alert/alert";
import Providers from "./redux/provider/provider";
import Footer from "./(portal)/component/footer/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roten.X DevTool",
  description: "Roten.x DevTool Save notes Generate videos summary.",
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
      <body className={inter.className}>
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
