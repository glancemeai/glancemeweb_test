// SignupHome.tsx or page.tsx
import Image from 'next/image'
import SignupContainer from '../Components/signup/SignupContainer'
import styles from './page.module.css'
import { BsStars } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaInstagramSquare, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';

export default function SignupHome() {
  return (
    <>
      <div className={styles.container}>
        {/* Background effects similar to contact page */}
        {/* <div className={styles.contactHeaderWrapper}>
          <div className={`${styles.headerContainer} ${styles.visible}`}>
            
          <span className={styles.starsIcon}><BsStars size={40} color='blue' /></span>
            <h1 className={styles.titleAnimation}>Hello</h1>
            <div className={styles.subtitleWrapper}>
              <h2 className={styles.subtitleAnimation}>buddy</h2>
            </div>
          </div>
          <div className={`${styles.sentenceContainer} ${styles.visible}`}>
            Join the <span className={styles.highlightedKeyword}>largest</span> community
          </div>
        </div> */}

        <div className={`${styles.signupWrapper} ${styles.visible}`}>
          {/* Left section with gradient background (like contact info section) */}
          <div className={styles.signupInfo}>
            <div className={styles.circleOverlay1}></div>
            <div className={styles.circleOverlay}></div>
            
            <h2>Welcome to Glanceme.Ai</h2>
            
            <div className={styles.signupDetails}>
              <div className={styles.signupItem}>
                <span className={styles.icon}>🚀</span>
                <span>Join our growing community</span>
              </div>
              <div className={styles.signupItem}>
                <span className={styles.icon}>🔒</span>
                <span>Secure and private</span>
              </div>
              <div className={styles.signupItem}>
                <span className={styles.icon}>💡</span>
                <span>Access to exclusive features</span>
              </div>
            </div>
            
            <div className={styles.socialIcons}>
            <Link href={"https://www.linkedin.com/company/glancemeai/"} passHref target="_blank"><p><FaLinkedin size={25} color="white" /></p></Link>
                            <Link href={"https://x.com/GlancemeAi"} passHref target="_blank"><p><FaXTwitter size={25} color="white" /></p></Link>
                            <Link href={"https://www.instagram.com/glancemeai/"} passHref target="_blank"><p><FaInstagramSquare size={25} color="white" /></p></Link>
                            <Link href={"https://www.facebook.com/glancemeai"} passHref target="_blank"><p><FaFacebook size={25} color="white" /></p></Link>
                            <Link href={"https://www.youtube.com/@Glancemeai"} passHref target="_blank"><p><FaYoutube size={25} color="white" /></p></Link>
            </div>
          </div>
          
          {/* Right section with signup form */}
          <div className={styles.signupForm}>
            <SignupContainer />
          </div>
        </div>
      </div>
    </>
  )
}