import React from 'react';
import styles from './upcomingMeeting.module.css'
const UpcomingMeeting: React.FC = () => {
  return (
    <div className={styles.noMeetings}>
      
      <p> No upcoming meetings.</p>
    </div>
  );
};

export default UpcomingMeeting;
