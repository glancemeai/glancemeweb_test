'use client';
import React, { useState } from 'react';
import styles from './MeetingScheduler.module.css';
import Header from "../home/header/header";
import CreateMeeting from './CreateMeeting';

const MeetingScheduler: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.mainBg}>
          <div className={styles.mainHolder}>
            <div className={styles.mainHolderHeader}>
              <div className={styles.mainHolderHeaderTitle}>
                <p>All Meetings</p>
              </div>
              <div className={styles.mainHolderHeaderOptions}>
                <button className={styles.primaryButton} onClick={() => setShowPopup(true)}>
                  Create Meeting
                </button>
                <button className={styles.primaryButton}>sync calander</button>
                <button className={styles.primaryButton}>Previous Meeting</button>
              </div>
            </div>
          </div>
        </div>
        {showPopup && <CreateMeeting onClose={() => setShowPopup(false)} />}
      </div>
    </>
  );
};

export default MeetingScheduler;
