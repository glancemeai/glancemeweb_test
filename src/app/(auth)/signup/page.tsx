import Image from 'next/image'
import SignupContainer from '../Components/signup/SignupContainer'
import styles from './page.module.css'
export default function SignupHome() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainOne}>
          <SignupContainer />
        </div>
        <div className={styles.mainTwo}>
          <div className={styles.mainTwoImageDesign1}>
            <Image src={"/images/signup/design1.svg"} quality={40} fill style={{ objectFit: "contain" }} alt='design' />
          </div>
          <div className={styles.mainTwoImage}>
            <Image src={"/images/signup/signup.png"} fill style={{ objectFit: "contain" }} alt='login' />
          </div>
          <div className={styles.mainTwoImageDesign2}>
            <Image src={"/images/signup/design2.svg"} quality={40} fill style={{ objectFit: "contain" }} alt='design' />
          </div>
        </div>
      </div>
    </>
  )
}
