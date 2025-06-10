'use client';

import React, { useRef, useState } from 'react';
import { Video } from 'lucide-react';
import styles from './CreateMeeting.module.css';

interface CreateMeetingProps {
  onClose: () => void;
  onCreate: (meeting: any) => void;
}

const CreateMeeting: React.FC<CreateMeetingProps> = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [startTimeError, setStartTimeError] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantInput, setParticipantInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const firstFormRef = useRef<HTMLFormElement>(null);
  const secondFormRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const today = new Date();
  const todayDateStr = today.toISOString().split('T')[0];
  const currentTimeStr = today.toTimeString().slice(0, 5);

  const handleFirstNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstFormRef.current?.checkValidity()) {
      setStep(2);
    } else {
      firstFormRef.current?.reportValidity();
    }
  };

  const handleSecondNext = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(secondFormRef.current!);
    const selectedDate = formData.get('startDate') as string;
    const selectedTime = formData.get('startTime') as string;

    setStartTimeError('');
    let valid = true;

    if (selectedDate === todayDateStr && selectedTime <= currentTimeStr) {
      setStartTimeError('Start time must be after current time.');
      valid = false;
    }

    if (secondFormRef.current?.checkValidity() && valid) {
      setStartDate(selectedDate);
      setStartTime(selectedTime);
      setStep(3);
    }
  };

  const handleAddParticipant = () => {
    if (participantInput.trim()) {
      setParticipants(prev => [...prev, participantInput.trim()]);
      setParticipantInput('');
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateMeeting = () => {
    const title = titleRef.current?.value || 'Untitled Meeting';

    if (!startDate || !startTime) {
      console.error("Start date or time is missing");
      return;
    }

    const [year, month, day] = startDate.split('-').map(Number);
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);

    const newMeeting = {
      summary: title,
      start: { dateTime: start.toISOString() },
      recurrence: [],
      participants,
    };

    console.log('Meeting Created:', newMeeting);
    onCreate(newMeeting);
    onClose();
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {step === 1 && (
          <>
            <h3 className={styles.cardTitle}>Enter Meeting URL</h3>
            <form ref={firstFormRef} onSubmit={handleFirstNext}>
              <div className={styles.formRow}>
                <input
                  type="url"
                  name="meetingUrl"
                  className={styles.popupInput}
                  placeholder="https://your-meeting-url.com"
                  required
                />
              </div>
              <div className={styles.buttonRow}>
                <button type="submit" className={styles.nextButton}>Next</button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className={styles.cardTitle}>
              <Video size={24} className={styles.cardIcon} /> Schedule New Meeting
            </h3>
            <form ref={secondFormRef} onSubmit={handleSecondNext} className={styles.compactForm}>
              <div className={styles.formRow}>
                <label className={styles.inlineLabel}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={todayDateStr}
                  min={todayDateStr}
                  className={styles.popupInput}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label className={styles.inlineLabel}>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  className={styles.popupInput}
                  required
                />
              </div>
              {startTimeError && <p className={styles.errorText}>{startTimeError}</p>}
              <div className={styles.buttonRow}>
                <button type="submit" className={styles.nextButton}>Next</button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className={styles.cardTitle}>Meeting Details</h3>
            <div className={styles.formRow}>
              <input
                ref={titleRef}
                type="text"
                placeholder="Meeting Title (optional)"
                className={styles.popupInput}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.participantInputWrapper}>
                <input
                  type="text"
                  placeholder="Add participant (optional)"
                  value={participantInput}
                  onChange={(e) => setParticipantInput(e.target.value)}
                  className={styles.popupInput}
                />
                <button type="button" onClick={handleAddParticipant} className={styles.addButton}>➕</button>
              </div>
            </div>
            <ul className={styles.participantList}>
              {participants.map((p, i) => (
                <li key={i} className={styles.participantItem}>
                  {p}
                  <button onClick={() => handleRemoveParticipant(i)} className={styles.removeButton}>🗑️</button>
                </li>
              ))}
            </ul>
            <div className={styles.buttonRow}>
              <button onClick={handleCreateMeeting} className={styles.nextButton}>Create Meeting</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateMeeting;
