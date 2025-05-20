"use client"
import InputOne from "@/app/components/utils/Edit/Input/Input"
import styles from "./LoginContainer.module.css"
import { ButtonThree } from "@/app/components/utils/Edit/buttons/Buttons"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import Apis from "@/app/service/hooks/ApiSlugs"
import { setAlert } from "@/app/redux/utils/message"
import { useDispatch } from "react-redux";
import GoogleAuthButton from "@/app/components/utils/GoogleAuthButton";
import { FaArrowLeftLong } from "react-icons/fa6"

export default function LoginContainer() {
    const router = useRouter();
    const dispatch = useDispatch()
    // data init
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
    const [forgotEmail, setForgotEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1) // 1 = email entry, 2 = OTP verification
    const Handler = async (data: string, type: string) => {
        if (type == "Email") {
            setEmail(data)
        } else if (type == "Password") {
            setPassword(data)
        }
        else if (type == "forgotEmail") {
            setForgotEmail(data)
        } else if (type == "OTP") {
            setOtp(data)
        } else if (type == "newPassword") {
            setNewPassword(data)
        }
    }
    
    const [loginCall, setLoginCall] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        setLoginCall(true);
    
        try {
            const apis = Apis()
            const data = await apis.Login({ email: email, password: password });
            setLoginCall(false);
    
            if (data.status === 200) {
                // Set the cookie
                let cookie = `authorization=${data?.data?.token}; `;        
                cookie += "path=/; ";
                cookie += `max-age=${60 * 60 * 24 * 365}; `;
                cookie += "SameSite=None; Secure;";
                document.cookie = cookie;
                
                // Store user data in localStorage if needed
                if (data?.data?.user?.name) {
                    localStorage.setItem('userName', data.data.user.name);
                }
                if (data?.data?.user?.image) {
                    localStorage.setItem('userProfileImage', data.data.user.image);
                }
                
                // Add a small delay before redirecting
                setTimeout(() => {
                    router.push("/dashboard");
                }, 100);
                
                // Dispatch a success alert
                dispatch(setAlert({ 
                    data: { 
                        message: "Login successful! Redirecting to dashboard...", 
                        show: true, 
                        type: "success" 
                    } 
                }));
            } else {
                // Error handling (unchanged)
                const errorMessage = 
                    (data as any).error || 
                    data.message || 
                    "Login failed. Please try again.";
                
                dispatch(setAlert({ 
                    data: { 
                        message: errorMessage, 
                        show: true, 
                        type: "error" 
                    } 
                }));
            }
        } catch (error: any) {
            // Error handling (unchanged)
            setLoginCall(false);
            const errorMessage = 
                error.message || 
                "An unexpected error occurred. Please try again.";
            
            dispatch(setAlert({ 
                data: { 
                    message: errorMessage, 
                    show: true, 
                    type: "error" 
                } 
            }));
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotEmail) {
            dispatch(setAlert({ 
                data: { 
                    message: "Please enter your email address", 
                    show: true, 
                    type: "error" 
                } 
            }));
            return;
        }

        setLoginCall(true);
        try {
            const apis = Apis();
            const data = await apis.ForgotPassword({ email: forgotEmail });
            setLoginCall(false);

            if (data.status === 200) {
                setForgotPasswordStep(2); // Move to OTP verification step
                dispatch(setAlert({ 
                    data: { 
                        message: "OTP sent to your email!", 
                        show: true, 
                        type: "success" 
                    } 
                }));
            } else {
                dispatch(setAlert({ 
                    data: { 
                        message: data.message || "Failed to send OTP", 
                        show: true, 
                        type: "error" 
                    } 
                }));
            }
        } catch (error: any) {
            setLoginCall(false);
            dispatch(setAlert({ 
                data: { 
                    message: error.message || "An unexpected error occurred", 
                    show: true, 
                    type: "error" 
                } 
            }));
        }
    };
    const handleVerifyOTP = async () => {
        if (!otp || !newPassword) {
            dispatch(setAlert({ 
                data: { 
                    message: "Please enter OTP and new password", 
                    show: true, 
                    type: "error" 
                } 
            }));
            return;
        }
         setLoginCall(true);
    try {
        const apis = Apis();
            const data = await apis.VerifyForgotPassword({ 
                email: forgotEmail, 
                otp: otp, 
                newPassword: newPassword 
            });
            setLoginCall(false);

            if (data.status === 200) {
                setShowForgotPasswordModal(false);
                setForgotPasswordStep(1);
                setOtp("");
                setNewPassword("");
                setForgotEmail("");
                
                dispatch(setAlert({ 
                    data: { 
                        message: "Password reset successful! Please login with your new password", 
                        show: true, 
                        type: "success" 
                    } 
                }));
            } else {
                dispatch(setAlert({ 
                    data: { 
                        message: data.message || "Failed to verify OTP", 
                        show: true, 
                        type: "error" 
                    } 
                }));
            }
        }
        catch (error: any) {
            setLoginCall(false);
            dispatch(setAlert({ 
                data: { 
                    message: error.message || "An unexpected error occurred", 
                    show: true, 
                    type: "error" 
                } 
            }));
        }
    };
    
    return (
        <>
        <div className={styles.main}>
            <div className={styles.mainOne}>
                <h1 className={styles.titleAnimation}>Welcome <span className={styles.subtitleAnimation}>Back</span></h1>
                
                <p className={styles.sentenceContainer}>Please login to your account</p>
            </div>
            <div className={styles.mainTwo}>
                <InputOne 
                    disable={loginCall} 
                    name={"Email"} 
                    id={"Email"} 
                    placeholder={"Email"} 
                    value={email} 
                    onChange={Handler} 
                />
                <InputOne 
                    disable={loginCall} 
                    type={"password"} 
                    name={"Password"} 
                    id={"Password"} 
                    placeholder={"Password"} 
                    value={password} 
                    onChange={Handler} 
                />
                <div className={styles.forgotPasswordLink}>
                        <p onClick={() => setShowForgotPasswordModal(true)}>Forgot Password?</p>
                </div>
                <ButtonThree 
                    laod={loginCall} 
                    name={loginCall ? "Preparing Dashboard..." : "Login To Glanceme.Ai"} 
                    onClick={handleSubmit} 
                />
                <div className={styles.mainTwoItemTwo}><p>or</p></div>
                
                {/* Google Sign In Button */}
                <GoogleAuthButton mode="login" />
                
                <div className={styles.mainTwoItemSignup}>
                    New to Glanceme.Ai? <Link href={"/signup"} passHref><p>Create Account</p></Link>
                </div>
            </div>
        </div>
        {showForgotPasswordModal && (
                <div className={styles.mainOTP}>
                    <div className={styles.mainOTPHolder}>
                        <div className={styles.mainOTPHolderHeading}>
                            <span onClick={() => {
                                setShowForgotPasswordModal(false);
                                setForgotPasswordStep(1);
                                setOtp("");
                                setNewPassword("");
                            }}>
                                <FaArrowLeftLong size={20}/> 
                            </span>
                            <p>{forgotPasswordStep === 1 ? "Forgot Password" : "OTP Verification"}</p>
                        </div>
                        
                        {forgotPasswordStep === 1 ? (
                            <div className={styles.mainOTPHolderInput}>
                                <InputOne 
                                    disable={loginCall} 
                                    placeholder={"Enter your email address"} 
                                    name={"Enter your email"} 
                                    id={"forgotEmail"} 
                                    value={forgotEmail} 
                                    onChange={Handler} 
                                />
                                <div className={styles.mainOTPHolderButton}>
                                    <ButtonThree 
                                        laod={loginCall} 
                                        name={"Send OTP"} 
                                        onClick={handleForgotPassword} 
                                    />
                                </div>
                            </div>
                        ) : (<div className={styles.mainOTPHolderInput}>
                                <InputOne 
                                    disable={loginCall} 
                                    placeholder={"Enter OTP sent to your email"} 
                                    name={"Enter OTP"} 
                                    id={"OTP"} 
                                    value={otp} 
                                    onChange={Handler} 
                                />
                                <InputOne 
                                    disable={loginCall} 
                                    type={"password"}
                                    placeholder={"Enter new password"} 
                                    name={"Enter new password"} 
                                    id={"newPassword"} 
                                    value={newPassword} 
                                    onChange={Handler} 
                                />
                                <div className={styles.resendOTP}>
                                    <p>Didn't receive code?</p>
                                    <span 
                                        className={styles.resendButton} 
                                        onClick={handleForgotPassword}
                                    >
                                        Resend OTP
                                    </span>
                                </div>
                                <div className={styles.mainOTPHolderButton}>
                                    <ButtonThree 
                                        laod={loginCall} 
                                        name={"Reset Password"} 
                                        onClick={handleVerifyOTP} 
                                    />
                                </div>
                            </div>
                        )}
                        </div>
                </div>
            )}
    </>
 )
}