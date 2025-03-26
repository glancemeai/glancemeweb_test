"use client"
import React, { useState } from "react";
import style from "./section_three.module.css";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsXLg } from "react-icons/bs";

const Card = ({heading,paragraph,tagLine,textSide="right",image,altText}:{heading:string,paragraph:string,tagLine?:string,textSide?:"right" | "left",image:string,altText:string}) => {
    const [showImageModal, setShowImageModal] = useState(false);

    const handleImageClick = () => {
        setShowImageModal(true);
    };

    const handleCloseModal = () => {
        setShowImageModal(false);
    };

    return (
      <>
        <div className={`${style.mainHolderItem} ${style[textSide === "left" ? "textLeft" : "textRight"]}`}>
          <div 
            className={`${style.mainHolderItemImage} ${style.clickableImage}`} 
            onClick={handleImageClick}
          >
            <Image 
              src={image} 
              alt={altText} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{objectFit:"contain", cursor: "pointer"}} 
            />
          </div>
          <div className={style.mainHolderItemText}>
            <span>{tagLine}</span>
            <h2>{heading}</h2>
            <p>{paragraph}</p>
            <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref>
              <button>
                Add to Chrome <BsArrowRight size={20}/>
              </button>
            </Link>
          </div>
        </div>

        {showImageModal && (
          <div className={style.imageModalOverlay} onClick={handleCloseModal}>
            <div 
              className={style.imageModalContent} 
              onClick={(e) => e.stopPropagation()}
            >
              <div className={style.imageModalHeader}>
                <h3>{altText}</h3>
                <button 
                  className={style.closeModalButton} 
                  onClick={handleCloseModal}
                >
                  <BsXLg />
                </button>
              </div>
              <div className={style.imageModalImageContainer}>
                <Image 
                  src={image} 
                  alt={altText} 
                  width={1200}
                  height={600}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
}

const Section_three = () => {
    return (
        <div className={style.main}>
          <div className={style.mainBg}></div>
        <div className={style.mainHolder}>
       <Card heading="Decide at a Glance!" paragraph={`Quickly grasp the key takeaways of any video with a concise summary. Glanceme provides clear, structured summaries, allowing you to understand the core insights at a glance saving you time and effort.`} tagLine="Quick Insights" image="/images/summary.png" altText="Quickly glance"/>
       <Card heading="Your Personal Mentor, On Demand" paragraph={`Turn videos into a two-way learning experience with real-time Q&A—just like having a personal mentor by your side.`} tagLine="Engage and Enquire" image="/images/QA.png" textSide="left" altText="Fast Track"/>
       <Card heading="Zero In on What Matters" paragraph={`Cut through the clutter with our intuitive Topic Search. Find what matters in seconds. Instantly search for key topics and jump to the exact moments that matter most.`} tagLine="Glanceme.AI – Spotlight Search" textSide="right" image="/images/Topics.png" altText="Quickly glance"/>
       <Card heading="Preserve Your Progress for Lifelong Mastery" paragraph={`Build your own searchable repository of insights. Save notes, screenshots, and timestamps to create a personalized archive and access it across different devices (Windows, Android, iOS). Organize your insights effortlessly use folders, reminders, and cross-device access to keep your knowledge structured and accessible anytime. Turn everyday learning into a structured journey of lifelong mastery.`} tagLine="Learning Vault" textSide="left" image="/images/save-notes.png" altText="Quickly glance"/>
        </div>
      </div>
    )
}

export default Section_three;