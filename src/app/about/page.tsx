"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import Header from '../home/header/header';
import { BsStars } from "react-icons/bs";

interface TeamMember {
  name: string;
  role: string;
  imagePath: string;
}

const About: React.FC = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isTeamSectionVisible, setIsTeamSectionVisible] = useState(false);
  const [visibleBenefits, setVisibleBenefits] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    // Staggered animations
    const titleTimer = setTimeout(() => setIsTitleVisible(true), 300);
    const subtitleTimer = setTimeout(() => setIsSubtitleVisible(true), 800);
    const contentTimer = setTimeout(() => setIsContentVisible(true), 1200);
    const teamSectionTimer = setTimeout(() => setIsTeamSectionVisible(true), 1500);
    
    // Benefits appear one by one
    const benefit1Timer = setTimeout(() => setVisibleBenefits([true, false, false]), 1600);
    const benefit2Timer = setTimeout(() => setVisibleBenefits([true, true, false]), 1800);
    const benefit3Timer = setTimeout(() => setVisibleBenefits([true, true, true]), 2000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(contentTimer);
      clearTimeout(teamSectionTimer);
      clearTimeout(benefit1Timer);
      clearTimeout(benefit2Timer);
      clearTimeout(benefit3Timer);
    };
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: 'Sajal',
      role: 'Chief Executive Officer',
      imagePath: '/images/sajal.png',
    },
    {
      name: 'Anshit',
      role: 'Chief Technology Officer',
      imagePath: '/images/home/ans2.png',
    },
    {
      name: 'Harsh',
      role: 'Head Of Product',
      imagePath: '/images/home/harsh.jpg',
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerBg}></div>
        <div className={styles.contentHolder}>
          {/* Team Header Section */}
          <div className={styles.teamHeaderSection}>
            <h1 className={`${styles.titleAnimation} ${isTitleVisible ? styles.visible : ''}`}>Meet Our</h1>
            <div className={`${styles.subtitleAnimation} ${isSubtitleVisible ? styles.visible : ''}`}>
              <span className={styles.starsIcon}><BsStars size={40} color='blue' /></span>
              Glanceme Team
            </div>
          </div>

          {/* Content Section */}
          <div className={`${styles.contentSection} ${isContentVisible ? styles.visible : ''}`}>
            <div className={styles.visionSection}>
              <h2 className={styles.sectionTitle}>Product Vision</h2>
              <p>
                Glanceme modernizes digital learning by transforming both video and text into interactive, organized experiences that deliver valuable 
                insights. Whether you are mastering a technical skill, learning a musical instrument, or perfecting a delicious recipe, Glancelake takes you 
                from passive watching to active learning—today and tomorrow!
              </p>
            </div>

            <div className={styles.purposeSection}>
              <h2 className={styles.sectionTitle}>Product Purpose and Value Proposition</h2>
              <p>
                Glanceme aims to empower every learner by transforming digital content into a dynamic, structured resource. In an era of 
                overwhelming, unstructured information, Glancelake helps you quickly cut through the noise and extract what&apos;s most valuable.
              </p>
              
              <div className={`${styles.benefitSection} ${visibleBenefits[0] ? styles.visible : ''}`} style={{transitionDelay: '0.2s'}}>
                <h3 className={styles.benefitTitle}>• Efficiency</h3>
                <p>
                  Quickly extract the insights you need and determine content relevance at a glance. Save time and energy by focusing only on the 
                  information that drives your learning forward.
                </p>
              </div>

              <div className={`${styles.benefitSection} ${visibleBenefits[1] ? styles.visible : ''}`} style={{transitionDelay: '0.4s'}}>
                <h3 className={styles.benefitTitle}>• Interactivity</h3>
                <p>
                  Experience learning as if you were interacting with a personal mentor. Engage with content through real-time Q&A and context-driven 
                  responses that bring you closer to the expertise behind every lesson.
                </p>
              </div>

              <div className={`${styles.benefitSection} ${visibleBenefits[2] ? styles.visible : ''}`} style={{transitionDelay: '0.6s'}}>
                <h3 className={styles.benefitTitle}>• Organization</h3>
                <p>
                  Build a personalized, searchable repository of knowledge. Save notes, highlights, and timestamps to create a structured archive of 
                  valuable insights that support long-term mastery.
                </p>
              </div>

              <p className={styles.closingStatement}>
                Glanceme transitions you from passive consumption to active, efficient, and organized learning—empowering you today and paving 
                the way for your growth tomorrow.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className={`${styles.teamSection} ${isTeamSectionVisible ? styles.visible : ''}`}>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className={styles.teamMember}
                  style={{"--index": index} as React.CSSProperties}
                >
                  <div className={styles.imageContainer}>
                    <Image 
                      src={member.imagePath} 
                      alt={member.name} 
                      width={120} 
                      height={120} 
                      className={styles.memberImage} 
                    />
                  </div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;