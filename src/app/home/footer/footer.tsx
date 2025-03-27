"use client"
import Image from "next/image";
import style from "./footer.module.css";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useState } from "react";

const Footer = () => {
    const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);
    const [showSubscribePopup, setShowSubscribePopup] = useState(false);
    const [email, setEmail] = useState("");

    const handleAppStoreClick = () => {
        setShowComingSoonPopup(true);
    };

    const handlePlayStoreClick = () => {
        setShowComingSoonPopup(true);
    };

    const handleSubscribeButtonClick = () => {
        setShowSubscribePopup(true);
    };

    const handleClosePopup = () => {
        setShowComingSoonPopup(false);
        setShowSubscribePopup(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubscribeSubmit = () => {
        // In a real application, you would send this email to your backend
        console.log("Subscribed with email:", email);
        alert(`Thank you for subscribing with: ${email}!`); // Replace with your actual logic
        handleClosePopup();
    };

    return (
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderTwo}>
                    <div className={style.mainHolderTwoLeft}>
                        <div className={style.mainHolderTwoLeftOne}>
                            <h4>Subscribe up for our newsletter</h4>
                            <p>Dont worry we reserve our newsletter for an important news. so we only send few important update in a year.</p>
                            <button onClick={handleSubscribeButtonClick} className={style.subscribeButton}>Subscribe</button>
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
                            <div className={style.appStoreLogo} onClick={handleAppStoreClick}>
                                <Image src={"/images/appstore.png"} alt="app store" width={150} height={60} />
                            </div>
                            <div className={style.playStoreLogo} onClick={handlePlayStoreClick}>
                                <Image src={"/images/playstore.png"} alt="play store" width={150} height={60} />
                            </div>
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
                            <Link href={"https://www.linkedin.com/company/glancemeai/"} passHref target="_blank"><p><FaLinkedin size={25} color="white" /></p></Link>
                            <Link href={"https://x.com/GlancemeAi"} passHref target="_blank"><p><FaXTwitter size={25} color="white" /></p></Link>
                            <Link href={"https://www.instagram.com/glancemeai/"} passHref target="_blank"><p><FaInstagramSquare size={25} color="white" /></p></Link>
                            <Link href={"https://www.facebook.com/glancemeai"} passHref target="_blank"><p><FaFacebook size={25} color="white" /></p></Link>
                            <Link href={"https://www.youtube.com/@Glancemeai"} passHref target="_blank"><p><FaYoutube size={25} color="white" /></p></Link>
                        </div>
                    </div>
                </div>

                {/* Coming Soon Popup */}
                <div className={`${style.popupOverlay} ${showComingSoonPopup ? style.open : ''}`}>
                    <div className={style.popupContent}>
                        <button onClick={handleClosePopup} className={style.popupCloseButton}>×</button>
                        <h3 className={style.popupHeading}>Coming Soon!</h3>
                        <p className={style.popupText}>This feature is currently under development. Stay tuned!</p>
                        <button onClick={handleClosePopup} className={style.popupButton}>Close</button>
                    </div>
                </div>

                {/* Subscribe Popup */}
                <div className={`${style.popupOverlay} ${showSubscribePopup ? style.open : ''}`}>
                    <div className={style.popupContent}>
                        <button onClick={handleClosePopup} className={style.popupCloseButton}>×</button>
                        <h3 className={style.popupHeading}>Subscribe to our Newsletter</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            className={style.popupInput}
                        />
                        <button onClick={handleSubscribeSubmit} className={`${style.popupButton} ${style.popupSubscribeButton}`}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;