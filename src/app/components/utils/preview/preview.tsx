'use client'
import Image from "next/image";
import style from "./preview.module.css"
import { useEffect, useState } from "react";

const Preview = (props : any) => {
    const [display,setDisplay] = useState(false)

    useEffect(() => {
        setDisplay(props?.display)
    },[props?.display])
    return (
        <div className={style.main} style={{display:`${display ? "block" : "none"}`}}>
            <div className={style.mainClose} ></div>
            <div className={style.mainHolder} onClick={() => {props?.onClick("",false);setDisplay(false)}}>
                <Image src={props?.image ? props?.image : "/images/rotenx.png" } alt="image" fill style={{objectFit:"contain"}} />
            </div>
        </div>
    )
}

export default Preview;