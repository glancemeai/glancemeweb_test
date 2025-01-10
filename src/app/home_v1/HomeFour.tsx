import React from 'react'
import style from "./HomeFour.module.css"
import { AiOutlineUser } from 'react-icons/ai'
import { FaPlug, FaUserEdit } from 'react-icons/fa'
import { BiSearchAlt2, BiVideo } from 'react-icons/bi'
import { TbManualGearbox, TbSpeakerphone } from 'react-icons/tb'
import { BsRocketTakeoff } from 'react-icons/bs'
import { FiEdit, FiTrendingUp } from 'react-icons/fi'
import { MdOutlineDesignServices, MdReduceCapacity } from 'react-icons/md'
import { HiLanguage } from "react-icons/hi2";
import { FaFilePdf } from "react-icons/fa6";
import { TbBrandStackshare } from "react-icons/tb";
const Card = (props: any) => {
    return (
        <div className={style.card}>
            <div className={style.cardImage} style={{ background: `${props?.bgcolor ?? ""}` }}>
                <p>{props?.icon ?? ""}</p>
            </div>
            <div className={style.cardDetails}>
                <p>{props?.title ?? ""}</p>
                <span>{props?.desc ?? ""}</span>
            </div>
        </div>
    )
}


export default function HomeFour() {
    return (
        <div className={style.mainThree}>
            <div className={style.mainHolderThree}>
                <div className={style.mainThreeHeading}>
                    <h3>Browse Glanceme <span style={{}} >Features</span></h3>
                </div>
                <Card icon={<TbManualGearbox size={40}  />} title={"Learning With Youtube"} desc={"Understand video's in a new way"}  />
                <Card icon={<BsRocketTakeoff size={40} />} title={"Make Notes From Videos"} desc={"Mark Important Point in a video"}  />
                <Card icon={<TbSpeakerphone size={40} />} title={"Ask Q&A to Video"} desc={"AI new way of learning"}  />
{/*                 
                <div className={style.mainThreeHeading}>
                    <h3>Upcoming Glanceme <span style={{color:"#65c28c"}} >Category</span></h3>
                    <p></p>
                </div> */}
                <Card icon={<HiLanguage size={40}  />} title={"Multi Language Support"} desc={"Remove all barriers to learning."}  />
                <Card icon={<FaFilePdf size={40} />} title={"Chat With PDF"} desc={"Read PDFs summary Ask Question."}  />
                <Card icon={<TbBrandStackshare size={40} />} title={"Share Notes"} desc={"Share Your Knowledge With Your Friends."}  />
            </div>
        </div>
    )
}
