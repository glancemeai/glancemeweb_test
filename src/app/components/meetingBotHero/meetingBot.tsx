'use client';

import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { BsStack, BsStars } from 'react-icons/bs';
import Link from 'next/link';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.container}>
      {/* Background with gradient and images */}
      <div className={styles.containerBg} />
      
      <div className={styles.contentHolder}>
        <div className={styles.teamHeaderSection}>
          {/* Main Title */}
          <h1 className={`${styles.titleAnimation} ${isVisible ? styles.visible : ''}`}>
            Record, transcribe, and share
          </h1>
          
          {/* Gradient Subtitle with animated stars */}
          <h2 className={`${styles.subtitleAnimation} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.starsIcon}><BsStars size={40} color='blue'/></span>
            video calls
            in seconds
          </h2>
          {/* Description */}
          <p className={`${styles.description} ${isVisible ? styles.visible : ''}`}>
            Capture every meeting insight with AI-powered recording and transcription. 
            Never miss a detail again.
          </p>

          {/* Action buttons */}
          <div className={`${styles.buttonContainer} ${isVisible ? styles.visible : ''}`}>
            <button className={styles.primaryButton}>
              <Link href={'/meetingScheduler'}>Get Started for Free</Link>
            </button>
            <button className={styles.secondaryButton}>
              Watch Demo
            </button>
          </div>

          {/* Down arrow indicator */}
          <div className={`${styles.arrowContainer} ${isVisible ? styles.visible : ''}`}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.arrowIcon}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;