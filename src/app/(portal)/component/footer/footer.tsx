
import Link from "next/link";
import styles from "./footer.module.css"
import { AiOutlineMail } from "react-icons/ai"
import { BsMedium,  BsLinkedin, BsTwitter,  } from "react-icons/bs"
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    return (
        <div className={styles.main}>
            <div className={styles.mainFooterBottom}>
                <p>Copyright © 2024 Roten.x DevTool, Inc. All rights reserved to Anshit Mishra.</p>
                <div className={styles.mainFooterBottomSocials}>
                    <Link href={"https://medium.com/@anshit.03"} target="_blank" passHref><p><BsMedium size={25} /></p></Link>
                    <Link href={"https://github.com/anshitmishra"} target="_blank" passHref><p><FaGithub size={25} /></p></Link>
                    <Link href={"https://www.linkedin.com/in/anshit-mishra-172b33237/"} target="_blank" passHref><p><BsLinkedin size={20} /></p></Link>
                    <Link href={"https://x.com/Anshit_3"} target="_blank" passHref><p><BsTwitter size={20} /></p></Link>
                    <Link href={"mailto:anshitmishra03@gmail.com"} target="_blank" passHref><p><AiOutlineMail size={20} /></p></Link>
                </div>
            </div>
        </div>
    )

}

export default Footer