import styles from './page.module.css'
import Header from "./header/header"
import Section_one from './section_one/section_one'
import Section_two from './section_two/section_two'
import Section_three from './section_three/section_three'
import Section_Five from './section_five/section_five'
import Section_Four from './section_four/section_four'
import StaticPrice from './price/price'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header></Header>
      <Section_one></Section_one>
      <Section_two></Section_two>
      <Section_three ></Section_three>
      <StaticPrice />
      <Section_Four></Section_Four>
      {/* <Section_Five/> */}
      {/* <HomeOne/>
      <HomeTwo/>
      <HomeThree />
      <HomeFour />
      <HomeFive/> */}
    </main>
  )
}
