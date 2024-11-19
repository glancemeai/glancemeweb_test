import { Headerstatic } from "../home/HomeOne";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Headerstatic/>
      {children}
    </section>
  );
}
