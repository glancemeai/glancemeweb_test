import Sidemenu from "./component/sidemenu/sidemenu";
import style from "./layout.module.css"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={style.main}>
      <div className={style.mainOne}>
        <Sidemenu/>
      </div>
      <div className={style.mainTwo}>
        {children}
      </div>
    </section>
  );
}
