import React from "react";
import style from "./HomeOne.module.css";
import { HiOutlineViewGrid } from "react-icons/hi";
import { BsCheckCircleFill, BsFillPlayFill, BsSearch } from "react-icons/bs";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
function HomeOneHeader() {
  return (
    <div className={style.mainHeader}>
      <div className={style.mainHeaderHolder}>
        <div className={style.mainHeaderItem}>
          <Link href={"/"} passHref><h1>Roten.X DevTool</h1></Link>
        </div>
        <div className={`${style.mainHeaderItem} ${style.mainHeaderItemTwo}`}>
          <Link href={"/dashboard"} passHref>
            <p>Dashboard</p>
          </Link>
          <Link href={"https://chromewebstore.google.com/detail/rotenx-devtool/jcfiajnlfhplglbcpegfebokhhpladne"} passHref target="_blank">
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
        <div className={`${style.mainHeaderItem} ${style.mainHeaderItemThree}`}>
          <HiOutlineViewGrid size={25} />
        </div>
      </div>
    </div>
  );
}

const HomeOneMain = () => {
  return (
    <div className={style.mainOne}>
      <div className={style.mainOneItem}>
        <div className={style.mainOneItemOne} style={{ fontSize: "55px" }}>
          <h2>DevTool Start Effortless Online Learning And Notes Making!</h2>
          <p>
            Empower your productivity with DevTool Seamlessly capture notes, highlight key insights in blogs, effortlessly summarize YouTube videos, and engage with AI-driven questions—all to ensure you never miss a beat.
          </p>
        </div>
        <div className={style.mainOneItemtwo}>
          <div className={style.mainOneItemtwoSubItemButton}>
          <Link href={"https://chromewebstore.google.com/detail/rotenx-devtool/jcfiajnlfhplglbcpegfebokhhpladne"} passHref target="_blank"><button>Add To Chrome</button></Link>
          </div>
          <div className={style.mainOneItemtwoSubItem}>
            <div className={style.mainOneItemtwoSubItemOne}>
              <BsFillPlayFill size={20} />
            </div>
            <Link href={"https://www.youtube.com/watch?v=O5S8qUtyuBI"} target="_blank" passHref><p>How It{"'"}s works ??</p></Link>
          </div>
          <div className={style.mainArrowOne}>
            <Image src={"/images/home/arrowone.png"} alt="arrow" fill />
          </div>
        </div>
      </div>
      <div className={style.mainTwoItemTwo}>
        <div className={style.mainArrowTwo}>
          <Image src={"/images/home/arrowtwo.png"} alt="arrow" fill />
        </div>
        <div
          className={`${style.mainHolderOneContainerTwoDesign} ${style.MoveAnimation}`}
        >
          <p className={style.mainHolderOneContainerTwoDesignItemOne}>
            <AiOutlineMail size={20} />
          </p>
          <p className={style.mainHolderOneContainerTwoDesignItemTwo}>
            congrats
            <br />
            <span>you have got an email</span>
          </p>
          <p style={{ color: "#5dbf84" }}>
            <BsCheckCircleFill size={20} />
          </p>
        </div>
        <div className={style.mainTwoItemTwoImage}>
          <Image
            src={"/images/home/ans.png"}
            alt="anshit"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={style.mainDesignThree}>
          <div className={style.mainDesignThreeItme}>
            <Image
              src={"/images/home/companies/youtube.png"}
              alt="youtube"
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={style.mainDesignThreeItme}>
            <Image
              src={"/images/home/companies/google.png"}
              alt="google"
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={style.mainDesignThreeItme}>
            <Image
              src={"/images/home/companies/medium.png"}
              alt="medium"
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={style.mainDesignThreeItme}>
            <Image
              src={"/images/rotenx.png"}
              alt="rotenx"
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className={style.mainDesignFour}>
          <div className={style.mainDesignFourItem}>
            <BsSearch size={20} />
          </div>
          <p>find community and best way of study</p>
        </div>
      </div>
    </div>
  );
};

export default function HomeOne() {
  return (
    <div className={style.main}>
      <HomeOneHeader />
      <HomeOneMain />
    </div>
  );
}
