"use client"
import InputOne from "@/app/components/utils/Edit/Input/Input"
import styles from "./SignupContainer.module.css"
import { ButtonThree } from "@/app/components/utils/Edit/buttons/Buttons"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import Apis from "@/app/service/hooks/ApiSlugs"
import { useDispatch } from "react-redux"
import { setAlert } from "@/app/redux/utils/message"
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRocket, FaUserAstronaut } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import GoogleAuthButton from "@/app/components/utils/GoogleAuthButton";

export default function SignupContainer() {
    const dispatch = useDispatch()
    const apis = Apis()
    const router = useRouter();
    const [loginCall, setLoginCall] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const [email, setEmail] = useState("")
    const [OTP, setOTP] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    
    const Handler = (data: string, type:string) => {
        if (type == "email") {
            setEmail(data)
        } else if (type == "Password") {
            setPassword(data)
        } else if (type == "Name") {
            setName(data)
        } else if (type == "phone") {
            setPhone(data)
        } else if (type == "OTP") {
            setOTP(data)
        }
    }

    const OTPVerify = async() => {
        if (email == "" || password == "" || name == "" || OTP == "") {
            dispatch(setAlert({ data: { message: "Empty input fields", show: true, type: "error" } }))
            return;
        }
        setLoginCall(true)
        let payload = {
            name: name,
            email: email,
            password: password,
            verify: OTP
        }
        await apis.Verify(payload).then(data => {
            setLoginCall(false)
            if (data.status == 200) {
                dispatch(setAlert({ data: { message: "Account verified! Now Login!", show: true, type: "success" } }))
                router.push("/login")
            } else {
                dispatch(setAlert({ data: { message: data.message || "Verification failed", show: true, type: "error" } }))
            }
        }).catch(error => {
                setLoginCall(false)
                dispatch(setAlert({ data: { message: error.message || "Verification failed", show: true, type: "error" } }))
        });
    }

    const SignUp = async () => {
        if (email == "" || password == "" || name == "") {
            dispatch(setAlert({ data: { message: "Empty input fields", show: true, type: "error" } }))
            return;
        }
        setLoginCall(true)

        let payload = {
            name: name,
            email: email,
            password: password
        }
        await apis.Signup(payload).then(data => {
            setLoginCall(false)
            if (data.status == 201) {
                setShowOTP(true);
            } else {
                dispatch(setAlert({ data: { message: data.message || "Signup failed", show: true, type: "error" } }))
            }
        })
        .catch(error => {
            console.log(error);
            setLoginCall(false)
            dispatch(setAlert({ data: { message: error.message || "Signup failed", show: true, type: "error" } }))
        });
    }
    
    return (
        <>
            <div className={styles.main}>
                <div className={styles.mainOne}>
                    <h1 className={styles.titleAnimation}>Hello Buddy</h1>
                    <h2 className={styles.subtitleAnimation}>Join</h2>
                    <div className={styles.sentenceContainer}>The largest community</div>
                </div>
                <div className={styles.mainTwo}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputWithIcon}>
                            <InputOne 
                                disable={loginCall} 
                                placeholder={"Full Name"} 
                                id={"Name"} 
                                value={name} 
                                onChange={Handler} 
                            />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputWithIcon}>
                            <InputOne 
                                disable={loginCall} 
                                placeholder={"Email"} 
                                id={"email"} 
                                value={email} 
                                onChange={Handler}
                                className={styles.inputbox} 
                            />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputWithIcon}>
                            <InputOne 
                                disable={loginCall} 
                                placeholder={"Password"} 
                                type={"password"} 
                                id={"Password"} 
                                value={password} 
                                onChange={Handler} 
                            />
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <ButtonThree 
                            laod={loginCall} 
                            name={<>Join Glanceme.Ai <FaRocket className={styles.buttonIcon} /></>} 
                            onClick={SignUp} 
                        />
                    </div>
                    <div className={styles.mainTwoItemTwo}><p>or</p></div>
                    
                    {/* Google Sign Up Button */}
                    <GoogleAuthButton mode="signup" />
                    
                    <div className={styles.mainTwoItemSignup}>
                        Already Have Account? <Link href={"/login"} className={styles.loginLink}>Login Now</Link>
                    </div>
                </div>
            </div>
            
            {/* OTP Modal - Rendered outside the main container */}
            {showOTP && (
                <div className={styles.mainOTP}>
                    <div className={styles.mainOTPHolder}>
                        <div className={styles.mainOTPHolderHeading}>
                            <span onClick={() => {setShowOTP(false)}}><FaArrowLeftLong size={20}/></span>
                            <p>OTP Verification</p>
                        </div>
                        <div className={styles.mainOTPHolderInput}>
                            <InputOne 
                                disable={loginCall} 
                                placeholder={"Enter OTP sent to your email"} 
                                name={"Enter OTP Sent On Mail"} 
                                id={"OTP"} 
                                value={OTP} 
                                onChange={Handler} 
                            />
                            <div className={styles.resendOTP}>
                                <p>Didnt receive code?</p>
                                <span className={styles.resendButton}>Resend OTP</span>
                            </div>
                        </div>
                        <div className={styles.mainOTPHolderButton}>
                            <ButtonThree laod={loginCall} name={"Verify & Continue"} onClick={OTPVerify} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}