import React from 'react'
import style from "./intro.module.css"
import Image from 'next/image'
export default function Intro() {
    return (
        <div className={style.main}>
            <div className={style.mainHolder}>
                <Image src={"/images/logo-1.png"} alt='image of user' width={150} height={150} style={{ borderRadius: "50%", objectFit: "cover" }} />
                <div className={style.mainHolderDetails}>
                    <h3>Glanceme.Ai</h3>
                    <span>#WeWorkForChange</span>
                </div>
                <br />
                <div className={style.mainHolderDetails}>
                    <p>Our organization tackles real-world problems and aims to find simple solutions for global challenges. Together, we strive to make a meaningful impact on our world. 🌍✨</p>
                </div>
                <br />
                <div className={style.mainHolderDetails}>
                    <p>soon we will be open for open-source contribution stay tuned...</p>
                </div>
            </div>
        </div>
    )
}
