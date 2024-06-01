

import { BsFacebook, BsGithub, BsGoogle, BsLinkedin } from "react-icons/bs"
import styles from "./SocialLogin.module.css"
export default function SocialLogin() {
    return (
        <div className={styles.main}>
            <div className={styles.mainItem}>
                <BsFacebook size={20}/>
            </div>
            <div className={styles.mainItem}>
                <BsLinkedin size={20}/>
            </div>
            <div className={styles.mainItem}>
                <BsGoogle size={20}/>
            </div>
            <div className={styles.mainItem}>
                <BsGithub size={20}/>
            </div>
        </div>
    )
}
