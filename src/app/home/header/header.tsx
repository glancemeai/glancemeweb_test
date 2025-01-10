'use client'
import Image from "next/image"
import style from "./header.module.css"
import { HiOutlineViewGrid } from "react-icons/hi";
import { TbMenu3 } from "react-icons/tb";
import { BsMedium,  BsLinkedin, BsTwitter,  } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [showMenu,setShowMenu] = useState(false)
    return (
        <div className={style.mainHeader} >
            <div className={style.mainHeaderHolder} >
                <Link href={"/"} passHref ><div className={style.mainHeaderHolderLogo} >
                    <Image src={"/images/logo-1.png"} alt="Glanceme.Ai" width={40} height={40} style={{objectFit:"cover", borderRadius:"50%"}} />
                    <h1>Glanceme.Ai</h1>
                </div></Link>
                <div className={style.mainHeaderHolderMenu} >
                    <div className={style.mainHeaderHolderMenuItem} >
                        <Link href={"/Home"} passHref ><p>Home</p></Link>
                    </div>
                    <div className={style.mainHeaderHolderMenuItem} >
                        <Link href={"/contact"} passHref target="_blank"><p>Extension</p></Link>
                    </div>
                    <div className={style.mainHeaderHolderMenuItem} >
                        <Link href={"/contact"} passHref><p>Contact</p></Link>
                    </div>
                    <div className={style.mainHeaderHolderMenuItem} >
                        <Link href={"/privacy"} passHref><p>Privacy</p></Link>
                    </div>
                </div>
                <div className={style.mainHeaderHolderLogin} >
                    
                    <div className={style.mainHeaderHolderLoginItem} >
                        <Link href={"/login"} passHref><p>Login</p></Link>
                    </div>
                    <div className={style.mainHeaderHolderLoginItem} >
                    <Link href={"#"} passHref target="_blank"><button>Add to Chrome for Free</button></Link>
                    </div>
                </div>
                <div className={`${style.mainHeaderHolderSideMenu}`} onClick={() => {setShowMenu(!showMenu)}}>
                <div className={style.mainHeaderHolderLoginItem} >
                        <Link href={"/login"} passHref><p>Login</p></Link>
                    </div>
                    <TbMenu3 size={25} />
                </div>
            </div>


            <div className={style.mainMenuSidePanel} style={{display:`${showMenu == true ? "block" : "none"}`}}>
                <div className={style.mainMenuSidePanelClose} onClick={() => {setShowMenu(!showMenu)}}></div>
                <div className={style.mainMenuSidePanelHolder}>
                <div className={style.mainMenuSidePanelHolderHeader}>
                    <Image src={"/images/logo-1.png"} alt="Glanceme.Ai" width={30} height={30} style={{objectFit:"cover", borderRadius:"50%"}} />
                    <h1>Glanceme.Ai</h1>
                </div>

                <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/dashboard"} passHref><p>Dashboard</p></Link>
                </div>
                <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"#"} target="_blank" passHref><p>Extension</p></Link>
                </div>
                <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/contact"} passHref><p>Contact</p></Link>
                </div>
                <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/policy"} passHref><p>Policy</p></Link>
                </div>
                <div className={style.mainMenuSidePanelHolderItem}>
                <Link href={"/login"} passHref><p>Login</p></Link>
                </div>


                <div className={style.mainMenuSidePanelHolderfooter}>
                    <Link href={"#"} target="_blank" passHref><p><BsMedium size={25} /></p></Link>
                    <Link href={"#"} target="_blank" passHref><p><BsLinkedin size={20} /></p></Link>
                    <Link href={"#"} target="_blank" passHref><p><BsTwitter size={20} /></p></Link>
                    <Link href={"mailto:support@glanceme.ai"} target="_blank" passHref><p><AiOutlineMail size={20} /></p></Link>
                        
                </div>
                </div>
            </div>
        </div>
    )
}

export default Header