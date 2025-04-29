'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './McqQuestion.module.css';
import Apis from '../../../service/hooks/ApiSlugs';

interface Question {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: string;
}

interface UserAnswer {
  questionIndex: number;
  selectedOption: string;
  isCorrect: boolean;
}

export default function McqPage({ params }: { params: { id: string } }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const api = Apis();

  useEffect(() => {
    // Check if user data is available
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/mcq');
      return;
    }
    
    setUserData(JSON.parse(storedUser));
    
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const result = await api.GetAudioMcqs(params.id);
        console.log('API Result:', result);
        
        if (result && result.status === 200 && result.data && result.data.data && result.data.data.length > 0) {
          setQuestions(result.data.data);
          setError(null);
        } else {
          setError(result.message || 'Failed to load questions');
          setQuestions([]);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('An unexpected error occurred');
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuestions();
  }, [router, params.id]);

  const handleOptionSelect = (option: string) => {
    if (showAnswer) return;
    
    setOptionSelected(option);
    setShowAnswer(true);
    
    const isCorrect = option === questions[currentQuestion].correct_answer;
    
    const newUserAnswer: UserAnswer = {
      questionIndex: currentQuestion,
      selectedOption: option,
      isCorrect,
    };
    
    setUserAnswers([...userAnswers, newUserAnswer]);
    
    // Wait for animation to complete before moving to next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setOptionSelected(null);
        setShowAnswer(false);
      } else {
        setIsCompleted(true);
      }
    }, 1500);
  };

  const getScore = () => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    return `${correctAnswers}/${questions.length}`;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setOptionSelected(null);
    setShowAnswer(false);
    setIsCompleted(false);
  };

  if (isLoading) {
    return (
      <div className={styles.main}>
        <div className={styles.mainBg}></div>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.main}>
        <div className={styles.mainBg}></div>
        <div className={styles.errorContainer}>
          <h2>Error Loading Questions</h2>
          <p>{error || 'No questions available'}</p>
          <button 
            onClick={() => router.push('/audio/mcqs')} 
            className={styles.homeButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className={styles.main}>
        <div className={styles.mainBg}></div>
        <div className={styles.container}>
          <div className={styles.resultsCard}>
            <h1 className={styles.resultTitle}>Quiz Completed!</h1>
            <h2 className={styles.greeting}>Great job, {userData.name}!</h2>
            
            <div className={styles.scoreContainer}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreText}>{getScore()}</span>
              </div>
              <p className={styles.scoreLabel}>Your Score</p>
            </div>
            
            <div className={styles.resultsSummary}>
              {userAnswers.map((answer, index) => (
                <div 
                  key={index} 
                  className={`${styles.resultItem} ${answer.isCorrect ? styles.correct : styles.incorrect}`}
                >
                  <span className={styles.questionNumber}>Q{index + 1}:</span>
                  <span className={styles.questionResult}>
                    {answer.isCorrect ? (
                      <span className={styles.correctIcon}>✓</span>
                    ) : (
                      <span className={styles.incorrectIcon}>✗</span>
                    )}
                    {answer.selectedOption}: {questions[answer.questionIndex].options[answer.selectedOption as "A" | "B" | "C" | "D"]}
                  </span>
                </div>
              ))}
            </div>
            
            <div className={styles.actionButtons}>
              <button onClick={restartQuiz} className={styles.restartButton}>
                Restart Quiz
              </button>
              <button onClick={() => router.push('/mcq')} className={styles.homeButton}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  
  return (
    <div className={styles.main}>
      <div className={styles.mainBg}></div>
      <div className={styles.container}>
        <div className={styles.headerInfo}>
          <div className={styles.userInfo}>
            <span className={styles.welcome}>Welcome, {userData.name}</span>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressText}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className={styles.questionCard}>
          <h2 className={styles.question}>{currentQ.question}</h2>
          
          <div className={styles.options}>
            {Object.entries(currentQ.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleOptionSelect(key)}
                className={`${styles.option} ${
                  optionSelected === key && showAnswer
                    ? key === currentQ.correct_answer
                      ? styles.correctOption
                      : styles.incorrectOption
                    : optionSelected === key
                    ? styles.selectedOption
                    : ''
                }`}
                disabled={showAnswer}
              >
                <span className={styles.optionKey}>{key}</span>
                <span className={styles.optionValue}>{value}</span>
                {optionSelected === key && showAnswer && (
                  <span className={styles.answerIcon}>
                    {key === currentQ.correct_answer ? '✓' : '✗'}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {showAnswer && (
            <div className={styles.feedback}>
              {optionSelected === currentQ.correct_answer ? (
                <div className={styles.correctFeedback}>
                  <span className={styles.correctIcon}>✓</span> Correct!
                </div>
              ) : (
                <div className={styles.incorrectFeedback}>
                  <span className={styles.incorrectIcon}>✗</span> 
                  Incorrect! The correct answer is {currentQ.correct_answer}.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}