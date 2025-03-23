import Image from "next/image";
import style from "./footer.module.css"
import { FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
const Footer = () => {
    return (
        <div className={style.main}>
            <div className={style.mainHolder}>
                {/* <div className={style.mainHolderOne}>
                    <div className={style.mainHolderOneheading}>
                        <h3>Get discount instantly____________</h3>
                    </div>
                    <div className={style.mainHolderOneSubHeading}>
                        <p>To save you just have to log you in our account and look for the experience with glanceme. On your first plane purchase you will get 10% discount</p>
                    </div>
                    <div className={style.mainHolderOneButton}>
                        <input type="email" placeholder="Enter Your Email"/>
                        <button>Get Started</button>
                    </div>
                </div> */}
                <div className={style.mainHolderTwo}>
                    <div className={style.mainHolderTwoLeft}>
                        <div className={style.mainHolderTwoLeftOne}>
                            <h4>Subscribe up for our newsletter</h4>
                            <p>Don’t worry we reserve our newsletter for an important news. so we only send few important update in a year.</p>
                            <button>Subscribe</button>
                        </div>  
                    </div>  
                    <div className={style.mainHolderTwoRight}>
                        <div className={style.mainHolderTwoRightOne}>

                            <div className={style.mainHolderTwoRightItem}>
                                <h4>Help and services</h4>
                                <Link href={"/faqs"} passHref><p>FAQs</p></Link>
                                <Link href={"/support"} passHref><p>Contact Us</p></Link>
                            </div>
                            <div className={style.mainHolderTwoRightItem}>
                                <h4>To Explore</h4>
                                <Link href={"/blog"} passHref><p>Blog</p></Link>
                                <Link href={"/privacy"} passHref><p>Privacy</p></Link>
                            </div>
                            <div className={style.mainHolderTwoRightItem}>
                                <h4>Tools</h4>
                                <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref><p>Chrome Extension</p></Link>
                                <p>Android App</p>
                            </div>
                        </div>
                        <div className={style.mainHolderTwoRightTwo}>
                            <Image src={"/images/appstore.png"} alt="app store" width={150} height={60} />
                            <Image src={"/images/playstore.png"} alt="play store" width={150} height={60} />
                        </div>
                    </div>

                </div>
                <div className={style.mainHolderthree}>
                    <hr />
                    <div className={style.mainHolderthreeItem}>
                    <div className={style.mainHolderthreeItemOne}>
                        <p>© 2025 Glanceme.Ai</p>
                        </div>
                        <div className={style.mainHolderthreeItemTwo}>
                        <Link href={"https://www.linkedin.com/company/glancemeai/"} passHref target="_blank"><p><FaLinkedin size={25} color="white"/></p></Link>
                        <Link href={"https://x.com/GlancemeAi"} passHref target="_blank"><p><FaXTwitter size={25} color="white"/></p></Link>
                        <Link href={"https://www.instagram.com/glancemeai/"} passHref target="_blank"><p><FaInstagramSquare size={25} color="white"/></p></Link>
                        <Link href={"https://www.facebook.com/glancemeai"} passHref target="_blank"><p><FaFacebook size={25} color="white"/></p></Link>
                        <Link href={"https://www.youtube.com/@Glancemeai"} passHref target="_blank"><p><FaYoutube size={25} color="white"/></p></Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;