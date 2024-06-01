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

export default function LoginContainer() {
    const dispatch = useDispatch()
    const apis = Apis()
    const router = useRouter();
    const [loginCall, setLoginCall] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const Handler = (data: string, type: string) => {
        if (type == "email") {
            setEmail(data)
        } else if (type == "Password") {
            setPassword(data)
        } else if (type == "Name") {
            setName(data)
        } else if (type == "phone") {
            setPhone(data)
        }
    }

    const SignUp = async () => {

        if (email == "" || password == "" || name == "") {
            dispatch(setAlert({ data: { message: "empty input fields", show: true, type: "error" } }))
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
                let cookie = `authorization=${data?.data?.token}; `;
                cookie += "path=/; ";
                cookie += `max-age=${60 * 60 * 24 * 7}; `;
                cookie += "SameSite=None; Secure; ";
                cookie += "domain=.rotenx.me";
                
                console.log(cookie);
                
                document.cookie = cookie;
                
                router.push("/dashboard")
            } else {
                dispatch(setAlert({ data: { message: data?.data?.message, show: true, type: "error" } }))
            }
        })
            .catch(error => {
                setLoginCall(false)
                dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }))
            });

    }
    return (
        <div className={styles.main}>
            <div className={styles.mainOne}>
                <h1>Hello buddy</h1>
                <p>Join us the largest community</p>
            </div>
            <div className={styles.mainTwo}>
                <InputOne disable={loginCall} placeholder={"Full Name"} id={"Name"} value={name} onChange={Handler} />
                <InputOne disable={loginCall} placeholder={"Email"} id={"email"} value={email} onChange={Handler} />
                <InputOne disable={loginCall} placeholder={"password"} type={"password"} id={"Password"} value={password} onChange={Handler} />
                <ButtonThree laod={loginCall} name={"Join Roten.X"} onClick={SignUp} />
                <div className={styles.mainTwoItemTwo}><p>or</p></div>
                <div className={styles.mainTwoItemSignup}>already Have Account? <Link href={"/login"} passHref><p>Login Now</p></Link></div>
            </div>
        </div>
    )
}
