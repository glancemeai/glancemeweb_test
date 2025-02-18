'use client'
import InputOne, { InputTwo } from "@/app/components/utils/Edit/Input/Input"
import style from "./support.module.css"
import { ButtonThree } from "@/app/components/utils/Edit/buttons/Buttons"
import { useDispatch } from "react-redux"
import { setAlert } from "@/app/redux/utils/message"
import { useState } from "react"
import Header from "../home/header/header"

const SupportPage = () => {
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [query,setQuery] = useState("")
    const Handler = async (data: string, type: string) => {
        if (type == "email") {
            setEmail(data)
        } else if (type == "name") {
            setName(data)
        }else if(type == "query"){
            setQuery(data)
        }

    }


    const SupportCall = () => {
        setEmail("")
        setName("")
        setQuery("")
        dispatch(setAlert({data:{message:"Query sent successfully",show:true,type:"success"}}))
    }
    return (
        <>
        <Header/>
        <br />
        <br />
        <br />
        <br />
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderHeading}>
                    <h1>Contact Us</h1>
                </div>
                <div className={style.mainHolderContainer}>
                    <InputOne id="name" onChange={Handler} value={name} name={"Enter Your Name"} placeholder={"Enter Your Name"} />
                    <InputOne id="email" onChange={Handler} value={email} name={"Enter Your Email"} placeholder={"Enter Your Email"} />
                    <InputTwo id="query" onChange={Handler} value={query} name={"Enter Your Query"} placeholder={"Write Your Query We will get back to you soon..."} />
                    <ButtonThree onClick={SupportCall} name={"Send Query"} />
                </div>
            </div>


        </div>
        </>
    )
}

export default SupportPage