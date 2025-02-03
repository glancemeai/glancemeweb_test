'use client'
import Image from "next/image";
import style from "./ChatCard.module.css"
import { IoClose } from "react-icons/io5";
import ButtonOne, { ButtonFive, ButtonFour, ButtonTwo } from "../../Edit/buttons/Buttons";
import { BsSendFill } from "react-icons/bs";
import { InputTen } from "../../Edit/Input/Input";
import { useCallback, useEffect, useState } from "react";
import Apis from "@/app/service/hooks/ApiSlugs";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "@/app/redux/utils/message";
import {marked} from "marked"
const ChatCard = () => {
    const params = useParams()
    const router = useRouter();
    const [loading,setloading] = useState(true)
    const [Id,setId] = useState("")
    const [ChatData,setChatData] = useState<any>()
    const dispatch = useDispatch()
    const [chatMsg,setChatMsg] = useState("");

    const chatMsgHandler = (data:string) => {
        setChatMsg(data);
    } 


     const chatHandler = useCallback(async (notes_token: string) => {
            const apis = Apis()
            setloading(true)
            const params = new URLSearchParams({ urlCode: notes_token } as any).toString();
            console.log(params);
            
            await apis.GetChat(params).then(data => {
                if(data.status == 200){
                    setloading(false)
                    setChatData(data)
                    console.log(data);
                    
                }else{
                    setloading(false)
                    dispatch(setAlert({data:{message:data.message,show:true,type:"error"}}))
                }
            }).catch((error) => {
                dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }))
            })
        },[dispatch])
          useEffect(() => {
                if (params?.id) {
                    setId(Array.isArray(params.id) ? params.id[0] : params.id)
                    chatHandler(Array.isArray(params.id) ? params.id[0] : params.id)
                  }else{
                    setloading(false)
                  }
            },[params?.id,chatHandler])
    return (
        <div className={style.main}>
            <div className={style.mainHeader}>
                <div className={style.mainHeaderImage}>
                    <Image src={"/images/logo.jpg"} alt="logo" width={30} height={30} style={{objectFit:"cover",borderRadius:"50%"}} />
                    <p>Glanceme.Ai</p>
                </div> 
                <div className={style.mainHeaderClose}>
                    <p><IoClose size={20}/></p>
                </div>
            </div>
            <div className={style.mainCenter}>
                {ChatData?.data?.summary[0]?.summary ? ( <div className={style.mainCenterItem}>
                    <div className={style.mainCenterItemLeft} >
                        <div className={style.mainCenterItemLeftItem} dangerouslySetInnerHTML={{__html:marked.parse(ChatData?.data?.summary[0]?.summary)}}></div>
                    </div>
                </div>) : "" }
                {ChatData?.data?.chat?.messages.length > 0 ? ChatData?.data?.chat?.messages?.map((value:any,index:string) => {
                    return (
                        <>
                    {value?.role == 'ai' ? ( <div className={style.mainCenterItem}>
                        <div className={style.mainCenterItemLeft} >
                            <div className={style.mainCenterItemLeftItem} dangerouslySetInnerHTML={{__html:marked.parse(value?.content)}}></div>
                        </div>
                        </div>) : 
                        (<div className={style.mainCenterItem}>
                            <div className={style.mainCenterItemRight}>
                                <p>{value?.content}</p>
                            </div>
                        </div>) 
                    }
                        </>
                    )
                }) : "" }
                {ChatData?.data?.summary[0]?.summary && ChatData?.data?.chat?.messages.length > 0 ? "" : "No Chat Found"}
            </div>
            <div className={style.mainFooter}>
                <div className={style.mainFooterInput}>
                    <InputTen placeholder={"Type a message..."} value={chatMsg} onChange={chatMsgHandler}/>
                </div>
                <div className={style.mainFooterBtn}>
                    <ButtonFour name={""} icon={<BsSendFill size={20}/>} />
                </div>
            </div>
        </div>
    )
}

export default ChatCard;