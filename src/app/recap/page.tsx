'use client'
import Image from "next/image";
import style from "./recap.module.css";
import { BsStars } from "react-icons/bs";
import { FaChrome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Header from "../home/header/header";

const RecapPage = () => {
  // State for sentence animations - using number | null type
  const [visibleSentence, setVisibleSentence] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(true);
  
  // State for title animation
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  
  // Reference for the container to detect when it's in viewport
  const sectionRef = useRef(null);
  
  const sentences = [
    {
      text: "Transform lectures into smart transcripts and summaries",
      keywords: ["smart transcripts", "lectures", "summaries"]
    },
    {
      text: "Generate interactive quizzes from any lecture content",
      keywords: ["quizzes", "lecture"]
    },
    {
      text: "Share knowledge instantly with auto-generated links.",
      keywords: ["organized", "personal knowledge hub"]
    },
    {
      text: "With Recap, make every lecture count and accessible.",
      keywords: ["Recap", "lecture", "count", "accessible"]
    }
  ];

  // Initial animation when page loads - faster sequential animation
  useEffect(() => {
    // Start title animation faster (0.15s)
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
      
      // Show subtitle faster (0.3s after title)
      const subtitleTimer = setTimeout(() => {
        setSubtitleVisible(true);
        
        // Show first sentence faster (0.2s after subtitle)
        const sentenceTimer = setTimeout(() => {
          setVisibleSentence(0);
        }, 200);
        
        return () => clearTimeout(sentenceTimer);
      }, 300);
      
      return () => clearTimeout(subtitleTimer);
    }, 150);
    
    return () => clearTimeout(titleTimer);
  }, []);

  // Handle sentence transitions
  useEffect(() => {
    // Only run this effect if a sentence is selected
    if (visibleSentence === null) return;
    
    let timer;
    
    if (fadeIn) {
      // Keep sentence visible for 3 seconds
      timer = setTimeout(() => {
        setFadeIn(false);
      }, 3000);
    } else {
      // When fade out completes, show next sentence
      timer = setTimeout(() => {
        // Fixed TypeScript error by properly handling the null case
        setVisibleSentence((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % sentences.length;
        });
        setFadeIn(true);
      }, 800); // Slightly faster transition between sentences
    }
    
    return () => clearTimeout(timer);
  }, [fadeIn, visibleSentence, sentences.length]);

  // Function to highlight keywords in the current sentence
  const renderSentenceWithHighlights = () => {
    // If no sentence is selected yet, return empty
    if (visibleSentence === null) return null;
    
    const currentSentence = sentences[visibleSentence];
    if (!currentSentence) return null;
    
    const { text, keywords } = currentSentence;
    let parts = [{ text, isKeyword: false }];
    
    // Split the sentence to highlight keywords
    keywords.forEach(keyword => {
      parts = parts.flatMap(part => {
        if (!part.isKeyword) {
          const splitText = part.text.split(new RegExp(`(${keyword})`, 'i'));
          return splitText.map(text => ({
            text,
            isKeyword: text.toLowerCase() === keyword.toLowerCase()
          }));
        }
        return [part];
      });
    });
    
    return parts.map((part, index) => 
      part.isKeyword ? (
        <span key={index} className={style.highlightedKeyword}>
          {part.text}
        </span>
      ) : (
        <span key={index}>{part.text}</span>
      )
    );
  };

  return (
    <div className={style.main} ref={sectionRef}>
        <Header />
      <div className={style.mainBg}></div>
      <div className={style.mainHolder}>
        <div className={style.mainHolderHeading}>
          <h2 className={`${style.titleAnimation} ${titleVisible ? style.visible : ''}`}>
            Turn Every Word into Wisdom
          </h2>
          <h3 className={`${style.subtitleAnimation} ${subtitleVisible ? style.visible : ''}`}>
            <BsStars size={40} color="#223FDA" className={style.starsIcon} />
            With Recap
          </h3>
        </div>
        <div className={style.mainHolderSubHeading}>
          <p className={`${style.sentenceContainer} ${visibleSentence !== null ? (fadeIn ? style.fadeIn : style.fadeOut) : style.hidden}`}>
            {renderSentenceWithHighlights()}
          </p>
        </div>
        <div className={`${style.mainHolderButton} ${subtitleVisible ? style.buttonVisible : ''}`}>
          <Image
            src={"/images/home/magic.png"}
            alt="magic"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
            className={style.magicIcon}
          />
          <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref target="_blank">
            <button className={style.pulseButton}>
              <FaChrome size={25} color="white" /> Add to Chrome for Free
            </button>
          </Link>
        </div>
      </div>

      <div className={`${style.mainBanner} ${subtitleVisible ? style.bannerVisible : ''}`}>
        {/* <Tilt
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glarePosition="all"
          glareBorderRadius="20px"
        > */}
          <div className={style.mainBannerVideo}>
            <iframe
              className={style.bannerVideo}
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/YyCbaqxfQsY?si=AicRz-5vnN60q22Q&autoplay=1&mute=1&loop=1&playlist=YyCbaqxfQsY&controls=1&modestbranding=1&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>  
        {/* </Tilt> */}
      </div> 
    </div>
  );
};

export default RecapPage;