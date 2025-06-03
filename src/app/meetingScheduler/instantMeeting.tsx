'use client';
import React, { useState, useRef } from 'react';
// import styles from './InstantMeeting.module.css';
import { useRouter } from 'next/navigation';
import styles from './CreateMeeting.module.css';
interface InstantMeetingProps {
  onClose: () => void;
}

const InstantMeeting: React.FC<InstantMeetingProps> = ({ onClose }) => {
  const [meetingUrl, setMeetingUrl] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const validateMeetingUrl = (url: string) => {
    const patterns = [
      /^https:\/\/(meet\.google\.com)\/.+$/i,
      /^https:\/\/(teams\.microsoft\.com)\/.+$/i,
      /^https:\/\/([a-z0-9-]+\.)?zoom\.us\/.+$/i,
    ];
    return patterns.some((pattern) => pattern.test(url));
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateMeetingUrl(meetingUrl)) {
      window.open(meetingUrl, '_blank');
      onClose(); // Close after successful join
    } else {
      setError('Please enter a valid Google Meet, Microsoft Teams, or Zoom link.');
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.cardTitle}>Enter Meeting URL</h3>
        <form onSubmit={handleJoin}>
          <div className={styles.formRow}>
            <input
              type="url"
              ref={inputRef}
              className={styles.popupInput}
              placeholder="https://your-meeting-url.com"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <div className={styles.buttonRow}>
            <button type="submit" className={styles.nextButton}>
              Join Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstantMeeting;
