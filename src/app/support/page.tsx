'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/redux/utils/message';
import Header from '../home/header/header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaFile, FaTimesCircle } from 'react-icons/fa';
import style from './support.module.css';
import emailjs from 'emailjs-com';

emailjs.init(`${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`);

const SupportPage = () => {
    const dispatch = useDispatch();
    const [inquiryType, setInquiryType] = useState('general');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate phone number before submission
        if (isPhoneRequired && phoneNumber && !validatePhoneNumber(phoneNumber)) {
            setPhoneError('Phone number must contain only digits');
            return;
        }
        
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        
        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration is missing.');
            dispatch(setAlert({ data: { message: 'EmailJS configuration is missing.', show: true, type: 'error' } }));
            return;
        }
        
        // Base template params
        const templateParams = {
            from_name: lastName ? `${firstName} ${lastName}` : firstName,
            inquiry_type: inquiryType,
            to_name: 'Glanceme',
            message: message || '(No message provided)',
            reply_to: email,
            phone: phoneNumber || '(Not provided)'
        };
        
        try {
            setIsUploading(true);
            
            // Handle file attachment if present (for resume option)
            if (file && inquiryType === 'resume') {
                // Convert file to base64
                const reader = new FileReader();
                const filePromise = new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                });
                
                const base64File = await filePromise;
                
                // Add file to template params
                Object.assign(templateParams, {
                    file_content: base64File,
                    file_name: file.name
                });
            }
            
            // Send email
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            
            // Reset form after successful submission
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setPhoneError('');
            setMessage('');
            setFile(null);
            
            dispatch(setAlert({ data: { message: 'Message sent successfully', show: true, type: 'success' } }));
        } catch (error) {
            console.error('Failed to send email:', error);
            dispatch(setAlert({ data: { message: 'Failed to send message', show: true, type: 'error' } }));
        } finally {
            setIsUploading(false);
        }
    };

    const validatePhoneNumber = (phone: string): boolean => {
        // Check if phone contains only digits
        return /^\d+$/.test(phone);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhoneNumber(value);
        
        // Clear error when field is empty
        if (!value) {
            setPhoneError('');
            return;
        }
        
        // Validate as user types
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
        // Reset the file input
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    // Determine if a field is required based on the inquiry type
    const isLastNameRequired = inquiryType === 'resume';
    const isPhoneRequired = inquiryType === 'resume';
    const isMessageRequired = inquiryType !== 'resume';
    const isFileRequired = inquiryType === 'resume';

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
                                        value="general" 
                                        checked={inquiryType === 'general'}
                                        onChange={() => setInquiryType('general')}
                                    />
                                    <span className={style.radioCustom}></span>
                                    General Inquiry
                                </label>
                                <label className={style.inquiryOption}>
                                    <input 
                                        type="radio" 
                                        name="inquiryType" 
                                        value="bug" 
                                        checked={inquiryType === 'bug'}
                                        onChange={() => setInquiryType('bug')}
                                    />
                                    <span className={style.radioCustom}></span>
                                    Bug Report
                                </label>
                                <label className={style.inquiryOption}>
                                    <input 
                                        type="radio" 
                                        name="inquiryType" 
                                        value="resume" 
                                        checked={inquiryType === 'resume'}
                                        onChange={() => setInquiryType('resume')}
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
                                {inquiryType === 'resume' && (
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
                                    disabled={isUploading || (inquiryType === 'resume' && !file) || !!phoneError}
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