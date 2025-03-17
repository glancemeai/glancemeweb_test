'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/redux/utils/message';
import Header from '../home/header/header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaFile, FaTimesCircle } from 'react-icons/fa';
import style from './support.module.css';
import Apis from "../service/hooks/ApiSlugs"

const SupportPage = () => {
    const apiClient = Apis();
    const dispatch = useDispatch();
    const [inquiryType, setInquiryType] = useState('General Inquiry');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const formData = new FormData();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isPhoneRequired && phoneNumber && !validatePhoneNumber(phoneNumber)) {
            setPhoneError('Phone number must contain only digits');
            return;
        }
        
        try {
            setIsUploading(true);
            
            const contactData: any = {
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

            const result = await apiClient.ContactUs(formData);
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
        } catch (error: any) {
            console.error('Failed to send message:', error);
            dispatch(setAlert({ data: { message: error.message || 'Failed to send message', show: true, type: 'error' } }));
        } finally {
            setIsUploading(false);
        }
    };


    const validatePhoneNumber = (phone: string): boolean => {
        return /^\d+$/.test(phone);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <h1 className={style.mainTitle}>Contact Us</h1>
                    <p className={style.subtitle}>Any question or remarks? Just write us a message!</p>
                </div>
                
                <div className={style.contactWrapper}>
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
                                        onChange={(e) => setFirstName(e.target.value)} 
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
                                        onChange={(e) => setLastName(e.target.value)}
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
                                        onChange={(e) => setEmail(e.target.value)} 
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
                                    onChange={(e) => setMessage(e.target.value)} 
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
                                    className={style.sendButton}
                                    disabled={isUploading || (inquiryType === 'Send Resume' && !file) || !!phoneError}
                                >
                                    {isUploading ? 'Sending...' : 'Send Message'}
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