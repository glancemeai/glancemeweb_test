'use client'
import Image from "next/image";
import style from "./sidemenu.module.css"
import { FaHome } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { FaRegFolder } from "react-icons/fa6";
import { RiOrganizationChart } from "react-icons/ri";
import { HiOutlineBell } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { logout } from "@/app/components/utils/logout/logout";
import Link from "next/link";

const Sidemenu = () => {
    return (
        <></>
        // <div className={style.main}>
        //     <div className={style.mainHeader}>
        //         <Link href={"/"} passHref><Image src={"/images/logo.jpg"} alt="glanceme.ai" width={35} height={35} style={{objectFit:"cover",borderRadius:"50%"}} /></Link>
        //     </div>
        //     <div className={style.mainCenter}>
        //         <Link href={"/dashboard"} passHref><p><RiHome2Fill size={25} /></p></Link>
        //         <p><FaRegFolder size={25}/></p>
        //         <p><RiOrganizationChart size={25}/></p>
        //         <p><HiOutlineBell size={25}/></p>
        //     </div>
        //     <div className={style.mainFooter}>
        //         <p onClick={() => {logout()}}><FiLogOut size={25}/></p>  
        //     </div>
        // </div>
    )
}

export default Sidemenu;