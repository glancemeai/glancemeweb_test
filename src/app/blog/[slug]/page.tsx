"use client"
import React, { useEffect, useState } from 'react';
import Header from '../../home/header/header';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import styles from './blogpost.module.css'


interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  slug: string;
  content?: string;
}

interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence (AI)',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.',
    coverImage: '/images/ai-intro.jpg',
    category: 'Generative AI',
    slug: 'introduction-to-artificial-intelligence',
    content: `
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.

      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      ## Key Concepts in AI
      
      - Machine Learning
      - Neural Networks
      - Deep Learning
      - Natural Language Processing
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
    `
  },

  {
    id: '2',
    title: 'Introduction to Artificial Intelligence (AI)',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.',
    coverImage: '/images/ai-intro.png',
    category: 'Generative AI',
    slug: 'ai-transparency-and-accountability',
    content: `
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.

      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      ## Key Concepts in AI
      
      - Machine Learning
      - Neural Networks
      - Deep Learning
      - Natural Language Processing
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
    `
  },
  {
    id: '3',
    title: 'Introduction to Artificial Intelligence (AI)',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.',
    coverImage: '/images/chatgpt-intro.png',
    category: 'Generative AI',
    slug: 'introduction-to-chatgpt',
    content: `
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.

      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      ## Key Concepts in AI
      
      - Machine Learning
      - Neural Networks
      - Deep Learning
      - Natural Language Processing
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
    `
  },
  {
    id: '4',
    title: 'Introduction to Artificial Intelligence (AI)',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.',
    coverImage: '/images/ai-tools.png',
    category: 'Generative AI',
    slug: 'introduction-to-artificial-intelligence-tools',
    content: `
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.

      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
      
      ## Key Concepts in AI
      
      - Machine Learning
      - Neural Networks
      - Deep Learning
      - Natural Language Processing
      
      Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.
    `
  },
  {
    id: '5',
    title: '16 little UI design tips that make a big impact',
    excerpt: 'A step by step UI design case study to specify UI on example user interface using high-level design tips.',
    coverImage: '/images/chatgpt-intro.png',
    category: 'Design',
    slug: '16-little-ui-design-tips',
    content: `
      A step by step UI design case study to specify UI on example user interface using high-level design tips.
      
      Use intuitive layouts that allow users to easily navigate products, use simple, consistent, and clean visual design that can be overwhelming when you add visually. To avoid this, use psychology to the design and visuals.
      
      The world of UI/UX design is fast-paced and many UI designers wonder what a good UI design is or is not. Most UX/UI designers are scared to make big mistakes and don't want to add unnecessary work generated by a design or digital problems. We should focus on intuitive metrics and simple guidelines.
      
      New UI/UX designers have hard and stressful times at the start, sometimes, and bad UX metrics design can be the reason for this. As we should not have UI/UX designs too much, and they should indicate logical design, you're just using UI testing to check (and build) not a scary story.
      
      Working systems in the designers' world are all you need but also essential, but it can add immensely unclear. Like going to workshops and making sense of it, it's the most important thing to have a clean design but using layers of planning is very effective and simple with to score before elements. You can also describe all this in a minimal UI/UX design (properly) most clearly.
      
      Always having a focused approach is crucial to every stage, but most designers say simplicity is refreshed and difficult to understand. Use colors that are meaningful, add typography and colors to make a mood (and contrast, for elements.

      ## Key UI Design Principles
      
      1. Use whitespace effectively
      2. Create visual hierarchy
      3. Ensure consistent design elements
      4. Use color psychology strategically
      5. Make interfaces responsive and accessible
    `
  }
];

// Sample comments data
const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Tarini Shrivastav',
    date: 'Mar 4, 2025',
    text: 'Great article 👏 You clearly demonstrated that UI design is mostly about following logical rules and guidelines!'
  },
  {
    id: '2',
    author: 'Marc Kassel',
    date: 'Feb 12, 2025',
    text: 'Good read! Clear structure and explaining every "rule" in a separate paragraph step by step. That\'s how it should be done.'
  }
];

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  
  // Find the blog post with the matching slug
  const blogPost = blogPosts.find(post => post.slug === slug);
  
  // Handle case when blog post is not found or page is still loading
  if (!blogPost) {
    return <div>Loading...</div>;
  }

  // Function to copy current URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    alert('Link copied to clipboard!');
  };

  // Function to handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: (comments.length + 1).toString(),
      author: 'Current User',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: newComment
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  // Function to handle social media sharing
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${currentUrl}`)}`, '_blank');
        break;
      default:
        break;
    }

    toggleShareModal();
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Top Bar with Search and Action Buttons */}
        <div className={styles.topBar}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search Blogs"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={styles.actionButton} aria-label="Comment">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
            
            <button 
              className={styles.actionButton} 
              aria-label="Share"
              onClick={toggleShareModal}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Share Modal */}
        {showShareModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.shareModal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.shareTitle}>Share</h3>
              <button 
                className={styles.closeButton} 
                onClick={toggleShareModal}
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.socialButtons}>
              {/* WhatsApp */}
              <button 
                className={styles.socialButton}
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
              >
                <div className={styles.iconWrapper}>
                  <div className={`${styles.iconCircle} ${styles.whatsappBg}`}>
                    <Image 
                      src="/images/whatsapp.png" 
                      alt="WhatsApp" 
                      width={24} 
                      height={24}
                      className={styles.socialIcon} 
                    />
                  </div>
                </div>
                <span>WhatsApp</span>
              </button>
              
              {/* Pinterest */}
              <button 
                className={styles.socialButton}
                onClick={() => handleShare('pinterest')}
                aria-label="Share on Pinterest"
              >
                <div className={styles.iconWrapper}>
                  <div className={`${styles.iconCircle} ${styles.pinterestBg}`}>
                    <Image 
                      src="/images/mdi_pinterest.png" 
                      alt="Pinterest" 
                      width={24} 
                      height={24}
                      className={styles.socialIcon} 
                    />
                  </div>
                </div>
                <span>Pinterest</span>
              </button>
              
              {/* Facebook */}
              <button 
                className={styles.socialButton}
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
              >
                <div className={styles.iconWrapper}>
                  <div className={`${styles.iconCircle} ${styles.facebookBg}`}>
                    <Image 
                      src="/images/ri_facebook-fill.png" 
                      alt="Facebook" 
                      width={24} 
                      height={24}
                      className={styles.socialIcon} 
                    />
                  </div>
                </div>
                <span>Facebook</span>
              </button>
              
              {/* Email */}
              <button 
                className={styles.socialButton}
                onClick={() => handleShare('email')}
                aria-label="Share via Email"
              >
                <div className={styles.iconWrapper}>
                  <div className={`${styles.iconCircle} ${styles.emailBg}`}>
                    <Image 
                      src="/images/mail.png" 
                      alt="Email" 
                      width={24} 
                      height={24}
                      className={styles.socialIcon} 
                    />
                  </div>
                </div>
                <span>Email</span>
              </button>
            </div>
            
            <div className={styles.copyLinkContainer}>
              <input 
                type="text" 
                value={currentUrl} 
                readOnly 
                className={styles.linkInput} 
              />
              <button onClick={copyToClipboard} className={styles.copyButton}>Copy</button>
            </div>
          </div>
        </div>
      )}
        
        
        <article className={styles.blogPost}>
          <div className={styles.blogHeader}>
            <h1 className={styles.blogTitle}>{blogPost.title}</h1>
            <div className={styles.categoryTag}>#{blogPost.category.replace(/\s+/g, '')}</div>
          </div>
          
          <div className={styles.coverImageContainer}>
            <Image
              src={blogPost.coverImage}
              alt={blogPost.title}
              width={800}
              height={400}
              className={styles.coverImage}
            />
          </div>
          
          <div className={styles.content}>
            {blogPost.content?.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('##')) {
                return <h2 key={index} className={styles.subheading}>{paragraph.replace('##', '').trim()}</h2>;
              } else if (paragraph.trim().startsWith('-')) {
                return <ul key={index} className={styles.list}><li>{paragraph.replace('-', '').trim()}</li></ul>;
              } else if (paragraph.trim().startsWith('1.')) {
                return <ol key={index} className={styles.orderedList}><li>{paragraph.replace('1.', '').trim()}</li></ol>;
              } else if (paragraph.trim()) {
                return <p key={index} className={styles.paragraph}>{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </article>
        
        {/* Comments Section */}
        <section className={styles.commentsSection}>
          <h3 className={styles.commentsTitle}>
            Comments <span className={styles.commentsCount}>({comments.length})</span>
          </h3>
          
          {comments.map(comment => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAvatar}>
                 
                </div>
                <div className={styles.commentAuthorInfo}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <span className={styles.commentDate}>{comment.date}</span>
                </div>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
              <div className={styles.commentActions}>
                <button className={styles.commentAction}>Reply</button>
              </div>
            </div>
          ))}
          
          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className={styles.newCommentForm}>
            <textarea 
              className={styles.commentTextarea}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className={styles.commentFormButtons}>
              <button type="button" className={styles.cancelButton} onClick={() => setNewComment('')}>
                Cancel
              </button>
              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default BlogPostPage;