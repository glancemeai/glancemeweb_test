import React from 'react'
import style from "./Header.module.css"
import { HiOutlineViewGrid } from "react-icons/hi";
import Link from 'next/link'
export default function Header() {
    return (
        <>
        <div className={style.mainHeader}>
      <div className={style.mainHeaderHolder}>
        <div className={style.mainHeaderItem}>
          <Link href={"/"} passHref><h1>Glanceme.Ai</h1></Link>
        </div>
        <div className={`${style.mainHeaderItem} ${style.mainHeaderItemTwo}`}>
          <Link href={"/dashboard"} passHref>
            <p>Dashboard</p>
          </Link>
          <Link href={"#"} passHref target="_blank">
            <p>Extension</p>
          </Link>
          <Link href={"/support"} passHref>
            <p>Contact</p>
          </Link>
          <Link href={"/privacy"} passHref>
            <p>Privacy</p>
          </Link>
        </div>
        <div
          className={`${style.mainHeaderItem} ${style.mainHeaderItemTwo}`}
        
        >
          <Link href={"/profile"} passHref>
            <p>Profile</p>
          </Link>
     
        </div>
        <div className={`${style.mainHeaderItem} ${style.mainHeaderItemThree}`}>
          <HiOutlineViewGrid size={25} />
        </div>
      </div>
    </div>
        </>
    )
}
