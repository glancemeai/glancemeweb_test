'use client'
import React from 'react'
import style from "./dashboardleft.module.css"
import Image from 'next/image'
import SkeletonLeft from './skeleton'
export default function DashboardLeft({loading,image,name,email,currentCredits,qnaCredits}:{loading:boolean,image:string,name:string,email:string,currentCredits:string,qnaCredits:string}) {
    console.log(name);
    
    return (
        <div className={style.main}>
            {loading ? <SkeletonLeft/> :  (
            <div className={style.mainHolder}>
                <Image src={image ? `/images/${image}.png` : `/images/1.png`} alt='image of user' width={150} height={150} style={{ objectFit: "contain" }} />
                <div className={style.mainHolderDetails}>
                    <h3>{name || "login"}</h3>
                    <span>{email || ""}</span>
                    <span>{currentCredits ? `Credits ${currentCredits} | Q&A Credits ${qnaCredits}` : ""}</span>
                </div>
                <br />
                <br />
                <div className={style.mainHolderDetails}>
                    <p>Glanceme.Ai Beta Version</p>
                    <p style={{opacity:".5"}}>1.0.1v</p>
                </div>
            </div>
            )}
        </div>
    )
}
