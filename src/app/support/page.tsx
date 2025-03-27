'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/redux/utils/message';
import Header from '../home/header/header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaFile, FaTimesCircle, FaLink } from 'react-icons/fa';
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
    const [url, setUrl] = useState<string>('');
    const [urlError, setUrlError] = useState<string>('');
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

    const validateUrl = (inputUrl: string): boolean => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
        );
        return urlPattern.test(inputUrl);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            setIsUploading(true);
            
            // Create a new FormData object to handle file uploads and other data
            const formData = new FormData();
            
            // Always add these required fields
            formData.append('firstName', firstName);
            formData.append('email', email);
            formData.append('inquiryType', inquiryType);
            
            // Conditionally add other fields based on inquiry type
            if (lastName) {
                formData.append('lastName', lastName);
            }
            
            // Message handling
            if (message) {
                formData.append('message', message);
            }
            
            // Phone number handling
            if (phoneNumber && (inquiryType === 'General Inquiry' || inquiryType === 'Send Resume')) {
                formData.append('phoneNumber', phoneNumber);
            }
            
            // URL handling for Bug Report
            if (inquiryType === 'Bug Report' && url) {
                if (!validateUrl(url)) {
                    setUrlError('Please enter a valid URL');
                    return;
                }
                formData.append('url', url);
            }
            
            // File handling
            if (file && (inquiryType === 'Send Resume' || inquiryType === 'Bug Report')) {
                formData.append('file', file);
            }
    
            const result = await apiClient.ContactUs(formData) as ApiResponse;
            console.log('Contact API response:', result);
            
            if (result && (result.status === 200 || result.status === 201)) {
                // Reset form fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setUrl('');
                setUrlError('');
                setMessage('');
                setFile(null);
                
                dispatch(setAlert({ 
                    data: { 
                        message: result.message || 'Message sent successfully', 
                        show: true, 
                        type: 'success' 
                    } 
                }));
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

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrl(value);
        
        if (!value) {
            setUrlError('');
            return;
        }
        
        if (!validateUrl(value)) {
            setUrlError('Please enter a valid URL');
        } else {
            setUrlError('');
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
    const isMessageRequired = inquiryType === 'Send Resume' || inquiryType === 'General Inquiry' || inquiryType=='Bug Report';
    const isPhoneOrUrlRequired = inquiryType === 'Bug Report' || inquiryType === 'General Inquiry' || inquiryType === 'Send Resume';
    const isFileRequired = inquiryType === 'Send Resume' || inquiryType === 'Bug Report';

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
                                    onChange={() => {
                                        setInquiryType('General Inquiry');
                                        setUrl('');
                                        setUrlError('');
                                    }}
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
                                    onChange={() => {
                                        setInquiryType('Bug Report');
                                        setPhoneNumber('');
                                    }}
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
                                    onChange={() => {
                                        setInquiryType('Send Resume');
                                        setUrl('');
                                        setUrlError('');
                                    }}
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
                                {inquiryType === 'Bug Report' ? (
                                    <>
                                        <label htmlFor="url">
                                            YouTube/Medium URL <span className={style.requiredAsterisk}>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id="url"
                                            value={url}
                                            onChange={handleUrlChange}
                                            required
                                            className={urlError ? style.inputError : ''}
                                            placeholder="Paste video/article URL"
                                        />
                                        {urlError && <div className={style.errorMessage}>{urlError}</div>}
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="phoneNumber">
                                            Phone Number <span className={style.requiredAsterisk}>*</span>
                                        </label>
                                        <input 
                                            type="tel" 
                                            id="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                                            required={isPhoneOrUrlRequired}
                                        />
                                    </>
                                )}
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
                            {(inquiryType === 'Send Resume' || inquiryType === 'Bug Report') && (
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
                                                {inquiryType === 'Send Resume' ? 'Upload Resume' : 'Upload Screenshot'} 
                                                <span className={style.requiredAsterisk}>*</span>
                                            </label>
                                            <input 
                                                type="file" 
                                                id="fileUpload" 
                                                onChange={handleFileChange}
                                                accept={
                                                    inquiryType === 'Send Resume' 
                                                    ? '.pdf,.doc,.docx' 
                                                    : 'image/png,image/jpeg,image/jpg,image/gif'
                                                }
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
                                disabled={
                                    isUploading || 
                                    (inquiryType === 'Send Resume' && (!file || !message)) || 
                                    (inquiryType === 'Bug Report' && (!file || !url || !!urlError)) ||
                                    (inquiryType === 'General Inquiry' && (!phoneNumber || !message))
                                }
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