'use client'

import React, { useEffect, useRef } from "react";
import style from "./HomeTwo.module.css";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { TbNorthStar } from "react-icons/tb";
import ParallaxText from "../components/utils/textscroll/textscroll";
import { GoDotFill } from "react-icons/go";

export default function HomeTwo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // video?.play();
        } else {
          video?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    });

    if (video) {
      observer.observe(video);

      // Unmute the video on 'play' event
      const unmuteOnPlay = () => {
        video.muted = false;
      };
      video.addEventListener('play', unmuteOnPlay);

      // Cleanup the event listener when the component unmounts
      return () => {
        observer.unobserve(video);
        video.removeEventListener('play', unmuteOnPlay);
      };
    }
  }, []);
  return (
    <div className={style.main}>
      <div className={style.mainHolder}>
        <div className={style.mainHolderOne}>
          <div className={style.mainHolderOneItemOne}>
            <Image alt="meeting" width={170} height={150} src={'/images/home/meeting.png'}/>
          </div>
          <div className={style.mainHolderOneItemTwo}>
            <p id={style.mainHolderOneItemTwoItemOne}>Can{"'"}t Remember Last week meeting?</p>
            <p id={style.mainHolderOneItemTwoItemTwo}><span>Glanceme captures</span> every insight with AI</p>
          </div>
        </div>
        <div className={style.mainHolderTwo}>
          <div className={style.mainHolderTwoItemOne}>
            <Image alt="logo" width={60} height={60} src={"/images/logo-1.png"} style={{background:"white",borderRadius:"50%",padding:"10px"}}/>
            <p>Download Extension <span><FiArrowUpRight size={20}/></span></p>
          </div>
          <div className={style.mainHolderTwoItemTwo}>
          <video ref={videoRef} loop controls muted>
            <source src="/images/home/video.mp4" type="video/mp4" />
          </video>
          </div>
        </div>
        <div className={style.mainHolderThree}>
          <div className={style.mainHolderThreeItemOne}>
          <p><span><TbNorthStar size={35}/></span><br />Shaping the future of learning</p>
          </div>
          <div className={style.mainHolderThreeItemTwo}>
            <button className={style.mainHolderThreeItemOne}>Explore More <span><FiArrowUpRight size={20}/></span></button>
            <div className={style.mainHolderThreeItemTwoItemTwo}>...</div>
          </div>
        </div>

        {/* <div className={style.scroll_container}>
          <div className={style.scroll_container_item}>
            <ParallaxText baseVelocity={-3}>Glancem.Ai Learn With AI </ParallaxText>
          </div> 
          <div className={style.scroll_container_item}>
            <ParallaxText baseVelocity={3}>Ask Question from Youtube Video 🤘</ParallaxText>
          </div> 
          <div className={style.scroll_container_item}>
            <ParallaxText baseVelocity={-3}>Generate Notes of videos . Articles . Meeting With Glanceme ✨</ParallaxText>
          </div>
        </div>  */}
        </div>
    </div>
  );
}
