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

export default function LoginContainer() {
    const router = useRouter();
    const dispatch = useDispatch()
    // data init
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const Handler = async (data: string, type: string) => {
        if (type == "Email") {
            setEmail(data)
        } else if (type == "Password") {
            setPassword(data)
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
                let cookie = `authorization=${data?.data?.token}; `;        
                cookie += "path=/;";
                cookie += `max-age=${60 * 60 * 24 * 365};`;
                cookie += "SameSite=None; Secure;";
                // cookie += "domain=.glanceme.ai;";
                document.cookie = cookie;                        
                router.push("/dashboard");
            } else {
                // Use optional chaining and fallback for error message
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
    return (
        <div className={styles.main}>
            <div className={styles.mainOne}>
                <h1>Welcome Back</h1>
                <p>please login to your account</p>
            </div>
            <div className={styles.mainTwo}>
                <InputOne disable={loginCall} name={"Email"} id={"Email"} placeholder={"Email"} value={email} onChange={Handler} />
                <InputOne disable={loginCall} type={"password"} name={"Password"} id={"Password"} placeholder={"Password"} value={password} onChange={Handler} />
                {/* <div className={styles.mainTwoItem}><p>forget password??</p></div> */}
                <ButtonThree laod={loginCall} name={loginCall ? "Preparing Dashboard..." : "Login To Glanceme.Ai"} onClick={handleSubmit} />
                <div className={styles.mainTwoItemTwo}><p>or</p></div>
                <div className={styles.mainTwoItemSignup}>New to Glanceme.Ai? <Link href={"/signup"} passHref><p>Create Account</p></Link></div>
            </div>
        </div>
    )
}
