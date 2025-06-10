// components/syncCalendar.tsx
'use client';
import React from 'react';

const CLIENT_ID = '954431248017-oetebtv4igaghdovj6353q7sut533bag.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback';
const SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';
const RESPONSE_TYPE = 'code';

const SyncCalendar: React.FC = () => {
  const handleSync = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&prompt=consent&access_type=offline`;

    // Open Google OAuth in new tab
    window.open(authUrl, '_blank', 'width=500,height=600');
  };

  return (
    <div onClick={handleSync} style={{ cursor: 'pointer' }}>
      Syncing Google Calendar...
    </div>
  );
};

export default SyncCalendar;
