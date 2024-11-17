import styles from './page.module.css'
import HomeOne from './home/HomeOne'
import HomeTwo from './home/HomeTwo'
import HomeThree from './home/HomeThree'
import HomeFour from './home/HomeFour'
import HomeFive from './home/HomeFive'

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeOne/>
      <HomeTwo/>
      <HomeThree />
      <HomeFour />
      <HomeFive/>
    </main>
  )
}
