import React from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import Header from '../home/header/header';

interface TeamMember {
  name: string;
  role: string;
  imagePath: string;
}

const About: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Sajal',
      role: 'Chief Executive Officer',
      imagePath: '/images/sajal.png',
    },
    {
      name: 'Anshit',
      role: 'Chief Technology Officer',
      imagePath: '/images/anshit.png',
    },
    {
      name: 'Harsh',
      role: 'Head Of Product',
      imagePath: '/images/harsh.png',
    },
  ];

  return (
    <>
    <Header />
    <div className={styles.container}>
      {/* Hero Banner with "This is us" */}
      <div className={styles.heroBanner}>
        <div className={styles.overlay}>
          <h1 className={styles.heroTitle}>This is us.</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.visionSection}>
          <h2 className={styles.sectionTitle}>Product Vision</h2>
          <p>
            Glancelake modernizes digital learning by transforming both video and text into interactive, organized experiences that deliver valuable 
            insights. Whether you are mastering a technical skill, learning a musical instrument, or perfecting a delicious recipe, Glancelake takes you 
            from passive watching to active learning—today and tomorrow!
          </p>
        </div>

        <div className={styles.purposeSection}>
          <h2 className={styles.sectionTitle}>Product Purpose and Value Proposition</h2>
          <p>
            Glancelake aims to empower every learner by transforming digital content into a dynamic, structured resource. In an era of 
            overwhelming, unstructured information, Glancelake helps you quickly cut through the noise and extract what&apos;s most valuable.
          </p>
          
          <div className={styles.benefitSection}>
            <h3 className={styles.benefitTitle}>• Efficiency</h3>
            <p>
              Quickly extract the insights you need and determine content relevance at a glance. Save time and energy by focusing only on the 
              information that drives your learning forward.
            </p>
          </div>

          <div className={styles.benefitSection}>
            <h3 className={styles.benefitTitle}>• Interactivity</h3>
            <p>
              Experience learning as if you were interacting with a personal mentor. Engage with content through real-time Q&A and context-driven 
              responses that bring you closer to the expertise behind every lesson.
            </p>
          </div>

          <div className={styles.benefitSection}>
            <h3 className={styles.benefitTitle}>• Organization</h3>
            <p>
              Build a personalized, searchable repository of knowledge. Save notes, highlights, and timestamps to create a structured archive of 
              valuable insights that support long-term mastery.
            </p>
          </div>

          <p className={styles.closingStatement}>
            Glancelake transitions you from passive consumption to active, efficient, and organized learning—empowering you today and paving 
            the way for your growth tomorrow.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
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
    </>
  );
};

export default About;