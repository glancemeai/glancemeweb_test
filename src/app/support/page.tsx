'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/redux/utils/message';
import Header from '../home/header/header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import style from './support.module.css';  // Keep using the same CSS module
import emailjs from 'emailjs-com';

emailjs.init('Y-6cl_tLhC8_qCQPa');

const SupportPage = () => {
    const dispatch = useDispatch();
    const [inquiryType, setInquiryType] = useState('general');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const templateParams = {
            from_name: `${firstName} ${lastName}`,
            inquiry_type: inquiryType,
            to_name: 'Glanceme',
            message: message,
            reply_to: email,
            phone: phoneNumber
        };
    
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration is missing.');
            dispatch(setAlert({ data: { message: 'EmailJS configuration is missing.', show: true, type: 'error' } }));
            return;
        }
    
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setMessage('');
                setFile(null);
                
                dispatch(setAlert({ data: { message: 'Message sent successfully', show: true, type: 'success' } }));
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                dispatch(setAlert({ data: { message: 'Failed to send message', show: true, type: 'error' } }));
            });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

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
                        <div className={style.circleOverlay}></div>
                        <h2>Contact Information</h2>
                        
                        <div className={style.contactDetails}>
                            <div className={style.contactItem}>
                                <FaPhone className={style.icon} />
                                <span>+1012 3456 789</span>
                            </div>
                            <div className={style.contactItem}>
                                <FaEnvelope className={style.icon} />
                                <span>demo@gmail.com</span>
                            </div>
                            <div className={style.contactItem}>
                                <FaMapMarkerAlt className={style.icon} />
                                <span>Gwalior, Madhya Pradesh</span>
                            </div>
                        </div>
                        
                        <div className={style.socialIcons}>
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
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
                                    <label htmlFor="firstName">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstName"
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className={`${style.formGroup} ${style.fullWidth}`}>
                                <label htmlFor="message">Message</label>
                                <input 
                                    type="text" 
                                    id="message"
                                    placeholder="Write your message.." 
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)} 
                                    required 
                                />
                            </div>
                            
                            <div className={style.formActions}>
                                <div className={style.fileUpload}>
                                    <label htmlFor="fileUpload" className={style.uploadButton}>
                                        Upload file
                                    </label>
                                    <input 
                                        type="file" 
                                        id="fileUpload" 
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                
                                <button type="submit" className={style.sendButton}>
                                    Send Message
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