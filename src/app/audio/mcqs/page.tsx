'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './McqForm.module.css';

export default function McqLanding() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mcqId, setMcqId] = useState('1o238081230812'); 
  const [errors, setErrors] = useState({ name: '', email: '', mcqId: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { name: '', email: '', mcqId: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (mcqId === '') {
      newErrors.mcqId = 'MCQ ID cannot be empty';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ name, email }));
        router.push(`/audio/mcqs/${mcqId}`);
      }, 800); 
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainBg}></div>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Welcome to the MCQ Platform</h1>
          <p className={styles.subtitle}>Please enter your details to begin</p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input
                type="text"
                id="name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="mcqId" className={styles.label}>MCQ ID</label>
              <input
                type="text"
                id="mcqId"
                className={styles.input}
                value={mcqId}
                onChange={(e) => setMcqId(e.target.value)}
                placeholder="Enter MCQ ID or use default"
              />
              <small className={styles.hint}>Using default ID if not changed</small>
              {errors.mcqId && <span className={styles.error}>{errors.mcqId}</span>}
            </div>
            
            <button 
              type="submit" 
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Go to MCQs'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}