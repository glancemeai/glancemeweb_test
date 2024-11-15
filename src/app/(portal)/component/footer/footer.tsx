
import Link from "next/link";
import styles from "./footer.module.css"
import { AiOutlineMail } from "react-icons/ai"
import { BsMedium,  BsLinkedin, BsTwitter,  } from "react-icons/bs"
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    return (
        <div className={styles.main}>
            <div className={styles.mainFooterBottom}>
                <p>Copyright © 2024 Glanceme AI Pvt. Ltd. All Rights reserved to Glanceme.Ai</p>
                <div className={styles.mainFooterBottomSocials}>
                    <Link href={"#"} target="_blank" passHref><p><BsMedium size={25} /></p></Link>
                    <Link href={"#"} target="_blank" passHref><p><BsLinkedin size={20} /></p></Link>
                    <Link href={"#"} target="_blank" passHref><p><BsTwitter size={20} /></p></Link>
                    <Link href={"mailto:support@glanceme.ai"} target="_blank" passHref><p><AiOutlineMail size={20} /></p></Link>
                </div>
            </div>
        </div>
    )

}

export default Footer