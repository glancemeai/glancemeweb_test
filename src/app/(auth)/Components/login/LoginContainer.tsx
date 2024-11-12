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
        if (type == "email") {
            setEmail(data)
        } else if (type == "Password") {
            setPassword(data)
        }

    }
    const [loginCall, setLoginCall] = useState(false)
    const Login = async () => {
        if (email == "" || password == "") {
            dispatch(setAlert({ data: { message: "email or password is empty", show: true, type: "error" } }))
        } else {
            const apis = Apis()
            setLoginCall(true)
            await apis.Login({ email: email, password: password })
                .then(data => {
                    setLoginCall(false)
                    if (data.status) {
                        let cookie = `authorization=${data?.data?.token}; `;
                        cookie += "path=/; ";
                        cookie += `max-age=${60 * 60 * 24 * 7}; `;
                        cookie += "SameSite=None; Secure; ";
                        cookie += "domain=.glanceme.co";

                        console.log(cookie);

                        document.cookie = cookie;


                        router.push("/dashboard")
                    } else {
                        dispatch(setAlert({ data: { message: "email & password wrong", show: true, type: "error" } }))
                    }
                })
                .catch(error => {
                    setLoginCall(false)
                    dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }))
                });
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.mainOne}>
                <h1>Welcome Back</h1>
                <p>please login to your account</p>
            </div>
            <div className={styles.mainTwo}>
                <InputOne disable={loginCall} name={"email"} id={"email"} placeholder={"email"} value={email} onChange={Handler} />
                <InputOne disable={loginCall} type={"password"} name={"Password"} id={"Password"} placeholder={"password"} value={password} onChange={Handler} />
                {/* <div className={styles.mainTwoItem}><p>forget password??</p></div> */}
                <ButtonThree laod={loginCall} name={loginCall ? "Preparing Dashboard..." : "Login To Glanceme.Ai"} onClick={Login} />
                <div className={styles.mainTwoItemTwo}><p>or</p></div>
                <div className={styles.mainTwoItemSignup}>New to Glanceme.Ai? <Link href={"/signup"} passHref><p>Create Account</p></Link></div>
            </div>
        </div>
    )
}
