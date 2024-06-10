import React from 'react'
import style from "./Header.module.css"
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'
import Link from 'next/link'
export default function Header() {
    return (
        <>
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderOne}>
                    <Link href={"/"} passHref><h1>Roten.X DevTool</h1></Link>
                </div>
                <div className={style.mainHolderTwo}>
                    <a href="https://github.com/rotenx/devTool" target="_blank" rel="noopener noreferrer"><p><BsGithub size={22}/></p></a>
                    <a href="https://twitter.com/Anshit_3" target="_blank" rel="noopener noreferrer"><p><BsTwitter size={22}/></p></a>
                    <a href="https://www.linkedin.com/in/anshit-mishra-172b33237" target="_blank" rel="noopener noreferrer"><p><BsLinkedin size={22}/></p></a>
                </div>
            </div>
        </div>
        <div style={{position:"relative",width:"100%",height:"70px"}}></div>
        </>
    )
}
