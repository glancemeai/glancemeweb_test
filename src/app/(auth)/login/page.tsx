import Image from 'next/image'
import LoginContainer from '../Components/login/LoginContainer'
import styles from './page.module.css'
export default function LoginHome() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainOne}>
          <LoginContainer />
        </div>
        <div className={styles.mainTwo}>
          <div className={styles.mainTwoImage}>
            <Image src={"/images/login.jpg"} fill style={{ objectFit: "contain" }} alt='login' />
          </div>
        </div>
      </div>
    </>
  )
}
