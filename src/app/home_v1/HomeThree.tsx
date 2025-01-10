import React from "react";
import style from "./HomeThree.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({heading,paragraph,tagLine,textSide="right",image,altText}:{heading:string,paragraph:string,tagLine?:string,textSide?:"right" | "left",image:string,altText:string}) => {
  return (
    <div className={style.mainHolderItem} style={{flexDirection:`${textSide == "left" ? "row-reverse" : "row"}`}}>
      <div className={style.mainHolderItemImage}>
        <Image src={image} alt={altText} fill style={{objectFit:"contain"}} />
      </div>
      <div className={style.mainHolderItemText}>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
        <span>{tagLine}</span>
      </div>
    </div>
  )
}

export default function HomeThree() {
  return (
    <div className={style.main}>
      <div className={style.mainHolder}>
     <Card heading="Quickly glance at long-form audio, video and articles" paragraph={`Don’t waste hours on empty content. Know if it’s worth your time in just a glance—because your time is better spent on what truly matters`} tagLine="Snap it. Save it. Own your time." image="/images/home/side1.jpg" altText="Quickly glance"/>
     <Card heading="Worried  about learning at the speed of light and recalling when needed" paragraph={`Overwhelmed by endless content and repeated knowledge? Glanceme.AI helps you focus on what’s new. Create quick notes, set reminders for unfinished tasks, and seamlessly resume where you left off. Save time, stay organized, and master faster with the Glanceme.AI App & Extension.`} tagLine="Glanceme.AI – Learn Smarter, Not Harder." textSide="left" image="/images/home/side2.jpg" altText="Quickly glance"/>
     <Card heading="Curate content on fingertips" paragraph={`Effortlessly curate content with Glanceme.AI. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away." image="/images/home/side3.jpg" altText="Quickly glance"/>
      </div>
    </div>
  );
}
