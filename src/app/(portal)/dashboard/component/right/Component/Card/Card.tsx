import React from 'react'
import style from "./card.module.css"
import Image from 'next/image'
import Link from 'next/link';
export default function Card(props:any) {
     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date(props?.data?.createdAt);
    
    return (
        <div className={style.main}>
           <Link href={`/notes/Glanceme.Ai?url=${props?.data?.urlCode}`} passHref> <div className={style.mainImage}>
                <Image src={props?.data?.image ? `${props?.data?.image ?? "/images/logo-1.png"}` : "/images/logo-1.png"} alt={"user"} fill style={{ objectFit: "contain" }} />
            </div></Link>
            <Link href={`/notes/Glanceme.Ai?url=${props?.data?.urlCode}`} passHref> <div className={style.mainDetails}>
                <p style={{fontSize:"13px",padding:"2px 5px"}}> {d.getDate()} {months[d.getMonth()]} {d.getFullYear()}</p>
                <div className={style.mainDetailsTitle}>
                    <div className={style.mainDetailsTitleBg} style={{background:`${props?.data?.color}`}}></div>
                    <p  style={{borderLeft:`4px solid ${props?.data?.color}`}}>{props?.data?.title}</p>  
                </div>
            </div></Link>
        </div>
    )
}
