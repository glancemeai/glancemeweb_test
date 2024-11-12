import React from 'react'
import style from "./dashboardleft.module.css"
import Image from 'next/image'
import SkeletonLeft from './skeleton'
export default function DashboardLeft(props:any) {
    console.log(props);
    
    return (
        <div className={style.main}>
            {props?.loading ? <SkeletonLeft/> :  (
            <div className={style.mainHolder}>
                <Image src={props?.data?.image ? `/images/${props?.data?.image}.png` : `/images/1.png`} alt='image of user' width={150} height={150} style={{ objectFit: "contain" }} />
                <div className={style.mainHolderDetails}>
                    <h3>{props?.data?.name ?? "login"}</h3>
                    <span>{props?.data?.email ?? ""}</span>
                    <span>{props?.data?.currentCredits ? `Credits ${props?.data?.currentCredits} | Q&A Credits ${props?.data?.qnaCredits}` : ""}</span>
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
