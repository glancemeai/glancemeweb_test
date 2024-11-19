'use client'
import React, { useState } from "react";
import style from "./HomeOne.module.css";
import { HiOutlineViewGrid } from "react-icons/hi";
import { FaAsterisk } from "react-icons/fa6";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { PiStarFour } from "react-icons/pi";
import { BsMedium,  BsLinkedin, BsTwitter,  } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"

export function Headerstatic() {
  const [showMenu,setShowMenu] = useState(false)
  return (
    <div className={style.mainHeader}>
      <div className={style.mainHeaderHolder}>
        <div className={style.mainHeaderItem}>
          <Link href={"/"} passHref>
            <h1>Glanceme.Ai</h1>
          </Link>
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
          style={{ borderLeft: "2px solid black" }}
        >
          <Link href={"/login"} passHref>
            <p>Login</p>
          </Link>
          <Link href={"/signup"} passHref>
            <button>Create Account</button>
          </Link>
        </div>
        <div className={`${style.mainHeaderItem} ${style.mainHeaderItemThree}`} onClick={() => {setShowMenu(!showMenu)}}>
          <HiOutlineViewGrid size={25} />
        </div>
      </div>


      <div className={style.mainMenuSidePanel} style={{display:`${showMenu == true ? "block" : "none"}`}}>
      <div className={style.mainMenuSidePanelClose} onClick={() => {setShowMenu(!showMenu)}}></div>
      <div className={style.mainMenuSidePanelHolder}>
      <div className={style.mainMenuSidePanelHolderHeader}>
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
  );
}

const HomeOneMain = () => {
  return (
    <div className={style.mainOne}>
      <div className={style.mainOneHolderOne}>
        <div className={style.mainOneHolderOneItemOne}>
          <p id={style.mainOneHolderItemTextOne}>revalutionize</p>
          <p id={style.mainOneHolderItemTextTwo}>
            learning <span>With</span>
          </p>
          <p id={style.mainOneHolderItemTextThree}>AI-Driven</p>
          <p id={style.mainOneHolderItemTextFour}>Platform</p>
        </div>
        <div className={style.mainOneHolderOneItemTwo}>
          <div className={style.mainOneHolderOneItemTwoItemOne}>
            <p>Welcome</p>
            <span>
              <FaAsterisk />
            </span>
          </div>
          <div className={style.mainOneHolderOneItemTwoItemTwo}>
            <p>
              Quickly glance the meetings, lectures, podcasts, depositions and
              more. Glanceme.Ai gives you superhuman recall and review using AI.
            </p>
          </div>
        </div>
      </div>
      <div className={style.mainOneHolderTwo}>
        <div className={style.mainOneHolderTwoAnimation}>
          <PiStarFour color="black" size={50} />
        </div>

        <div className={style.mainOneHolderTwoItemOne}>
          <div className={style.mainOneHolderTwoItemOneHolderOne}></div>
          <div className={style.mainOneHolderTwoItemOneHolderTwo}>
            <div className={style.mainOneHolderTwoItemOneHolderTwoItemOne}>
              <span>124</span>
              features
            </div>
            <div className={style.mainOneHolderTwoItemOneHolderTwoItemTwo}>
              <span>12</span>
              users
            </div>
          </div>
        </div>

        <div className={style.mainOneHolderTwoItemTwo}>
          <div className={style.mainOneHolderTwoItemTwoOptions}>
            <p style={{ background: "black", color: "white" }}>
              Personalized Lerning
            </p>
            <p>Online Lerning</p>
            <p>AI</p>
          </div>

          <div className={style.mainOneHolderTwoItemTwoTextHolder}>
            <div className={style.mainOneHolderTwoItemTwoText}>
              <h2>Flexible</h2>
              <hr color="black" />
              <p>
                Our cutting-edge technology adapts to your needs and provides a
                tailored curriculum that help you succeed. Experience the future
                of education today.
              </p>
            </div>
            <div className={style.mainOneHolderTwoItemTwoIcon}>
              <p>
                <FiArrowUpRight size={150} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeOne() {
  return (
    <div className={style.main}>
      <Headerstatic />
      <HomeOneMain />
    </div>
  );
}
