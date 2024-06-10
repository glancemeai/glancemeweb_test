import Header from "../(portal)/component/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header></Header>
      {children}
    </section>
  );
}
