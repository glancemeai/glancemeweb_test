import React from 'react';
import Header from '../home/header/header';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence (AI)',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career or transform your existing one.',
    coverImage: '/images/ai-intro.png',
    category: 'Generative AI',
    slug: 'introduction-to-artificial-intelligence'
  },
  {
    id: '2',
    title: 'AI Transparency & Accountability',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications and launch your AI career.',
    coverImage: '/images/ai-transparency.png',
    category: 'Generative AI',
    slug: 'ai-transparency-and-accountability'
  },
  {
    id: '3',
    title: 'Introduction to ChatGPT',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications.',
    coverImage: '/images/chatgpt-intro.png',
    category: 'Generative AI',
    slug: 'introduction-to-chatgpt'
  },
  {
    id: '4',
    title: 'Introduction to Artificial Intelligence Tools',
    excerpt: 'Artificial Intelligence (AI) is all around us, seamlessly integrated into our daily lives and work. Enroll in this course to understand the key AI terminology and applications.',
    coverImage: '/images/ai-tools.png',
    category: 'Generative AI',
    slug: 'introduction-to-artificial-intelligence-tools'
  },
  {
    id: '5',
    title: '16 little UI design tips that make a big impact',
    excerpt: 'A step by step UI design case study to specify UI on example user interface using high-level design tips.',
    coverImage: '/images/chatgpt-intro.png',
    category: 'Design',
    slug: '16-little-ui-design-tips'
  }
];

const BlogPage: React.FC = () => {
  // Filter the featured blog (latest post)
  const featuredBlog = blogPosts[0];
  const otherBlogs = blogPosts.slice(1);

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <h1 className={styles.title}>Catch up with our latest blog</h1>
        
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Recent Post</h2>
          <div className={styles.featuredPost}>
            <div className={styles.featuredImageContainer}>
              <Image
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                width={500}
                height={300}
                className={styles.featuredImage}
              />
            </div>
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>{featuredBlog.title}</h3>
              <p className={styles.featuredExcerpt}>{featuredBlog.excerpt}</p>
              <div className={styles.categoryTag}>{featuredBlog.category}</div>
            </div>
          </div>
        </section>

        <section className={styles.blogSection}>
          <h2 className={styles.sectionTitle}>Other Blogs</h2>
          <div className={styles.blogGrid}>
            {otherBlogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className={styles.blogCard}>
                <div className={styles.blogImageContainer}>
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className={styles.blogImage}
                  />
                </div>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                <div className={styles.categoryTag}>{blog.category}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;