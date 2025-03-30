import styles from './page.module.css'
import Header from './home/header/header'
import Section_one from './home/section_one/section_one'
import Section_two from './home/section_two/section_two'
import Section_three from './home/section_three/section_three'
import Section_Five from './home/section_five/section_five'
import Section_Four from './home/section_four/section_four'
import StaticPrice from './home/price/price'

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
