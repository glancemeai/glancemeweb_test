"use client"
import Image from "next/image";
import style from "./footer.module.css";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
    const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);
    const [showSubscribePopup, setShowSubscribePopup] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);
    const [animateConfetti, setAnimateConfetti] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const handleAppStoreClick = () => {
        setShowComingSoonPopup(true);
    };

    const handlePlayStoreClick = () => {
        setShowComingSoonPopup(true);
    };

    const handleSubscribeButtonClick = () => {
        setShowSubscribePopup(true);
        setSubscribeSuccess(false);
    };

    const handleClosePopup = () => {
        setShowComingSoonPopup(false);
        if (subscribeSuccess) {
            // Delay closing the popup to show the success animation
            setTimeout(() => {
                setShowSubscribePopup(false);
                setSubscribeSuccess(false);
                setAnimateConfetti(false);
            }, 2000);
        } else {
            setShowSubscribePopup(false);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubscribeSubmit = () => {
        if (!email || !email.includes('@')) {
            return; // Basic validation
        }
        
        // In a real application, you would send this email to your backend
        console.log("Subscribed with email:", email);
        
        // Show success state
        setSubscribeSuccess(true);
        setAnimateConfetti(true);
        
        // Reset form after success animation completes
        setTimeout(() => {
            setEmail("");
        }, 2000);
    };

    // Handle outside clicks
    const handleOutsideClick = (event: MouseEvent): void => {
        if (popupRef.current && popupRef.current.contains && !popupRef.current.contains(event.target as Node)) {
            handleClosePopup();
        }
    };

    // Add outside click listener
    useEffect(() => {
        if (showSubscribePopup || showComingSoonPopup) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showSubscribePopup, showComingSoonPopup]);

    // Clean up animation states when popup closes
    useEffect(() => {
        if (!showSubscribePopup) {
            setSubscribeSuccess(false);
            setAnimateConfetti(false);
        }
    }, [showSubscribePopup]);

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
                            <p>© 2025 Glanceme.Ai Pvt. Ltd.</p>
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
                    <div className={style.popupContent} ref={popupRef}>
                        <button onClick={handleClosePopup} className={style.popupCloseButton}>×</button>
                        <h3 className={style.popupHeading}>Coming Soon!</h3>
                        <p className={style.popupText}>This feature is currently under development. Stay tuned!</p>
                        <button onClick={handleClosePopup} className={style.popupButton}>Close</button>
                    </div>
                </div>

                {/* Subscribe Popup */}
                <div className={`${style.popupOverlay} ${showSubscribePopup ? style.open : ''}`}>
                    <div className={`${style.popupContent} ${subscribeSuccess ? style.successState : ''}`} ref={popupRef}>
                        {!subscribeSuccess ? (
                            <>
                                <button onClick={handleClosePopup} className={style.popupCloseButton}>×</button>
                                <h3 className={style.popupHeading}>Subscribe to our Newsletter</h3>
                                <div className={style.gradientBar}></div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={style.popupInput}
                                />
                                <button 
                                    onClick={handleSubscribeSubmit} 
                                    className={`${style.popupButton} ${style.popupSubscribeButton}`}
                                >
                                    Subscribe
                                </button>
                            </>
                        ) : (
                            <div className={style.successContent}>
                                <div className={style.checkmarkContainer}>
                                    <svg className={style.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                        <circle className={style.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                                        <path className={style.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                    </svg>
                                </div>
                                
                                {/* Confetti elements */}
                                {animateConfetti && (
                                    <div className={style.confettiContainer}>
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`${style.confetti} ${style['confetti' + (i % 5)]}`}></div>
                                        ))}
                                    </div>
                                )}
                                
                                <h3 className={style.successHeading}>Thanks for subscribing!</h3>
                                <p className={style.successText}>We will keep you updated with our latest news.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;