'use client'
import Image from "next/image"
import style from "./header.module.css"
import { HiOutlineViewGrid } from "react-icons/hi";
import { TbMenu3 } from "react-icons/tb";
import { BsMedium, BsLinkedin, BsTwitter, BsArrowRightShort } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagramSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Apis from "@/app/service/hooks/ApiSlugs";
import {useRouter} from 'next/navigation';
import { setAlert } from "@/app/redux/utils/message";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDashboardOrFolder, setIsDashboardOrFolder] = useState(false)
  const [userImage, setUserImage] = useState('1') // Default profile image
  const [userName, setUserName] = useState('User') // Default user name
  const pathname = usePathname();
  const [loading,setloading] = useState(true)
  const router  = useRouter();

  const [data,setData] = useState<any>()

    const dispatch = useDispatch()

    const userDetails = useCallback(async () => {
      // First check if the user is logged in
      const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authorization='));
      
      if (!token) {
          // User is not logged in
          setIsLoggedIn(false);
          setloading(false);
          return; // Exit early, don't make API call
      }
      
      // User has a token, proceed with API call
      const apis = Apis()
      setloading(true)
      setData({})
      
      try {
          const data = await apis.UserDetails("profile");
          if(data.status == 200){
              setData(data);
              setIsLoggedIn(true);
          } else {
              // Token is invalid, clear it
              document.cookie = "authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              setIsLoggedIn(false);
          }
      } catch (error) {
          console.error("API error:", error);
          setData({});
          setIsLoggedIn(false);
      } finally {
          setloading(false);
      }
  },[dispatch]);
    useEffect(() => {
        userDetails()
    }, [userDetails])

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authorization='));
      
      setIsLoggedIn(!!token);
      
      const userImg = localStorage.getItem('userProfileImage') || '1';
      setUserImage(userImg);
      
      // Get user name from localStorage
      const name = localStorage.getItem('userName') || 'User';
      setUserName(name);
    };

    checkLoginStatus();
    // Check login status when the component mounts and when the cookie changes
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);



  useEffect(() => {
    // Check if the current page is dashboard or a folder
    const dashboardPath = pathname.includes('/dashboard');
    const folderPath = pathname.includes('/folder/');
    const notesPath = pathname.includes('/notes/');
    setIsDashboardOrFolder(dashboardPath || folderPath || notesPath);
    
    if (pathname === '/support') {
      setActiveTab('contact');
    } else if (pathname === '/about') {
      setActiveTab('about');
    } else if (pathname === '/blog') {
      setActiveTab('blog');
    } else if (pathname === '/faqs') {
      setActiveTab('faqs');
    } else if (pathname.includes('/dashboard') || pathname.includes('/folder/') || pathname.includes('/notes/')) {
      setActiveTab('notes');
    } else if (pathname === '/home') {
      setActiveTab('home');
    } else if (pathname === '/products') {
      setActiveTab('products');
    } else {
      setActiveTab('home'); // Default case
    }
  }, [pathname]);

  return (
    <div className={style.mainHeader}>
      <div className={style.mainHeaderHolder}>
        <Link href={"/"} passHref><div className={style.mainHeaderHolderLogo}>
          <Image src={"/images/logo-1.png"} alt="Glanceme.ai" width={40} height={40} style={{ objectFit: "cover", borderRadius: "50%" }} />
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
          <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'faqs' ? style.active : ''}`}>
            <Link href={"/faqs"} passHref><p onClick={() => { setActiveTab('faqs') }}>FAQs</p></Link>
          </div>
          <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'products' ? style.active : ''}`}>
            <Link href={"/products"} passHref><p onClick={() => { setActiveTab('products') }}>Products</p></Link>
          </div>
          {isDashboardOrFolder && (
            <div className={`${style.mainHeaderHolderMenuItem} ${activeTab === 'notes' ? style.active : ''}`}>
              <Link href={"/dashboard"} passHref><p onClick={() => { setActiveTab('notes') }}>Notes</p></Link>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          // Logged-in user options
          <div className={style.mainHeaderHolderLogin}>
            {isDashboardOrFolder ? (
              // Show profile button with name and picture when on dashboard or in a folder
              <div className={style.profileButton}>
                <Link href={"/profile"} passHref>
                  <button className={style.profileBtn}>
                    <span className={style.userName}>{data?.data?.user?.name}</span>
                    <Image 
                      src={`/images/${userImage}.png`} 
                      alt="profile" 
                      width={40} 
                      height={40} 
                      className={style.profileImage}
                    />
                  </button>
                </Link>
              </div>
            ) : (
              // Show Go to Notes button on other pages
              <div className={style.notesButton}>
                <Link href={"/dashboard"} passHref>
                  <button className={style.goToNotes}>
                   Go to Your Notes <BsArrowRightShort size={22} className={style.arrowIcon} />
                  </button>
                </Link>
              </div>
            )}
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
            isDashboardOrFolder ? (
              <div className={style.mainHeaderHolderLoginItem}>
                <Link href={"/profile"} passHref>
                  <div className={style.mobileProfileButton}>
                    <span className={style.mobileUserName}>{data?.data?.user?.name}</span>
                    <Image 
                      src={`/images/${userImage}.png`} 
                      alt="profile" 
                      width={40} 
                      height={40} 
                      style={{ objectFit: "cover", borderRadius: "50%" }} 
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <div className={style.mainHeaderHolderLoginItem}>
                <Link href={"/dashboard"} passHref><p>Dashboard</p></Link>
              </div>
            )
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
            <Link href={"/home"} passHref><p>Home</p></Link>
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
          
          {isLoggedIn && (
            <>
              <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/dashboard"} passHref><p>Dashboard</p></Link>
              </div>
              {isDashboardOrFolder && (
                <div className={style.mainMenuSidePanelHolderItem}>
                  <Link href={"/profile"} passHref><p>Profile</p></Link>
                </div>
              )}
            </>
          )}

          {!isLoggedIn && (
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