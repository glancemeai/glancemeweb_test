import React from 'react'
import style from "./card.module.css"
import Image from 'next/image'
import Link from 'next/link';
export default function Card(props:any) {
     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date(props?.data?.data[0]?.time);
    
    return (
        <div className={style.main}>
           <Link href={`/notes/roten.x?url=${props?.data?.data[0]?.urlCode}`} passHref> <div className={style.mainImage}>
                <Image src={props?.data?.data[0]?.image ? `${props?.data?.data[0]?.image ?? "/images/rotenx.png"}` : "/images/rotenx.png"} alt={"user"} fill style={{ objectFit: "contain" }} />
            </div></Link>
            <Link href={`/notes/roten.x?url=${props?.data?.data[0]?.urlCode}`} passHref> <div className={style.mainDetails}>
                <p style={{fontSize:"13px",padding:"2px 5px"}}> {d.getDate()} {months[d.getMonth()]} {d.getFullYear()}</p>
                <div className={style.mainDetailsTitle}>
                    <div className={style.mainDetailsTitleBg} style={{background:`${props?.data?.data[0]?.color}`}}></div>
                    <p  style={{borderLeft:`4px solid ${props?.data?.data[0]?.color}`}}>{props?.data?.data[0]?.title}</p>  
                </div>
            </div></Link>
        </div>
    )
}
