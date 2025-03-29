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

        const CreateDonate = await api.CreateDonation({amount:selectedAmount,
            currency:"INR",
            donorName:"Anonymous Donor",
            message:""})

            console.log(CreateDonate,"ASDdasasdasdsadsadsadsdaad");
            
        if(CreateDonate){

        }
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            amount: selectedAmount * 100, // Convert to paise
            currency: "INR",
            name: "Glanceme.Ai",
            description: `Donation of $${selectedAmount}`,
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
                  
                  // Additional success handling
                //   router.push('/');
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
    };

    return (
        <>
            <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className={style.container}>
                <h2 className={style.heading}>
                    Discover Glanceme, <span className={style.free}>Free </span> During Our Launch!
                </h2>
                <p className={style.text}>
                    We are a passionate team committed to transforming the way you learn from online videos and text content. Enjoy free access during our trial phase, and if you{"'"}d like to support us, consider making a small donation!
                </p>
                <button className={style.donateButton} onClick={() => setShowPopup(true)}>
                    <Image src="/images/donate.png" alt="Donate" width={20} height={20} /> Donate
                </button>
                
                {showPopup && (
                    <div className={style.popupOverlay} onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}>
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
                                            <span className={style.donationAmount}>{option.amount}{' '}Rs</span>
                                            <span className={style.donationDescription}>{option.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={style.popupButtonsCenter}>
                                <ButtonFour
                                    name={`Pay ${selectedAmount+" Rs" || ""}`}
                                    className={`${style.payButton} ${selectedAmount ? style.active : style.disabled}`}
                                    disabled={!selectedAmount}
                                    onClick={handlePayment}
                                >
                                    
                                </ButtonFour>
                                <button className={style.cancelButton} onClick={() => setShowPopup(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default StaticPrice;
