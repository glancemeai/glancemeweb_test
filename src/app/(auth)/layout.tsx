import Header from "../home/header/header";
import { Headerstatic } from "../home_v1/HomeOne";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header/>
      {children}
    </section>
  );
}
