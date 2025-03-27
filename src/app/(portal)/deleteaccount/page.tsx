"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './deleteAccount.module.css';
import Link from 'next/link';

interface FormData {
  username: string;
  email: string;
  password: string;
  reason: string;
}

const DeleteAccount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    reason: ''
  });

  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const confirmDeletion = (): void => {
    // Handle account deletion logic here
    console.log('Account deletion confirmed', formData);
    // Redirect to confirmation page or home
    window.location.href = '/';
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainBg}></div>
      
      <div className={styles.container}>
        <div className={styles.mainHolder}>
          <div className={styles.mainHolderHeading}>
            <h1 className={styles.title}>
              Delete Your Account
            </h1>
          </div>

          <div className={styles.formContainer}>
            {!isConfirming ? (
              <form onSubmit={handleSubmit} className={styles.deleteForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="reason">Reason for Deletion</label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a reason</option>
                    <option value="notUseful">Not useful for my needs</option>
                    <option value="tooComplicated">Too complicated to use</option>
                    <option value="foundBetterAlternative">Found a better alternative</option>
                    <option value="concernsAboutPrivacy">Concerns about privacy</option>
                    <option value="temporaryBreak">Taking a temporary break</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.warningMessage}>
                  <p>Warning: This action cannot be undone. All your data and notes will be permanently deleted.</p>
                </div>

                <div className={styles.buttonGroup}>
                  <Link href="/" className={styles.cancelButton}>
                    Cancel
                  </Link>
                  <button type="submit" className={styles.deleteButton}>
                    Continue
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.confirmationContainer}>
                <h3>Are you absolutely sure?</h3>
                <p>This will permanently delete your account and all associated data. This action cannot be undone.</p>
                
                <div className={styles.buttonGroup}>
                  <button 
                    onClick={() => setIsConfirming(false)} 
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDeletion} 
                    className={styles.deleteButton}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;