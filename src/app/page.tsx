import styles from './page.module.css'
import HomeOne from './component/HomeOne'
import HomeTwo from './component/HomeTwo'
import HomeThree from './component/HomeThree'
import HomeFour from './component/HomeFour'

export default function Home() {
  return (
    <main className={styles.main}>
       <HomeOne/>
       <HomeTwo/>
       <HomeThree />
       <HomeFour />
       
    </main>
  )
}
