
'use client';
import React, { useState } from 'react';
import styles from './MeetingScheduler.module.css';
import Header from "../home/header/header";
import CreateMeeting from './CreateMeeting';
import InstantMeeting from './instantMeeting';
import { LuPlus } from "react-icons/lu";
import { FiMic, FiCalendar, FiUpload, FiSearch } from "react-icons/fi";
import ButtonOne, { ButtonFive, ButtonFour } from "@/app/components/utils/Edit/buttons/Buttons";
import { SearchInput } from "@/app/components/utils/Edit/Input/Input";
import UpcomingMeeting from './upcomingMeeting';
import PreviousMeeting from './previousMeeting';



const MeetingScheduler: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showInstant, setShowInstant] = useState(false);
  const [activeTab, setActiveTab] = useState('upcomingMeeting');


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
                    <div className={styles.dropdownItem}>
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
                  <SearchInput type="text" placeholder="Search in this Folder" />
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
              {activeTab === 'upcomingMeeting' && <UpcomingMeeting />}
              {activeTab === 'previousMeeting' && <PreviousMeeting />}
            </div>
          </div>
        </div>

        {showPopup && <CreateMeeting onClose={() => setShowPopup(false)} />}
        {showInstant && <InstantMeeting onClose={() => setShowInstant(false)} />}
      </div>
    </>
  );
};

export default MeetingScheduler;
