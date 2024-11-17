'use client'
import React, { useState } from "react";
import style from "./HomeFive.module.css";
import { FaChevronDown } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";

const Card = ({heading,paragraph,tagLine,textSide="right"}:{heading:string,paragraph:string,tagLine?:string,textSide?:"right" | "left"}) => {
    const [display,setDisplay] = useState(false)
    return (
    <div className={style.mainHolderItem} style={{flexDirection:`${textSide == "left" ? "row-reverse" : "row"}`}}>
        <div className={style.mainHolderItemHeader} onClick={() => {setDisplay(!display)}}>
            <p>{heading}</p>
            <div className={style.mainHolderItemHeaderIcon}>
                <FaChevronDown size={20}/>
            </div>
        </div>
        <div className={style.mainHolderItemHeaderDetails} style={{display:`${display ? "block" : "none"}`}}>
            <p>{paragraph}</p>
        </div>
    </div>
  )
}

export default function HomeFive() {
  return (
    <div className={style.main}>
      <div className={style.mainHolder}>
        <div className={style.mainHolderLeft}>
        <div className={style.mainHolderLeftDetails}>
            <h2>You ask <b><IoRemoveOutline size={30} fontWeight={700}/></b> we answer</h2>
            <p>All You want to know about glanceme.ai</p>
        </div>
        </div>
        <div className={style.mainHolderRight}>
            <Card heading="what is glaneme.ai" paragraph={`Don’t waste hours on empty content. Know if it’s worth your time in just a glance—because your time is better spent on what truly matters`} tagLine="Snap it. Save it. Own your time."/>
            <Card heading="How glaneme.ai help to study smarter" paragraph={`Overwhelmed by endless content and repeated knowledge? Glanceme.AI helps you focus on what’s new. Create quick notes, set reminders for unfinished tasks, and seamlessly resume where you left off. Save time, stay organized, and master faster with the Glanceme.AI App & Extension.`} tagLine="Glanceme.AI – Learn Smarter, Not Harder." textSide="left"/>
            <Card heading="Curate content on fingertips" paragraph={`Effortlessly curate content with Glanceme.AI. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away."/>
            <Card heading="How to enable glanceme.ai" paragraph={`Effortlessly curate content with Glanceme.AI. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away."/>
            <Card heading="How to contact us" paragraph={`Effortlessly curate content with Glanceme.AI. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away."/>
        </div>
       </div>
    </div>
  );
}
