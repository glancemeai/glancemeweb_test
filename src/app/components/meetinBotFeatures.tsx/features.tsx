'use client';

import React from 'react';
import styles from './Features.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h2 className={styles.mainTitle}>Powerful Features</h2>
          <p className={styles.mainDescription}>
            Everything you need to capture, organize, and share meeting insights
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <FeatureCard 
            title="AI Recording" 
            description="Automatically record your meetings with high-quality audio and video capture."
            icon={
              <svg className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            }
          />
          <FeatureCard 
            title="Smart Transcription" 
            description="Convert speech to text with remarkable accuracy, even with multiple speakers."
            icon={
              <svg className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            }
          />
          <FeatureCard 
            title="Quick Sharing" 
            description="Share meeting recordings and transcripts with teammates in just a few clicks."
            icon={
              <svg className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            }
          />
          <FeatureCard 
            title="Meeting Summaries" 
            description="Get AI-generated summaries of your meetings with key points and action items."
            icon={
              <svg className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            }
          />
          <FeatureCard 
            title="Searchable Content" 
            description="Easily search through all your recordings and transcripts to find exactly what you need."
            icon={
              <svg className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            }
          />
          <FeatureCard 
            title="Team Collaboration" 
            description="Collaborate with your team by sharing comments and feedback directly on recordings."
            icon={
              <svg className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Features;