"use client"
import React, { useState, useEffect, useRef } from "react";
import style from "./section_three.module.css";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsXLg } from "react-icons/bs";

const Card = ({heading, paragraph, tagLine, textSide="right", image, altText, index}:{
  heading: string,
  paragraph: string,
  tagLine?: string,
  textSide?: "right" | "left",
  image: string,
  altText: string,
  index: number
}) => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleImageClick = () => {
        setShowImageModal(true);
    };

    const handleCloseModal = () => {
        setShowImageModal(false);
    };

    useEffect(() => {
        // Create the observer with options
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Use timeout to ensure smoother animation starts
                setTimeout(() => {
                    setIsVisible(true);
                }, 50);
                observer.unobserve(cardRef.current as Element);
            }
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Calculate staggered animation delay
    const animationDelay = `${index * 0.15}s`;

    return (
      <>
        <div 
          ref={cardRef}
          className={`
            ${style.mainHolderItem} 
            ${style[textSide === "left" ? "textLeft" : "textRight"]}
            ${isVisible ? style.visible : style.hidden}
          `}
          style={{ animationDelay }}
        >
          <div 
            className={`
              ${style.mainHolderItemImage} 
              ${style.clickableImage}
              ${isVisible ? style.fadeInImage : ''}
            `} 
            onClick={handleImageClick}
            style={{ animationDelay }}
          >
            <div className={style.imageWrapper}>
              <Image 
                src={image} 
                alt={altText} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{objectFit:"contain", cursor: "pointer"}} 
                className={style.cardImage}
                loading="lazy"
                quality={90}
              />
            </div>
            <div className={style.imageBg}></div>
          </div>
          <div 
            className={`
              ${style.mainHolderItemText}
              ${isVisible ? style.fadeInText : ''}
            `}
            style={{ animationDelay: `calc(${animationDelay} + 0.1s)` }}
          >
            <span className={style.tagLine}>{tagLine}</span>
            <h2 className={isVisible ? style.animateHeading : ''}>{heading}</h2>
            <p className={isVisible ? style.animateParagraph : ''}>{paragraph}</p>
            <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref>
              <button className={isVisible ? style.animateButton : ''}>
                Add to Chrome <BsArrowRight size={20} className={style.arrowIcon}/>
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
                  className={style.imageInTheBox}
                  src={image} 
                  alt={altText} 
                  width={1200}
                  height={550}
                  style={{objectFit:"contain"}}
                  priority={true}
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
}

const Section_three = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Use timeout to ensure DOM is ready
                setTimeout(() => {
                    setIsInView(true);
                }, 50);
                observer.unobserve(sectionRef.current as Element);
            }
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -5% 0px'
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className={style.main} ref={sectionRef}>
            <div className={`${style.sectionHeading} ${isInView ? style.visible : ''}`}>
                <div className={style.decorativeLine}></div>
                <h2>Why Choose Glanceme.AI?</h2>
                <div className={style.decorativeLine}></div>
            </div>
            <div className={style.mainHolder}>
                <Card 
                    heading="Decide at a Glance!" 
                    paragraph={`Quickly grasp the key takeaways of any video with a concise summary. Glanceme provides clear, structured summaries, allowing you to understand the core insights at a glance saving you time and effort.`} 
                    tagLine="Quick Insights" 
                    image="/images/new-summary.png" 
                    altText="Quickly glance"
                    index={0}
                />
                <Card 
                    heading="Your Personal Mentor, On Demand" 
                    paragraph={`Turn videos into a two-way learning experience with real-time Q&A—just like having a personal mentor by your side.`} 
                    tagLine="Engage and Enquire" 
                    image="/images/new-qa.png" 
                    textSide="left" 
                    altText="Fast Track"
                    index={1}
                />
                <Card 
                    heading="Zero In on What Matters" 
                    paragraph={`Cut through the clutter with our intuitive Topic Search. Find what matters in seconds. Instantly search for key topics and jump to the exact moments that matter most.`} 
                    tagLine="Glanceme.AI – Spotlight Search" 
                    textSide="right" 
                    image="/images/mainPageHolder.png" 
                    altText="Quickly glance"
                    index={2}
                />
                <Card 
                    heading="Preserve Your Progress for Lifelong Mastery" 
                    paragraph={`Build your own searchable repository of insights. Save notes, screenshots, and timestamps to create a personalized archive and access it across different devices (Windows, Android, iOS). Organize your insights effortlessly use folders, reminders, and cross-device access to keep your knowledge structured and accessible anytime. Turn everyday learning into a structured journey of lifelong mastery.`} 
                    tagLine="Learning Vault" 
                    textSide="left" 
                    image="/images/new-notes.png" 
                    altText="Quickly glance"
                    index={3}
                />
            </div>
           
        </div>
    )
}

export default Section_three;