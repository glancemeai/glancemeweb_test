'use client';
import { useState } from "react";
import style from "./price.module.css";
import Image from 'next/image';

const StaticPrice = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const donationOptions = [
        { amount: 5, description: "Amazing Product", icon: "🌟" },
        { amount: 10, description: "Support a Feature", icon: "🚀" },
        { amount: 20, description: "Fuel Our Mission", icon: "💡" }
    ];

    return (
        <div className={style.container}>
            <h2 className={style.heading}>
                Discover Glanceme, <span className={style.free}>Free </span> During Our Launch!
            </h2>
            <p className={style.text}>
                We are a passionate team of individuals committed to transforming the way you learn from online videos and text content. During our trial phase, enjoy complete, <strong>free access to all our features.</strong> If you encounter any issues or bugs, our support team is here to assist. Your insights, suggestions, and even small donations go a long way in helping us maintain and evolve this service for everyone.
            </p>
            <button className={style.donateButton} onClick={() => setShowPopup(true)}>
            <Image 
                 src="/images/donate.png" 
                alt="Donate" 
                width={20} 
                height={20} 
                /> Donate
            </button>
            
            {showPopup && (
                <div className={style.popupOverlay}>
                    <div className={style.popupContent}>
                        <div className={style.popupHeader}>
                            <h3>Support Our Mission</h3>
                            <p>Help us keep Glanceme free and growing!</p>
                        </div>
                        <div className={style.donationOptions}>
                            {donationOptions.map((option) => (
                                <div 
                                    key={option.amount} 
                                    className={`${style.donationCard} ${selectedAmount === option.amount ? style.selected : ''}`}
                                    onClick={() => setSelectedAmount(option.amount)}
                                >
                                    <div className={style.donationIcon}>{option.icon}</div>
                                    <div className={style.donationDetails}>
                                        <span className={style.donationAmount}>${option.amount}</span>
                                        <span className={style.donationDescription}>{option.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={style.popupButtonsCenter}>
                            <button 
                                className={`${style.payButton} ${selectedAmount ? style.active : style.disabled}`}
                                disabled={!selectedAmount}
                            >
                                Pay ${selectedAmount || 0}
                            </button>
                            <button 
                                className={style.cancelButton} 
                                onClick={() => {
                                    setShowPopup(false);
                                    setSelectedAmount(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaticPrice;