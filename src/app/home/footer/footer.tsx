import Image from "next/image";
import style from "./footer.module.css"
import { FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderOne}>
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
                </div>
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
                                <p>How does it work</p>
                                <p>FAQs</p>
                                <p>Contacts</p>
                            </div>
                            <div className={style.mainHolderTwoRightItem}>
                                <h4>To Explore</h4>
                                <p>Blogs</p>
                                <p>Docs</p>
                                <p>Privacy</p>
                            </div>
                            <div className={style.mainHolderTwoRightItem}>
                                <h4>Tools</h4>
                                <p>Extension</p>
                                <p>App</p>
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
                        <p><FaFacebook size={25} color="white"/></p>
                        <p><FaInstagramSquare size={25} color="white"/></p>
                        <p><FaLinkedin size={25} color="white"/></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;