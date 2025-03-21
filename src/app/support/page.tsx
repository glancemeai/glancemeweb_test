'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/redux/utils/message';
import Header from '../home/header/header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaFile, FaTimesCircle } from 'react-icons/fa';
import style from './support.module.css';
import Apis from "../service/hooks/ApiSlugs";
import { BsStars } from "react-icons/bs";
import { RiMagicFill } from 'react-icons/ri';

// Define types for the component
type InquiryType = 'General Inquiry' | 'Bug Report' | 'Send Resume';

interface ApiResponse {
  status: number;
  message?: string;
  data?: any;
}

const SupportPage = () => {
    const apiClient = Apis();
    const dispatch = useDispatch();
    const [inquiryType, setInquiryType] = useState<InquiryType>('General Inquiry');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const formData = new FormData();

    // Animation state variables
    const [animationStarted, setAnimationStarted] = useState<boolean>(false);
    const [titleVisible, setTitleVisible] = useState<boolean>(false);
    const [subtitleVisible, setSubtitleVisible] = useState<boolean>(false);
    const [messageVisible, setMessageVisible] = useState<boolean>(false);
    const [contentVisible, setContentVisible] = useState<boolean>(false);

    useEffect(() => {
        // Start animation sequence only once when component mounts
        if (!animationStarted) {
            setAnimationStarted(true);
            
            // Sequential animation with clear timing
            setTimeout(() => setTitleVisible(true), 300);
            setTimeout(() => setSubtitleVisible(true), 1000);
            setTimeout(() => setMessageVisible(true), 1700);
            setTimeout(() => setContentVisible(true), 2400);
        }
    }, [animationStarted]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isPhoneRequired && phoneNumber && !validatePhoneNumber(phoneNumber)) {
            setPhoneError('Phone number must contain only digits');
            return;
        }
        
        try {
            setIsUploading(true);
            
            const contactData: Record<string, any> = {
                firstName,
                email,
                message: message || '(No message provided)',
                inquiryType
            };
            
            if (lastName) contactData.lastName = lastName;
            if (phoneNumber) contactData.phoneNumber = phoneNumber;
            
            if (file && inquiryType === 'Send Resume') {
                contactData.file = file;
                
                formData.append('firstName', firstName);
                formData.append('email', email);
                formData.append('message', message || '(No message provided)');
                formData.append('inquiryType', inquiryType);
                if (lastName) formData.append('lastName', lastName);
                if (phoneNumber) formData.append('phoneNumber', phoneNumber);
                formData.append('file', file); 
            }

            const result = await apiClient.ContactUs(formData) as ApiResponse;
            console.log('Contact API response:', result);
            
            if (result && (result.status === 200 || result.status === 201)) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setPhoneError('');
                setMessage('');
                setFile(null);
                
                dispatch(setAlert({ data: { message: result.message || 'Message sent successfully', show: true, type: 'success' } }));
            } else {
                throw new Error(result?.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            dispatch(setAlert({ 
                data: { 
                    message: error instanceof Error ? error.message : 'Failed to send message', 
                    show: true, 
                    type: 'error' 
                } 
            }));
        } finally {
            setIsUploading(false);
        }
    };

    const validatePhoneNumber = (phone: string): boolean => {
        return /^\d+$/.test(phone);
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhoneNumber(value);
        
        if (!value) {
            setPhoneError('');
            return;
        }
        
        if (!validatePhoneNumber(value)) {
            setPhoneError('Phone number must contain only digits');
        } else {
            setPhoneError('');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setFile(null);
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const isLastNameRequired = inquiryType === 'Send Resume';
    const isPhoneRequired = inquiryType === 'Send Resume';
    const isMessageRequired = inquiryType !== 'Send Resume';
    const isFileRequired = inquiryType === 'Send Resume';

    return (
        <>
        <Header />
        <div className={style.container}>
            <div className={style.contactHeaderWrapper}>
                <h1 className={`${style.titleAnimation} ${titleVisible ? style.visible : ''}`}>
                    Contact Us
                </h1>
                <div className={`${style.subtitleAnimation} ${subtitleVisible ? style.visible : ''}`}>
                    <BsStars className={style.starsIcon} size={40} color='blue'/> 
                    Any question or remarks? 
                </div>
                <p className={`${style.sentenceContainer} ${messageVisible ? style.visible : ''}`}>
                    <span className={style.highlightedKeyword}>Just write us a message!</span>
                </p>
            </div>
            
            <div className={`${style.contactWrapper} ${contentVisible ? style.visible : ''}`}>
                <div className={style.contactInfo}>
                    <div className={style.circleOverlay1}></div>
                    <div className={style.circleOverlay}></div>
                    <h2>Contact Information</h2>
                    
                    <div className={style.contactDetails}>
                        <div className={style.contactItem}>
                            <FaEnvelope className={style.icon} />
                            <span>support@glanceme.ai</span>
                        </div>
                        <div className={style.contactItem}>
                            <FaMapMarkerAlt className={style.icon} />
                            <span>Pune, Maharashtra</span>
                        </div>
                    </div>
                    
                    <div className={style.socialIcons}>
                        <a href="https://www.facebook.com/glancemeai" aria-label="Facebook"><FaFacebook /></a>
                        <a href="https://www.instagram.com/glancemeai/" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://x.com/GlancemeAi" aria-label="Twitter"><FaTwitter /></a>
                    </div>
                </div>
                
                <div className={style.contactForm}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.inquiryTypes}>
                            <label className={style.inquiryOption}>
                                <input 
                                    type="radio" 
                                    name="inquiryType" 
                                    value="General Inquiry" 
                                    checked={inquiryType === 'General Inquiry'}
                                    onChange={() => setInquiryType('General Inquiry')}
                                />
                                <span className={style.radioCustom}></span>
                                General Inquiry
                            </label>
                            <label className={style.inquiryOption}>
                                <input 
                                    type="radio" 
                                    name="inquiryType" 
                                    value="Bug Report" 
                                    checked={inquiryType === 'Bug Report'}
                                    onChange={() => setInquiryType('Bug Report')}
                                />
                                <span className={style.radioCustom}></span>
                                Bug Report
                            </label>
                            <label className={style.inquiryOption}>
                                <input 
                                    type="radio" 
                                    name="inquiryType" 
                                    value="Send Resume" 
                                    checked={inquiryType === 'Send Resume'}
                                    onChange={() => setInquiryType('Send Resume')}
                                />
                                <span className={style.radioCustom}></span>
                                Send Resume
                            </label>
                        </div>
                        
                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label htmlFor="firstName">First Name <span className={style.requiredAsterisk}>*</span></label>
                                <input 
                                    type="text" 
                                    id="firstName"
                                    value={firstName} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="lastName">
                                    Last Name
                                    {isLastNameRequired && <span className={style.requiredAsterisk}>*</span>}
                                </label>
                                <input 
                                    type="text" 
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                    required={isLastNameRequired}
                                />
                            </div>
                        </div>
                        
                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label htmlFor="email">Email <span className={style.requiredAsterisk}>*</span></label>
                                <input 
                                    type="email" 
                                    id="email"
                                    value={email} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="phoneNumber">
                                    Phone Number
                                    {isPhoneRequired && <span className={style.requiredAsterisk}>*</span>}
                                </label>
                                <input 
                                    type="tel" 
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    required={isPhoneRequired}
                                    className={phoneError ? style.inputError : ''}
                                />
                                {phoneError && <div className={style.errorMessage}>{phoneError}</div>}
                            </div>
                        </div>
                        
                        <div className={`${style.formGroup} ${style.fullWidth}`}>
                            <label htmlFor="message">
                                Message
                                {isMessageRequired && <span className={style.requiredAsterisk}>*</span>}
                            </label>
                            <input 
                                type="text" 
                                id="message"
                                placeholder="Write your message.." 
                                value={message} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} 
                                required={isMessageRequired}
                            />
                        </div>
                        
                        <div className={style.formActions}>
                            {inquiryType === 'Send Resume' && (
                                <div className={style.fileUploadContainer}>
                                    {file ? (
                                        <div className={style.filePreview}>
                                            <FaFile className={style.fileIcon} />
                                            <span className={style.fileName}>{file.name}</span>
                                            <button 
                                                type="button" 
                                                className={style.removeFileBtn} 
                                                onClick={removeFile}
                                                aria-label="Remove file"
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={style.fileUpload}>
                                            <label htmlFor="fileUpload" className={style.uploadButton}>
                                                Upload Resume <span className={style.requiredAsterisk}>*</span>
                                            </label>
                                            <input 
                                                type="file" 
                                                id="fileUpload" 
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx"
                                                style={{ display: 'none' }}
                                                required={isFileRequired}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            <button 
                                type="submit" 
                                className={`${style.sendButton} ${contentVisible ? style.pulseButton : ''}`}
                                disabled={isUploading || (inquiryType === 'Send Resume' && !file) || !!phoneError}
                            >
                                {isUploading ? 'Sending...' : 'Send Message'}
                                <RiMagicFill className={style.magicIcon} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

export default SupportPage;