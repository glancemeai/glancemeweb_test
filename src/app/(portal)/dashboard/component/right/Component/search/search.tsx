'use client'
import React from 'react'
import style from "./search.module.css"
import Image from 'next/image'
export default function Search(props:any) {
    return (
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderImage}>
                    <Image src={props?.user?.image ? `/images/${props?.user?.image}.png` : "/images/1.png"} alt='user' width={50} height={50} style={{ objectFit: "cover" }} />
                </div>
                <div className={style.mainHolderInput}>
                    <input type="text" placeholder='search your saved notes...' />
                </div>
                <div className={style.mainHolderButton}>
                    <button>search</button>
                </div>
            </div>
        </div>
    )
}
