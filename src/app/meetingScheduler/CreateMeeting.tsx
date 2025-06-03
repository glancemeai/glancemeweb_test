'use client';
import React, { useRef, useState } from 'react';
// import styles from './MeetingScheduler.module.css';
import { Video } from 'lucide-react';
import styles from './CreateMeeting.module.css'

interface CreateMeetingProps {
  onClose: () => void;
}

const CreateMeeting: React.FC<CreateMeetingProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantInput, setParticipantInput] = useState('');

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
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;

    let valid = true;
    setStartTimeError('');
    setEndTimeError('');

    if (selectedDate === todayDateStr) {
      if (startTime <= currentTimeStr) {
        setStartTimeError('Start time must be after current time.');
        valid = false;
      }
      if (endTime <= startTime) {
        setEndTimeError('End time must be after start time.');
        valid = false;
      }
    } else {
      if (endTime <= startTime) {
        setEndTimeError('End time must be after start time.');
        valid = false;
      }
    }

    if (secondFormRef.current?.checkValidity() && valid) {
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
    const title = titleRef.current?.value || '';
    console.log('Meeting Created:', { title, participants });
    alert('Meeting created successfully!');
    onClose(); // Close popup
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
                <input type="date" name="startDate" defaultValue={todayDateStr} min={todayDateStr} className={styles.popupInput} required />
              </div>
              <div className={styles.formRow}>
                <label className={styles.inlineLabel}>Start Time</label>
                <input type="time" name="startTime" className={styles.popupInput} required />
              </div>
              {startTimeError && <p className={styles.errorText}>{startTimeError}</p>}
              {/* <div className={styles.formRow}>
                <label className={styles.inlineLabel}>End Time</label>
                <input type="time" name="endTime" className={styles.popupInput} required />
              </div>
              {endTimeError && <p className={styles.errorText}>{endTimeError}</p>} */}
              {/* <div className={styles.formRow}>
                <label className={styles.inlineLabel}>Meeting Type</label>
                <div className={styles.radioGroup}>
                  <label><input type="radio" name="meetingType" value="zoom" required /> Zoom</label>
                  <label><input type="radio" name="meetingType" value="teams" required /> Teams</label>
                  <label><input type="radio" name="meetingType" value="google" defaultChecked required /> Google Meet</label>
                </div>
              </div> */}
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
              <input ref={titleRef} type="text" placeholder="Meeting Title (optional)" className={styles.popupInput} />
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
                  {p} <button onClick={() => handleRemoveParticipant(i)} className={styles.removeButton}>🗑️</button>
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
  
