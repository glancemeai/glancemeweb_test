import styles from './page.module.css'
import HomeOne from './home/HomeOne'
import HomeTwo from './home/HomeTwo'
import HomeThree from './component/HomeThree'
import HomeFour from './home/HomeFour'

export default function Home() {
  return (
    <main className={styles.main}>
       <HomeOne/>
       <HomeTwo/>
       {/* <HomeThree /> */}
       <HomeFour />
       
    </main>
  )
}
