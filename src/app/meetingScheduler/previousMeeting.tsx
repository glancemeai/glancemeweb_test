'use client';
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Video,
  Save,
  Clipboard,
  BookOpen,
  Clock,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import styles from "./previousMeeting.module.css"

interface MeetingDetails {
  topic: string;
  when: Date;
  participants: string;
  link: string;
  summary?: string;
  transcript?: string;
}

export default function PreviousMeeting() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const mockSummary = "AI-generated summary of your last meeting will appear here.";
  const mockTranscript = "Transcript text goes here. This is where detailed conversation appears, powered by future AI.";

  const pastMeetings: MeetingDetails[] = [
    {
      topic: "Product Sprint Sync",
      when: new Date(Date.now() - 1000 * 60 * 60 * 24),
      participants: "alex@email.com, taylor@email.com",
      link: "https://meet.demo/abc123",
      summary: mockSummary,
      transcript: mockTranscript,
    },
    {
      topic: "Design Review",
      when: new Date(Date.now() - 1000 * 60 * 60 * 70),
      participants: "sara@email.com, luna@email.com",
      link: "https://meet.demo/def456",
      summary: mockSummary,
      transcript: mockTranscript,
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.pastMeetingsSection}>
      <div className={styles.pastmeetingCard}>
        <h3 className={styles.meetingHeader}>
          <Save size={20} className={styles.icon} />
          Previous Meetings
        </h3>

        {pastMeetings.map((meeting, index) => (
          <div key={index} className={styles.pastMeetingCard}>
            <div className={`${styles.meetingCardHeader} flex justify-between items-start cursor-pointer`} onClick={() => toggleExpand(index)}>
                 <div>
                    <div className={styles.meetingHeader}>
                       <Video size={16} className={styles.icon} />
                          {meeting.topic}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                       <Clock size={14} /> {format(meeting.when, "PPpp")}
                    </div>
                  </div>
            <div className="text-gray-400 self-start">
                 {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>


            {expandedIndex === index && (
              <div className="mt-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 text-xs mb-1">
                  <Users size={14} /> {meeting.participants || "No participants listed"}
                </div>

                <div className={styles.meetingSectionLabel}>
                  <BookOpen size={16} />
                  <span>Summary:</span>
                </div>
                <p className={styles.meetingSummary}>{meeting.summary}</p>

                <div className={styles.meetingSectionLabel}>
                  <Clipboard
                    size={16}
                    className="cursor-pointer"
                    onClick={() => copyToClipboard(meeting.transcript || "")}
                  />
                  <span>Transcript:</span>
                </div>
                <p className={styles.meetingTranscript}>
                  {meeting.transcript || "No transcript available."}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

