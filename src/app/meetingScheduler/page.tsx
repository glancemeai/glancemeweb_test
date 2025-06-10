'use client';

import React, { useState, useEffect } from 'react';
import styles from './MeetingScheduler.module.css';
import Header from "../home/header/header";
import CreateMeeting from './CreateMeeting';
import InstantMeeting from './instantMeeting';
import { LuPlus } from "react-icons/lu";
import { FiMic, FiCalendar, FiUpload, FiSearch } from "react-icons/fi";
import ButtonOne, { ButtonFive, ButtonFour } from "@/app/components/utils/Edit/buttons/Buttons";
import { SearchInput } from "@/app/components/utils/Edit/Input/Input";
import UpcomingMeetings from './upcomingMeeting';
import PreviousMeeting from './previousMeeting';
import { useSearchParams } from 'next/navigation';

interface CalendarEvent {
  summary: string;
  start: { dateTime: string };
  category?: string;
}

const MeetingScheduler: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [showInstant, setShowInstant] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcomingMeeting' | 'previousMeeting'>('upcomingMeeting');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams?.get('token');
    const storedToken = localStorage.getItem('google_access_token');
    const token = tokenFromUrl || storedToken;

    if (tokenFromUrl) {
      localStorage.setItem('google_access_token', tokenFromUrl);
      console.log('✅ Access token saved:', tokenFromUrl);
    }

    if (!token) {
      console.warn('⚠️ No access token found');
      return;
    }

    const fetchEvents = async () => {
      try {
        const timeMin = new Date().toISOString();
        const timeMax = new Date();
        timeMax.setMonth(timeMax.getMonth() + 12); // Fetch events for the next 12 months

        const response = await fetch(
         `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=250&orderBy=startTime&singleEvents=true&timeMin=${timeMin}&timeMax=${timeMax.toISOString()}`,
     {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const normalized = (data.items || []).map((event: any) => ({
          summary: event.summary || 'Untitled',
          start: {
            dateTime: event.start?.dateTime || event.start?.date || new Date().toISOString(),
          }
        }));
        setEvents(normalized);
        console.log('✅ Events fetched:', normalized);
      } catch (err) {
        console.error('❌ Error fetching events:', err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [searchParams]);

  const handleCreateMeeting = (newMeeting: CalendarEvent) => {
    setEvents(prev => [...(prev || []), newMeeting]);
    setShowPopup(false);
  };

  
  const handleGoogleSync = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const redirectUri = 'http://localhost:3000/api/auth/callback';
  const scope = 'https://www.googleapis.com/auth/calendar.readonly';

  if (!clientId) {
    console.error('❌ Google Client ID not found in environment variables');
    return;
  }

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=consent&access_type=offline`;
  window.open(oauthUrl, '_blank');
};


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
                <div className={styles.dropdownWrapper}>
                  <ButtonFive icon={<LuPlus size={20} color="#848484" />} />
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownItem} onClick={() => setShowInstant(true)}>
                      <FiMic size={18} />
                      <span>Instant Meeting</span>
                    </div>
                    <div className={styles.dropdownItem} onClick={handleGoogleSync}>
                      <FiUpload size={18} />
                      <span>Sync Calendar</span>
                    </div>
                    <div className={styles.dropdownItem} onClick={() => setShowPopup(true)}>
                      <FiCalendar size={18} />
                      <span>Schedule Meeting</span>
                    </div>
                  </div>
                </div>
                <div className={styles.mainHolderHeaderOptionsSearch}>
                  <SearchInput type="text" placeholder="Search by  month name"   value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                       />
                       {/* <input
                           type="text"
                                      placeholder="Search by month name"
                          value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                      /> */}

                  <ButtonFour icon={<FiSearch size={18} color="#fff" />} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mainHolderBody}>
            <div className={styles.mainHolderBodyLeft}>
              <div className={styles.mainHolderBodyLeftSection}>
                <p
                  className={activeTab === 'upcomingMeeting' ? styles.activeTab : ''}
                  onClick={() => setActiveTab('upcomingMeeting')}
                >
                  Upcoming Meetings
                </p>
                <p
                  className={activeTab === 'previousMeeting' ? styles.activeTab : ''}
                  onClick={() => setActiveTab('previousMeeting')}
                >
                  Previous Meetings
                </p>
              </div>
            </div>
            <div className={styles.mainHolderBodyRight}>
              {activeTab === 'upcomingMeeting' && <UpcomingMeetings events={events} searchQuery={searchQuery} />}
              {activeTab === 'previousMeeting' && <PreviousMeeting />}
            </div>
          </div>
        </div>

        {showPopup && <CreateMeeting onClose={() => setShowPopup(false)} onCreate={handleCreateMeeting} />}
        {showInstant && <InstantMeeting onClose={() => setShowInstant(false)} />}
      </div>
    </>
  );
};

export default MeetingScheduler;
