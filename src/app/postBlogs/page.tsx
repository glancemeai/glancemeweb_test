'use client';

import React, { useState } from 'react';
import styles from "./postBlog.module.css";
import Apis from '../service/hooks/ApiSlugs';
import dynamic from 'next/dynamic';

interface BlogData {
    title: string;
    content: string;
    author: string;
}

const PostBlogPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminToken, setAdminToken] = useState('');
    const [tokenInput, setTokenInput] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [authError, setAuthError] = useState('');
    const api = Apis();
    const URL = "http://localhost:3000/v1/api";
    const RichTextEditor = dynamic(() => import('../components/RichTextEditor-2/RichText'), {
  ssr: false,
});

    const [blogData, setBlogData] = useState<BlogData>({
        title: '',
        content: '',
        author: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

    const handleTokenVerification = async () => {
        if (!tokenInput.trim()) {
            setAuthError('Please enter an admin token');
            return;
        }
        console.log(tokenInput);

        setIsVerifying(true);
        setAuthError('');

        try {
            const response = await fetch(`${URL}/auth/verify-token`, {
                method: 'POST',
                headers: {
                    'Authorization': tokenInput,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                setAdminToken(tokenInput);
                setIsAuthenticated(true);
                setSubmitMessage('');
            } else {
                const data = await response.json();
                setAuthError(data.message || 'Invalid admin token');
            }
        } catch (error) {
            setAuthError('Error verifying token');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleInputChange = (field: keyof BlogData, value: string) => {
        setBlogData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleContentChange = (content: string) => {
        setBlogData(prev => ({
            ...prev,
            content
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!blogData.title.trim() || !blogData.content.trim() || !blogData.author.trim()) {
            setSubmitMessage('Please fill in all fields');
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');
        setSubmitStatus('');

        try {
            const result = await api.PostBlog(blogData, adminToken);
            
            if (result.status === 200) {
                setSubmitMessage('Blog posted successfully!');
                setSubmitStatus('success');
                setBlogData({ title: '', content: '', author: '' });
            } else {
                setSubmitMessage(result.message || 'Failed to post blog');
                setSubmitStatus('error');
                
                if (result.status === 401 || result.status === 403) {
                    setIsAuthenticated(false);
                    setAdminToken('');
                    setTokenInput('');
                    setAuthError('Session expired. Please re-authenticate.');
                }
            }
        } catch (error) {
            setSubmitMessage('An unexpected error occurred');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setAdminToken('');
        setTokenInput('');
        setBlogData({ title: '', content: '', author: '' });
        setSubmitMessage('');
        setSubmitStatus('');
        setAuthError('');
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <h1 className={styles.title}>Admin Authentication</h1>
                        <p className={styles.subtitle}>Enter your admin token to access the blog posting interface</p>
                    </div>
                    
                    <div className={styles.authForm}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="adminToken" className={styles.label}>
                                Admin Token
                            </label>
                            <input
                                id="adminToken"
                                type="password"
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
                                placeholder="Enter your admin token"
                                className={styles.tokenInput}
                                onKeyPress={(e) => e.key === 'Enter' && handleTokenVerification()}
                            />
                        </div>
                        
                        {authError && (
                            <div className={styles.errorMessage}>
                                {authError}
                            </div>
                        )}
                        
                        <button
                            onClick={handleTokenVerification}
                            disabled={isVerifying}
                            className={styles.verifyButton}
                        >
                            {isVerifying ? 'Verifying...' : 'Authenticate'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Create New Blog Post</h1>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.blogForm}>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title" className={styles.label}>
                            Blog Title *
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={blogData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Enter blog title"
                            className={styles.input}
                            required
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="author" className={styles.label}>
                            Author *
                        </label>
                        <input
                            id="author"
                            type="text"
                            value={blogData.author}
                            onChange={(e) => handleInputChange('author', e.target.value)}
                            placeholder="Enter author name"
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        Blog Content *
                    </label>
                    <div className={styles.editorWrapper}>
                        <RichTextEditor
                            value={blogData.content}
                            onChange={handleContentChange}
                        />
                    </div>
                </div>

                {submitMessage && (
                    <div className={`${styles.message} ${styles[submitStatus]}`}>
                        {submitMessage}
                    </div>
                )}

                <div className={styles.formActions}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostBlogPage;