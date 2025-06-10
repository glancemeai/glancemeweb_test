'use client';
import { useState, useEffect } from "react";
import style from "./price.module.css";
import Image from 'next/image';
import Script from "next/script";
import Apis from "@/app/service/hooks/ApiSlugs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "@/app/redux/utils/message";
import ButtonOne, { ButtonFour, ButtonThree, ButtonTwo } from "@/app/components/utils/Edit/buttons/Buttons";
import { motion } from "framer-motion";

const StaticPrice = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(0);
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobileScreen = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        checkMobileScreen();
        window.addEventListener('resize', checkMobileScreen);
        return () => window.removeEventListener('resize', checkMobileScreen);
    }, []);

    const donationOptions = [
        { amount: 250, description: "Amazing Product", icon: "🌟" },
        { amount: 500, description: "Support a Feature", icon: "🚀" },
        { amount: 1000, description: "Fuel Our Mission", icon: "💡" },
        { amount: 1500, description: "Be a Visionary", icon: "🔥" }
    ];
    
    const handlePayment = async () => {
        const api = Apis()

        if (!selectedAmount) return;

        const CreateDonate = await api.CreateDonation({
            amount: selectedAmount,
            currency: "INR",
            donorName: "Anonymous Donor",
            message: ""
        });
            
        if(CreateDonate) {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: selectedAmount * 100, // Convert to paise
                currency: "INR",
                name: "Glanceme.Ai",
                description: `Donation of ₹${selectedAmount}`,
                prefill: {
                    name: "Anonymous Donor",
                    email: "",
                },
                theme: {
                    color: "#3399cc",
                },
                handler: async (response: any) => {
                    try {
                        const verifyResponse = await api.VerifyDonation({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });
            
                        const isPaymentSuccessful = 
                            verifyResponse.status === 200 && 
                            (verifyResponse as any).success === true;
            
                        if (isPaymentSuccessful) {
                            dispatch(setAlert({
                                data: {
                                    message: "Payment Successful! Thank you for your support.",
                                    show: true,
                                    type: "success"
                                }
                            }));
                        } else {
                            dispatch(setAlert({
                                data: {
                                    message: verifyResponse.message || "Payment verification failed",
                                    show: true,
                                    type: "error"
                                }
                            }));
                        }
                    } catch (error: any) {
                        dispatch(setAlert({
                            data: {
                                message: error.message || "An unexpected error occurred",
                                show: true,
                                type: "error"
                            }
                        }));
                    }

                    setShowPopup(false);
                    setSelectedAmount(null);
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        }
    };

    return (
        <>
            <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
            <motion.div 
                className={style.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={style.contentWrapper}>
                    <motion.h2 
                        className={style.heading}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Discover <span className={style.highlight}>Glanceme</span>, <span className={style.free}>Free</span> During Our Launch!
                    </motion.h2>
                    <motion.p 
                        className={style.text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        We are a passionate team committed to transforming the way you learn from online videos and text content. Enjoy free access during our trial phase, and if you{"'"}d like to support us, consider making a small donation!
                    </motion.p>
                    <motion.button 
                        className={style.donateButton}
                        onClick={() => setShowPopup(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <Image src="/images/donate.png" alt="Donate" width={20} height={20} /> 
                        Support Our Mission
                    </motion.button>
                </div>
                
                {showPopup && (
                    <motion.div 
                        className={style.popupOverlay} 
                        onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className={style.popupContent}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={style.popupHeader}>
                                <h3>Support Our Mission</h3>
                                <p>Help us keep Glanceme free and growing!</p>
                            </div>
                            <div className={style.donationOptions}>
                                {donationOptions.map((option) => (
                                    <motion.div 
                                        key={option.amount} 
                                        className={`${style.donationCard} ${selectedAmount === option.amount ? style.selected : ''}`}
                                        onClick={() => setSelectedAmount(option.amount)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <div className={style.donationIcon}>{option.icon}</div>
                                        <div className={style.donationDetails}>
                                            <span className={style.donationAmount}>₹{option.amount}</span>
                                            <span className={style.donationDescription}>{option.description}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className={style.popupButtonsCenter}>
                                <motion.div
                                    whileHover={selectedAmount ? { scale: 1.03 } : {}}
                                    whileTap={selectedAmount ? { scale: 0.97 } : {}}
                                >
                                    <ButtonFour
                                        name={`Pay ₹${selectedAmount || ""}`}
                                        className={`${style.payButton} ${selectedAmount ? style.active : style.disabled}`}
                                        disabled={!selectedAmount}
                                        onClick={handlePayment}
                                    />
                                </motion.div>
                                <motion.button 
                                    className={style.cancelButton} 
                                    onClick={() => setShowPopup(false)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                
                <div className={style.decorationCircle1}></div>
                <div className={style.decorationCircle2}></div>
                <div className={style.decorationCircle3}></div>
            </motion.div>
        </>
    );
};

export default StaticPrice;