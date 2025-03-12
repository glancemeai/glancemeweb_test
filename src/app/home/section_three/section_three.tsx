import React from "react";
import style from "./section_three.module.css";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Card = ({heading,paragraph,tagLine,textSide="right",image,altText}:{heading:string,paragraph:string,tagLine?:string,textSide?:"right" | "left",image:string,altText:string}) => {
    return (
      <div className={style.mainHolderItem} style={{flexDirection:`${textSide == "left" ? "row-reverse" : "row"}`}}>
        <div className={style.mainHolderItemImage}>
          <Image src={image} alt={altText} fill style={{objectFit:"contain"}} />
        </div>
        <div className={style.mainHolderItemText}>
          <span>{tagLine}</span>
          <h2>{heading}</h2>
          <p>{paragraph}</p>
          <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref><button>
            Add to Chrome <BsArrowRight size={20}/>
          </button></Link>
        </div>
        
      </div>
    )
  }

const Section_three = () => {
    return (
        <div className={style.main}>
        <div className={style.mainHolder}>
       <Card heading="Decide at a Glance!" paragraph={`Quickly assess whether a video or article holds the insights you need. Preview contents of the video through timestamped topics list. GlanceMe delivers concise overviews so you can decide at a glance saving you precious time."`} tagLine="Quick Insights" image="/images/home/slide1.png" altText="Quickly glance"/>
       <Card heading="Your Personal Mentor, On Demand" paragraph={`Turn videos into a two-way learning experience with real-time Q&A—just like having a personal mentor by your side.`} tagLine="Engage and Enquire" image="/images/home/slide4.png" textSide="left" altText="Fast Track"/>
       <Card heading="Zero In on What Matters" paragraph={`Cut through the clutter with our intuitive Topic Search. Find what matters in seconds. Instantly search for key topics and jump to the exact moments that matter most.`} tagLine="Glanceme.AI – Spotlight Search" textSide="right" image="/images/home/slide2.png" altText="Quickly glance"/>
       <Card heading="Preserve Your Progress for Lifelong Mastery" paragraph={`Build your own searchable repository of insights. Save notes, screenshots, and timestamps to create a personalized archive and access it across different devices (Windows, Android, iOS). Organize your insights effortlessly use folders, reminders, and cross-device access to keep your knowledge structured and accessible anytime. Turn everyday learning into a structured journey of lifelong mastery.`} tagLine="Learning Vault" textSide="left" image="/images/home/slide3.png" altText="Quickly glance"/>
        </div>
      </div>
    )
}

export default Section_three