// Login page component
import Image from 'next/image'
import LoginContainer from '../Components/login/LoginContainer'
import styles from './page.module.css'
import { FaFacebook, FaInstagram, FaInstagramSquare, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'

export default function LoginHome() {
  return (
    <div className={styles.container}>
      {/* Background elements */}
      
      <div className={styles.signupWrapper}>
        {/* Left side - Info section with gradient */}
        <div className={styles.signupInfo}>
          <h2>Welcome to Glanceme.Ai</h2>
          
          <div className={styles.signupDetails}>
            <div className={styles.signupItem}>
              <span className={styles.icon}>🚀</span>
              <span>Join our growing community</span>
            </div>
            
            <div className={styles.signupItem}>+
              <span className={styles.icon}>🔒</span>
              <span>Secure and private</span>
            </div>
            
            <div className={styles.signupItem}>
              <span className={styles.icon}>💡</span>
              <span>Access to exclusive features</span>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className={styles.circleOverlay1}></div>
          <div className={styles.circleOverlay}></div>
          
          {/* Social icons if needed */}
          <div className={styles.socialIcons}>
          <Link href={"https://www.linkedin.com/company/glancemeai/"} passHref target="_blank"><p><FaLinkedin size={25} color="white" /></p></Link>
                            <Link href={"https://x.com/GlancemeAi"} passHref target="_blank"><p><FaXTwitter size={25} color="white" /></p></Link>
                            <Link href={"https://www.instagram.com/glancemeai/"} passHref target="_blank"><p><FaInstagramSquare size={25} color="white" /></p></Link>
                            <Link href={"https://www.facebook.com/glancemeai"} passHref target="_blank"><p><FaFacebook size={25} color="white" /></p></Link>
                            <Link href={"https://www.youtube.com/@Glancemeai"} passHref target="_blank"><p><FaYoutube size={25} color="white" /></p></Link>
          </div>
        </div>
        
        {/* Right side - Form section */}
        <div className={styles.signupForm}>
          <LoginContainer />
        </div>
      </div>
    </div>
  )
}