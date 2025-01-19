import Image from "next/image"
import style from "./header.module.css"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";


interface Data {
image:string;
title:string;
backlink:string;
forward?:string;
}

const Header = ({image,title,backlink,forward}:Data) => {
    return (
        <div className={style.main}>
            <div className={style.mainOne}>
                <div className={style.mainOneItemButton}>
                    <Link href={`${backlink}`} passHref ><p style={{color:`${backlink == "" ? "#BBBBBB" : "#161616"}`}}><RiArrowLeftSLine size={25}/></p></Link>
                    <Link href={`${forward}`} passHref ><p style={{color:`${forward == "" ? "#BBBBBB" : "#161616"}`}}><RiArrowRightSLine size={25}/></p></Link>
                </div>
                <div className={style.mainOneItemName}>
                    <p>{title || ""}</p>
                </div>
            </div>
            <div className={style.mainTwo}>
                <Link href={"/profile"} passHref ><Image src={image ? `/images/${image}.png` : `/images/1.png`} alt="profile" width={50} height={50} style={{objectFit:"cover",borderRadius:"50%"}} /></Link>
            </div>
        </div>
    )
}

export default Header