'use client'
import React, { useState } from "react";
import style from "./section_five.module.css";
import { FaChevronDown } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
const Card = ({heading,paragraph,tagLine,textSide="right",show}:{heading:string,paragraph:string,tagLine?:string,textSide?:"right" | "left",show?:boolean}) => {
    const [display,setDisplay] = useState(show || false)
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

export default function Section_Five({show}:{show?:boolean}) {
  return (
    <div className={style.main}>
      <div className={style.mainBg}></div>
      <div className={style.mainHolder}>
        <div className={style.mainHolderLeft}>
        <div className={style.mainHolderLeftDetails}>
            <h2>You ask <b><BsArrowRight size={30} fontWeight={700}/></b> We answer</h2>
            <p>All You want to know about Glanceme.Ai</p>
        </div>
        </div>
        <div className={style.mainHolderRight}>
            <Card show={show || false} heading="What is Glanceme.Ai" paragraph={`Don’t waste hours on empty content. Know if it’s worth your time in just a glance—because your time is better spent on what truly matters`} tagLine="Snap it. Save it. Own your time."/>
            <Card show={show || false} heading="How Glanceme.Ai help to study smarter" paragraph={`Overwhelmed by endless content and repeated knowledge? Glanceme.Ai helps you focus on what’s new. Create quick notes, set reminders for unfinished tasks, and seamlessly resume where you left off. Save time, stay organized, and master faster with the Glanceme.Ai App & Extension.`} tagLine="Glanceme.Ai – Learn Smarter, Not Harder." textSide="left"/>
            <Card show={show || false} heading="Curate content on fingertips" paragraph={`Effortlessly curate content with Glanceme.Ai. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away."/>
            <Card show={show || false} heading="How to enable Glanceme.Ai" paragraph={`Effortlessly curate content with Glanceme.Ai. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away."/>
            <Card show={show || false} heading="How to contact us" paragraph={`Effortlessly curate content with Glanceme.Ai. Summarize key points, organize your learnings, and access everything you need—all at your fingertips. Say goodbye to information overload and hello to smarter, faster, and more focused learning.`} tagLine="Your Knowledge, Just a Tap Away."/>
        </div>
       </div>
    </div>
  );
}
