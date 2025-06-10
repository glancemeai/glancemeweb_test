'use client';

import React, { useState } from 'react';
import styles from './upcomingMeeting.module.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

interface CalendarEvent {
  summary: string;
  start: { dateTime: string };
  category?: string;
}

interface Props {
  events: CalendarEvent[];
  searchQuery: string;
}

const formatDateHeader = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

const getDateKey = (dateString: string) =>
  new Date(dateString).toISOString().split('T')[0];

const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

const FILTERS = ['Day', 'Week', 'Month',  'Schedule', '4 days'];

const UpcomingMeetings: React.FC<Props> = ({ events, searchQuery }) => {
  const [selectedFilter, setSelectedFilter] = useState('Month');
  const now = new Date();

  const getFilterEndDate = (start: Date) => {
    const newDate = new Date(start);
    switch (selectedFilter) {
      case 'Day':
        newDate.setHours(23, 59, 59, 999);
        break;
      case 'Week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'Month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      
      case '4 days':
        newDate.setDate(newDate.getDate() + 4);
        break;
      case 'Schedule':
      default:
        return null;
    }
    return newDate;
  };

  const endDate = getFilterEndDate(now);

  const futureEvents = events.filter((event) => {
    const eventDate = new Date(event.start.dateTime);
    const isAfterNow = eventDate.getTime() > now.getTime();
    const isBeforeEnd = endDate ? eventDate.getTime() < endDate.getTime() : true;
    return isAfterNow && isBeforeEnd;
  });

  const filteredEventsBySearch = futureEvents.filter((event) => {
  if (!searchQuery.trim()) return true;

  const query = searchQuery.toLowerCase().trim();

  const eventDate = new Date(event.start.dateTime);
  const eventMonth = eventDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const eventTitle = event.summary?.toLowerCase() || '';

  return eventMonth.includes(query) || eventTitle.includes(query);
});


  const sorted = [...filteredEventsBySearch].sort(
    (a, b) =>
      new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime()
  );

  const grouped = sorted.reduce((acc, event) => {
    const key = getDateKey(event.start.dateTime);
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className={styles.container}>
      {/* Filter Dropdown */}
      <div className={styles.filterContainer}>
        <select
          className={styles.dropdown}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {FILTERS.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      {/* Meeting Cards */}
      <div className={styles.scrollWrapper}>
        {Object.entries(grouped).map(([dateKey, dayEvents]) => (
          <div key={dateKey} className={styles.dayGroup}>
            <div className={styles.dateHeader}>
              <div className={styles.dateCircle}>
                <p className={styles.dateNumber}>
                  {new Date(dateKey).getDate()}
                </p>
                <p className={styles.dateMonth}>
                  {new Date(dateKey)
                    .toLocaleDateString('en-US', { month: 'short' })
                    .toUpperCase()}
                </p>
              </div>
              <div>
                <h3 className={styles.dateTitle}>{formatDateHeader(dateKey)}</h3>
                <p className={styles.meetingCount}>
                  {dayEvents.length} meeting{dayEvents.length > 1 ? 's' : ''} scheduled
                </p>
              </div>
            </div>

            <div className={styles.cardsContainer}>
              {dayEvents.map((event, idx) => (
                <div className={styles.card} key={idx}>
                  <h4 className={styles.cardTitle}>{event.summary}</h4>
                  <div className={styles.cardDetails}>
                    <p>
                      <FaCalendarAlt className={styles.icon} />
                      {new Date(event.start.dateTime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p>
                      <FaClock className={styles.icon} />
                      {formatTime(event.start.dateTime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeetings;
