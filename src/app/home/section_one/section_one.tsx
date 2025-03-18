'use client'
import Image from "next/image";
import style from "./section_one.module.css";
import { BsStars } from "react-icons/bs";
import { FaChrome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { useState, useEffect } from "react";

const Section_one = () => {
  const [textIndex, setTextIndex] = useState(0);
  const textLines = [
    "Save time with AI-powered summaries and topic search.",
    "Learn smarter with interactive Q&A.",
    "Stay organized with your personal knowledge hub.",
    "With GlanceMe, master any subject with ease."
  ];
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    let erasingTimer: NodeJS.Timeout;
    
    if (isTyping) {
      if (currentText.length < textLines[textIndex].length) {
        
        typingTimer = setTimeout(() => {
          setCurrentText(textLines[textIndex].substring(0, currentText.length + 1));
        }, 50); 
      } else {
        typingTimer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (currentText.length > 0) {
        
        erasingTimer = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, 30);
      } else {
        setTextIndex((textIndex + 1) % textLines.length);
        setIsTyping(true);
      }
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(erasingTimer);
    };
  }, [currentText, isTyping, textIndex, textLines]);

  return (
    <div className={style.main}>
      <div className={style.mainBg}></div>
      <div className={style.mainHolder}>
        <div className={style.mainHolderHeading}>
          <h2>Every Glance is a Leap</h2>
          <h3>
            <BsStars size={40} color="#223FDA" />Towards Mastery 
          </h3>
        </div>
        <div className={style.mainHolderSubHeading}>
          <p className={style.animatedText}>
            {currentText}<span className={style.cursor}>|</span>
          </p>
        </div>
        <div className={style.mainHolderButton}>
          <Image
            src={"/images/home/magic.png"}
            alt="magic"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref target="_blank"><button>
            <FaChrome size={25} color="white" /> Add to Chrome for Free
          </button></Link>
        </div>
      </div>

      <div className={style.mainBanner}>
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glarePosition="all"
          glareBorderRadius="20px"
        >
          <div className={style.mainBannerImage}>
            <Image
              src={"/images/home/banner.png"}
              alt="magic"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default Section_one;