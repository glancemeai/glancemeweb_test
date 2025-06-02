"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './products.module.css';
import Header from '../home/header/header';
import { BsStars } from "react-icons/bs";
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
}

const ProductsPage: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const products: Product[] = [
    {
      id: 'recap',
      title: 'Recap',
      subtitle: 'AI-Powered Learning Assistant',
      // description: 'Transform any audio lecture into comprehensive summaries and interactive quizzes. Perfect for students and educators looking to maximize learning efficiency.',
      description: 'Recap is designed to enhance learner engagement by generating real-time quizzes and assignments during in-person sessions. Perfect for students and educators seeking to maximize interaction and learning outcomes.',
      features: [
        'Real-time audio transcription and summarization',
        'AI-generated quizzes based on lecture content',
        'Shareable links for student access',
        'Smart topic extraction and key point identification',
        'Multi-language support for global accessibility'
      ],
      icon: '🎧',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'meetingbot',
      title: 'Meeting Bot',
      subtitle: 'Smart Meeting Intelligence',
      description: 'Automatically join meetings, capture insights, and generate actionable summaries. Never miss important details or action items again.',
      features: [
        'Autonomous meeting participation',
        'Intelligent meeting minutes generation',
        'Interactive Q&A with meeting content',
        'Automated action item extraction',
        'Multi-platform meeting support (Zoom, Teams, Meet)'
      ],
      icon: '🤖',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'glanceme',
      title: 'GlanceMe Extension',
      subtitle: 'YouTube Learning Companion',
      description: 'Enhance your YouTube learning experience with AI-powered summaries, smart notes, and interactive flashcards for any video content.',
      features: [
        'Instant video summaries and topic extraction',
        'AI-generated study notes and flashcards',
        'Pause-and-note functionality',
        'Searchable content library',
        'Export notes in multiple formats'
      ],
      icon: '📚',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
        <Header />
      <div className={styles.containerBg}></div>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <h2 
          id="main-subtitle"
          data-animate
          className={`${styles.subtitleAnimation} ${visibleElements.has('main-subtitle') ? styles.visible : ''}`}
        >
          Glanceme Products
          <span className={styles.starsIcon}><BsStars color='blue' size={40}/></span>
        </h2>
        <p 
          id="hero-description"
          data-animate
          className={`${styles.heroDescription} ${visibleElements.has('hero-description') ? styles.visible : ''}`}
        >
          Discover our suite of AI-powered tools designed to revolutionize how you learn, 
          collaborate, and consume content. Built for the modern digital workspace.
        </p>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <div
              key={product.id}
              id={`product-${product.id}`}
              data-animate
              className={`${styles.productCard} ${visibleElements.has(`product-${product.id}`) ? styles.visible : ''}`}
              style={{ '--animation-delay': `${index * 0.2}s` } as React.CSSProperties}
            >
              <div className={styles.productHeader}>
                <div 
                  className={styles.productIcon}
                  style={{ background: product.gradient }}
                >
                  <span>{product.icon}</span>
                </div>
                <div className={styles.productTitleSection}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <h4 
                    className={styles.productSubtitle}
                    style={{ background: product.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {product.subtitle}
                  </h4>
                </div>
              </div>
              
              <p className={styles.productDescription}>
                {product.description}
              </p>
              
              <div className={styles.featuresSection}>
                <h5 className={styles.featuresTitle}>Key Features</h5>
                <ul className={styles.featuresList}>
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.featureItem}>
                      <span className={styles.featureIcon}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.productActions}>
                <button className={styles.primaryButton}>
                  <Link href={"/meetingBot"}>Learn More</Link>
                </button>
                <button className={styles.secondaryButton}>
                  Try Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div 
          id="cta-content"
          data-animate
          className={`${styles.ctaContent} ${visibleElements.has('cta-content') ? styles.visible : ''}`}
        >
          <h2 className={styles.ctaTitle}>Ready to Transform Your Workflow?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of users who are already experiencing the power of AI-driven productivity tools.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary}>Get Started Free</button>
            <button className={styles.ctaSecondary}>Schedule Demo</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;