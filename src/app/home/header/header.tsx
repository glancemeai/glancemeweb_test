'use client'
import Image from "next/image"
import style from "./header.module.css"
import { HiOutlineViewGrid } from "react-icons/hi";
import { TbMenu3 } from "react-icons/tb";
import { BsMedium, BsLinkedin, BsTwitter, BsArrowRightShort } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagramSquare } from "react-icons/fa";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname();

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authorization='));
      
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    // Check login status when the component mounts and when the cookie changes
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  useEffect(() => {
    if (pathname === '/support') {
      setActiveTab('contact');
    } else if (pathname === '/about') {
      setActiveTab('about');
    } else if (pathname === '/blog') {
      setActiveTab('blog');
    } else if (pathname === '/home') {
      setActiveTab('home');
    } else {
      setActiveTab('home'); // Default case
    }
  }, [pathname]);

  return (
    <div className={style.mainHeader}>
      <div className={style.mainHeaderHolder}>
        <Link href={"/"} passHref><div className={style.mainHeaderHolderLogo}>
          <Image src={"/images/logo-1.png"} alt="Glanceme.Ai" width={40} height={40} style={{ objectFit: "cover", borderRadius: "50%" }} />
          <h1>Glanceme.Ai</h1>
        </div></Link>
        <div className={style.mainHeaderHolderMenu}>
          <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'home' ? style.active : ''}`}>
            <Link href={"/home"} passHref><p onClick={() => { setActiveTab('home') }}>Home</p></Link>
          </div>
          <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'contact' ? style.active : ''}`}>
            <Link href={"/support"} passHref><p onClick={() => { setActiveTab('contact') }}>Contact Us</p></Link>
          </div>
          <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'about' ? style.active : ''}`}>
            <Link href={"/about"} passHref><p onClick={() => { setActiveTab('about') }}>About Us</p></Link>
          </div>
          <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'blog' ? style.active : ''}`}>
            <Link href={"/blog"} passHref><p onClick={() => { setActiveTab('blog') }}>Blog</p></Link>
          </div>
        </div>

        {isLoggedIn ? (
          // Logged-in user options
          <div className={style.mainHeaderHolderLogin}>
            <div className={style.notesButton}>
              <Link href={"/dashboard"} passHref>
                <button className={style.goToNotes}>
                  Go to Notes Section <BsArrowRightShort size={22} className={style.arrowIcon} />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          // New user options
          <div className={style.mainHeaderHolderLogin}>
            <div className={style.mainHeaderHolderLoginItem}>
              <Link href={"/signup"} passHref><p>Sign Up</p></Link>
            </div>
            <div className={style.mainHeaderHolderLoginItem}>
              <Link href={"/login"} passHref><p>Login</p></Link>
            </div>
            <div className={style.mainHeaderHolderLoginItem}>
              <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref target="_blank">
                <button>Add to Chrome for Free</button>
              </Link>
            </div>
          </div>
        )}

        <div className={`${style.mainHeaderHolderSideMenu}`} onClick={() => { setShowMenu(!showMenu) }}>
          {isLoggedIn ? (
            <div className={style.mainHeaderHolderLoginItem}>
              <Link href={"/dashboard"} passHref><p>Dashboard</p></Link>
            </div>
          ) : (
            <div className={style.mainHeaderHolderLoginItem}>
              <Link href={"/login"} passHref><p>Login</p></Link>
            </div>
          )}
          <TbMenu3 size={25} />
        </div>
      </div>

      <div className={style.mainMenuSidePanel} style={{ display: `${showMenu == true ? "block" : "none"}` }}>
        <div className={style.mainMenuSidePanelClose} onClick={() => { setShowMenu(!showMenu) }}></div>
        <div className={style.mainMenuSidePanelHolder}>
          <div className={style.mainMenuSidePanelHolderHeader}>
            <Image src={"/images/logo-1.png"} alt="Glanceme.Ai" width={30} height={30} style={{ objectFit: "cover", borderRadius: "50%" }} />
            <h1>Glanceme.Ai</h1>
          </div>

          <div className={style.mainMenuSidePanelHolderItem}>
            <Link href={"/dashboard"} passHref><p>Dashboard</p></Link>
          </div>
          <div className={style.mainMenuSidePanelHolderItem}>
            <Link href={"/support"} passHref><p>Contact Us</p></Link>
          </div>
          <div className={style.mainMenuSidePanelHolderItem}>
            <Link href={"/about"} passHref><p>About Us</p></Link>
          </div>
          <div className={style.mainMenuSidePanelHolderItem}>
            <Link href={"/blog"} passHref><p>Blog</p></Link>
          </div>
          
          {isLoggedIn ? (
            <div className={style.mainMenuSidePanelHolderItem}>
              <Link href={"/dashboard"} passHref><p>Go to Notes</p></Link>
            </div>
          ) : (
            <>
              <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/signup"} passHref><p>Sign Up</p></Link>
              </div>
              <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/login"} passHref><p>Login</p></Link>
              </div>
            </>
          )}

          <div className={style.mainMenuSidePanelHolderfooter}>
            <Link href={"https://www.instagram.com/glancemeai/"} target="_blank" passHref><p><FaInstagramSquare size={25} /></p></Link>
            <Link href={"https://www.linkedin.com/company/glancemeai/"} target="_blank" passHref><p><BsLinkedin size={20} /></p></Link>
            <Link href={"https://x.com/GlancemeAi"} target="_blank" passHref><p><BsTwitter size={20} /></p></Link>
            <Link href={"mailto:support@glanceme.ai"} target="_blank" passHref><p><AiOutlineMail size={20} /></p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header