'use client'
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaYoutube, FaChrome, FaMobileAlt, FaFolderOpen } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { BsCreditCard2Front } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import styles from './section_five.module.css'; // Import the CSS module

// Define the types for our FAQ items
interface FAQItem {
  id: number;
  category: string;
  heading: string;
  paragraph: string;
  tagLine?: string;
  icon?: React.ReactNode;
}

// Card component for individual FAQ items
const Card: React.FC<{ 
  faq: FAQItem; 
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}> = ({ faq, isOpen, toggleOpen, index }) => {
  
  return (
    <div 
      className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}
      data-index={index}
    >
      <div 
        className={styles.faqHeader}
        onClick={toggleOpen}
      >
        <div className={styles.faqHeaderContent}>
          {faq.icon && <div className={styles.faqIcon}>{faq.icon}</div>}
          <p>{faq.heading}</p>
        </div>
        <div className={`${styles.faqChevron} ${isOpen ? styles.rotated : ''}`}>
          <FaChevronDown />
        </div>
      </div>
      <div className={`${styles.faqDetails} ${isOpen ? styles.expanded : ''}`}>
        <p dangerouslySetInnerHTML={{ __html: faq.paragraph }}></p>
        {faq.tagLine && <p className={styles.tagLine}>{faq.tagLine}</p>}
      </div>
    </div>
  );
};

// Main FAQs component
export default function FAQs(): React.ReactNode {
  // State to track which FAQs are open
  const [openFAQs, setOpenFAQs] = useState<{ [key: number]: boolean }>({});
  // State to track active category
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // State for animation on mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle function for opening/closing FAQs
  const toggleFAQ = (id: number) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Complete list of FAQ items
  const faqItems: FAQItem[] = [
    // Getting Started
    {
      id: 1,
      category: "getting-started",
      heading: "What is Glanceme?",
      paragraph: "Glanceme is an AI-powered learning companion that helps you extract key insights from videos and text-based content.<br><br>With features like instant summaries, interactive Q&A, topic search, and personalized note taking, Glanceme transforms passive watching into active, organized learning.",
      icon: <FaYoutube />
    },
    {
      id: 2,
      category: "getting-started",
      heading: "How do I get started with Glanceme?",
      paragraph: "To begin using Glanceme, install the extension from the <a href='https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp'>Chrome Web Store</a>.<br><br>First-time users will need to create a free GlanceMe account using their email address. Existing users can log in using the same email. We provide separate pages for both sign-up and login.<br><br>We value your privacy. Your email is used only for account-related purposes and is never shared with third parties.<br><br><a href='/privacy'>Privacy Policy</a>",
      icon: <FaChrome />
    },
    
    // Using GlanceMe
    {
      id: 3,
      category: "using-glanceme",
      heading: "How does Glanceme work with YouTube videos?",
      paragraph: "When you're on a YouTube video, the Glanceme extension allows you to generate a summary, explore topic-based timestamps, ask questions, and save notes—all without leaving the video page.",
      icon: <FaYoutube />
    },
    {
      id: 4,
      category: "using-glanceme",
      heading: "What platforms does Glanceme support?",
      paragraph: "Currently, Glanceme is available as a <a href='https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp'>Chrome browser extension</a>. Support for other browsers is planned in future development.<br><br>The Android app is under development and will be released shortly, followed by the iOS app, which is partially complete.",
      icon: <FaMobileAlt />
    },
    {
      id: 5,
      category: "using-glanceme",
      heading: "What kind of questions can I ask using the Q&A feature?",
      paragraph: "You can ask anything based on the content of the video or article—like \"What exactly is LLM?\" or \"What are the key benefits discussed?\" As long as the answer exists in the content, Glanceme will find it and present it to you—instantly.",
      icon: <RiQuestionAnswerFill />
    },
    {
      id: 6,
      category: "using-glanceme",
      heading: "Can I use Glanceme on websites other than YouTube?",
      paragraph: "Yes! Glanceme also supports text-based websites. You can summarize articles, highlight key sections, save notes, and organize them just like you would with video content.",
      icon: <BiSearch />
    },
    {
      id: 7,
      category: "using-glanceme",
      heading: "Will Glanceme work with private or paid course platforms?",
      paragraph: "Currently, Glanceme is optimized for YouTube and public webpages. Support for additional platforms is on our future roadmap. Please let us know the features you'd like to see using the <a href='/support'>Contact Us</a> page.",
      icon: <FiExternalLink />
    },
    
    // Notes and Organization
    {
      id: 8,
      category: "notes",
      heading: "Can I organize my saved notes later?",
      paragraph: "Absolutely. You can create folders, add tags and color categories, and easily move notes between folders. Everything is designed to keep your knowledge archive clean, structured, and searchable.",
      icon: <FaFolderOpen />
    },
    {
      id: 9,
      category: "notes",
      heading: "Can I access and organize my saved notes on a different device?",
      paragraph: "Yes! Glanceme syncs your saved content across devices and platforms. You can view, edit, and organize your notes—create folders, move items between folders, and search by tag or keyword—whether you're on the web or (soon) mobile.",
      icon: <FaMobileAlt />
    },
    
    // Plans and Privacy
    {
      id: 10,
      category: "plans-privacy",
      heading: "Is there a cost to use Glanceme?",
      paragraph: "We're a passionate team on a mission to transform the way people learn from online videos and text. During our early phase, Glanceme is free to use as we continue to improve and grow based on your <a href='/support'>feedback</a>.<br><br>Our goal is to keep the core experience accessible for as long as possible.<br><br>If you find GlanceMe valuable and would like to support our work, consider making a small donation it helps us keep building for learners like you.<br><br>As we grow, we may introduce premium features or subscription plans to sustain development and bring even more value to our users. Rest assured, we'll remain committed to transparency and user-first design every step of the way.",
      icon: <BsCreditCard2Front />
    },
    {
      id: 11,
      category: "plans-privacy",
      heading: "Is my data private and secure?",
      paragraph: "Yes. We take your privacy seriously. Your notes and activity are stored securely and are only visible to you.<br><br>Your email is used only for account-related purposes and is never shared with third parties.<br><br>You also have full control over your data, including the option to delete your account at any time.<br><br><a href='/privacy'>Privacy Policy</a>",
      icon: <AiOutlineLock />
    },
    
    // Updates and Contact
    {
      id: 12,
      category: "updates",
      heading: "How can I stay informed about Glanceme updates?",
      paragraph: "Join our growing community of learners by subscribing to the Glanceme newsletter.<br><br>You'll receive:<br>- Product updates and feature previews<br>- Special offers<br>- Curated insights to help you learn smarter<br><br>We respect your privacy—your email is never shared, and you can unsubscribe at any time.",
      icon: <FiExternalLink />
    },
    {
      id: 13,
      category: "contact",
      heading: "How can I contact the Glanceme team?",
      paragraph: "We'd love to hear from you! Whether you're reporting an issue, sharing feedback, suggesting features, or exploring career opportunities, we're here to help.<br><br>You can contact us via our dedicated <a href='/support'>Contact Us</a> page or by emailing support@glanceme.ai.<br><br>We respond to most queries within 24–48 hours during weekdays.",
      icon: <MdEmail />
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: "All FAQs" },
    { id: "getting-started", name: "Getting Started" },
    { id: "using-glanceme", name: "Using Glanceme" },
    { id: "notes", name: "Notes & Organization" },
    { id: "plans-privacy", name: "Plans & Privacy" },
    { id: "updates", name: "Updates" },
    { id: "contact", name: "Contact" }
  ];

  // Filter FAQs based on active category
  const filteredFAQs = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(faq => faq.category === activeCategory);

  return (
    <div className={`${styles.faqsContainer} ${mounted ? styles.mounted : ''}`}>
      <div className={styles.faqsBackground}></div>
      <div className={styles.faqsGlow1}></div>
      <div className={styles.faqsGlow2}></div>
      
      <div className={styles.faqsHeader}>
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about Glanceme</p>
        
        <div className={styles.categoryFilters}>
          {categories.map(category => (
            <button 
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.faqsContent}>
        {/* <div className={styles.faqsIntro}>
          <div className={styles.introText}>
            <h2>
              You ask <span className={styles.gradientText}><BsArrowRight size={24} /></span> We answer
            </h2>
            <p>Find all the information you need about Glanceme.AI</p>
          </div>
        </div> */}

        <div className={styles.faqsList}>
          {filteredFAQs.map((faq, index) => (
            <Card 
              key={faq.id}
              faq={faq}
              isOpen={!!openFAQs[faq.id]}
              toggleOpen={() => toggleFAQ(faq.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}