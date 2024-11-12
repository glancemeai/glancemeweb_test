import styles from "./UserCard.module.css"
import Image from "next/image"
import { FiUserPlus } from "react-icons/fi"
import { ButtonTwo } from "../../Edit/buttons/Buttons"
import Link from "next/link"
import { BiUserCheck, BiUserCircle, BiUserPlus } from "react-icons/bi"

export function UserCardTwo(props: any) {
    let image = `${props?.data?.profile_pic_url}`.includes("tc-user-asset.s3.ap-south-1.amazonaws.com")

    return (
        <div className={styles.mainUserCardTwo}>
            <div className={styles.mainUserCardTwoImage}>
                <Image quality={4} loading="lazy" src={`${props?.data?.profile_pic_url ? (`${image ? props?.data?.profile_pic_url : (`https://tc-user-asset.s3.ap-south-1.amazonaws.com/${props?.data?.profile_pic_url}`)}`) : "/images/userbg.png"}`} alt="user" width={70} height={70} style={{ borderRadius: "50%", objectFit: "cover" }} />
            </div>
            <div className={styles.mainUserCardTwoDetails}>
                <Link href={`/tc/${props?.data?.user_id}`} passHref><p>{props?.data?.full_name ? props?.data?.full_name : props?.data?.first_name ? props?.data?.first_name : "Glanceme.Ai user"}</p></Link>
                <span>{props?.data?.friends ? (`${props?.data?.friends} connection `) : ""} <br />{props?.data?.location_name ? (`from ${props?.data?.location_name}`) : props?.data?.company_name ? props?.data?.company_name : "Glanceme.Ai"}</span>
            </div>
            <div className={styles.mainUserCardTwoButton}>
                {props?.data?.is_request_sent == 0 ? props?.data?.is_friend  == 0 ?  <div onClick={() => {props?.onClick ? props?.onClick(props?.data?.user_id) : ""}}><ButtonTwo icons={<FiUserPlus size={20} />} name="Add Connection" /></div> : <ButtonTwo icons={<BiUserCheck size={20} />} name="Request Sent" /> : props?.data?.is_request_sent == 1 ? props?.data?.is_friend == 1 ? <Link href={`/tc/${props?.data?.user_id}`} passHref><ButtonTwo icons={<BiUserCircle size={20} />} name="View Profile" /></Link> : props?.pendingReq ? <div onClick={() => {props?.pendingReq === true ? props?.onClick(props?.data?.user_id) : ""}}><ButtonTwo icons={<BiUserPlus size={20} />} name="Accept Request" /></div> : <ButtonTwo icons={<BiUserCheck size={20} />} name="Request Sent" /> : <div onClick={() => {props?.onClick ? props?.onClick(props?.data?.user_id) : ""}}><ButtonTwo icons={<FiUserPlus size={20} />} name="Add Connection" /></div> }
            </div>
        </div>
    )
}

export function MessageUsercard() {
    return (
        <div className={styles.messaegMainHolderItem}>
            <div className={styles.messaegMainHolderItemImage}>
                <Image src="/images/userbg.png" alt="user" width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover" }} />
            </div>
            <div className={styles.messaegMainHolderItemDetails}>
                <p>Anshit mishra</p>
                <span>hello frnd</span>
            </div>
            <div className={styles.messaegMainHolderItemButton}>
                <p>01</p>
                <span>22:02</span>
            </div>
        </div>
    )
}


export default function Usercard(props: any) {
    let image2 = `${props?.data?.profile_pic_url}`.includes("tc-user-asset.s3.ap-south-1.amazonaws.com");

    return (
        <div className={styles.mainHolderItem}>
            <div className={styles.mainHolderItemImage}>
                <Image loading='lazy' quality={props?.data?.profile_pic_url ? (`${image2 ? 60 : 60}`) : 10} src={`${props?.data?.profile_pic_url ? (`${image2 ? props?.data?.profile_pic_url : (`https://tc-user-asset.s3.ap-south-1.amazonaws.com/${props?.data?.profile_pic_url}`)}`) : "/images/userbg.png"}`} alt={`${props?.data?.full_name ?? ""}`} width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover", }} />
            </div>

            <div className={styles.mainHolderItemDetails}>
                <Link href={`/tc/${props?.data?.user_id}`} passHref><p>{props?.data?.full_name ? props?.data?.full_name : props?.data?.first_name ? props?.data?.first_name  : "" }</p></Link>
                <span>{props?.data?.location_name ? `from ${props?.data?.location_name}` : props?.data?.designation ? props?.data?.designation : props?.data?.company_name ? props?.data?.company_name : "" }</span>
            </div>
            <div className={styles.mainHolderItemButton}>
                <button title="add friend"><FiUserPlus size={20} /></button>
            </div>
        </div>
    )
}
