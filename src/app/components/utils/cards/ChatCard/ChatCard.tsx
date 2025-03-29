'use client'
import Image from "next/image";
import style from "./ChatCard.module.css"
import { IoClose } from "react-icons/io5";
import ButtonOne, { ButtonFive, ButtonFour, ButtonTwo } from "../../Edit/buttons/Buttons";
import { BsSendFill } from "react-icons/bs";
import { InputTen } from "../../Edit/Input/Input";
import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import Apis from "@/app/service/hooks/ApiSlugs";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "@/app/redux/utils/message";
import {marked} from "marked"

const ChatCard = () => {
    const params = useParams()
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [Id, setId] = useState("");
    const [ChatData, setChatData] = useState<any>();
    const [videoUrl, setVideoUrl] = useState("");
    const [videoTime, setVideoTime] = useState(0);
    const [videoDetails, setVideoDetails] = useState("");
    const dispatch = useDispatch();
    const [chatMsg, setChatMsg] = useState("");

    const chatMsgHandler = (data: string) => {
        setChatMsg(data);
    }

    const chatHandler = useCallback(async (notes_token: string) => {
        const apis = Apis();
        setLoading(true);
        const params = new URLSearchParams({ urlCode: notes_token } as any).toString();
        console.log("Fetching chat with params:", params);
        setVideoUrl(notes_token);
        
        try {
            const data = await apis.GetChat(params);
            if (data.status == 200) {
                setLoading(false);
                setChatData(data);
                
                if (data?.data?.video_time) {
                    setVideoTime(data.data.video_time);
                }
                if (data?.data?.video_details) {
                    setVideoDetails(data.data.video_details);
                }
                
                console.log("Chat data received:", data);
            } else {
                setLoading(false);
                dispatch(setAlert({data:{message: data.message || "Failed to fetch chat", show: true, type: "error"}}));
            }
        } catch (error: any) {
            setLoading(false);
            dispatch(setAlert({ data: { message: error.message || "An error occurred", show: true, type: "error" } }));
        }
    }, [dispatch]);

    const sendMessage = async () => {
        if (!chatMsg.trim() || sending) return;
        
        const apis = Apis();
        setSending(true);
        
        try {
            const newUserMessage = {
                role: 'user',
                content: chatMsg
            };
            
            const updatedMessages = [
                ...(ChatData?.data?.chat?.messages || []),
                newUserMessage
            ];
            
            setChatData((prevData: any) => ({
                ...prevData,
                data: {
                    ...prevData?.data,
                    chat: {
                        ...prevData?.data?.chat,
                        messages: updatedMessages
                    }
                }
            }));
            alert(videoUrl)
            setChatMsg("");

            const response = await apis.SendChatMessage({
                video_url: videoUrl,
                video_time: videoTime || 3245,
                question: chatMsg,  
                video_details: videoDetails || "AI Research Paper on LLMs",
                tone: "Professional",
                language: "English",
                response_type: "Concise",
                model: "llama-3.1-8b-instant"
            });
            
            console.log("Message sent, response:", response);
            
            if (response.status === 200) {
                if (response.data?.answer) {
                    const aiMessage = {
                        role: 'ai',
                        content: response.data.answer
                    };
                    
                    setChatData((prevData: any) => ({
                        ...prevData,
                        data: {
                            ...prevData?.data,
                            chat: {
                                ...prevData?.data?.chat,
                                messages: [...updatedMessages, aiMessage]
                            }
                        }
                    }));
                } else {
                    await chatHandler(Id);
                }
            } else {
                dispatch(setAlert({
                    data: {
                        message: response.message || "Failed to send message",
                        show: true,
                        type: "error"
                    }
                }));
                await chatHandler(Id);
            }
        } catch (error: any) {
            dispatch(setAlert({
                data: {
                    message: error.message || "An error occurred while sending message",
                    show: true,
                    type: "error"
                }
            }));
            await chatHandler(Id);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        if (params?.id) {
            const id = Array.isArray(params.id) ? params.id[0] : params.id;
            setId(id);
            chatHandler(id);
        } else {
            setLoading(false);
        }
    }, [params?.id, chatHandler]);

    return (
        <div className={style.main}>
            <div className={style.mainHeader}>
                <div className={style.mainHeaderImage}>
                    <Image src={"/images/logo.jpg"} alt="logo" width={30} height={30} style={{objectFit:"cover",borderRadius:"50%"}} />
                    <p>Glanceme.Ai</p>
                </div> 
            </div>
            <div className={style.mainCenter}>
                {loading ? (
                    <div className={style.mainCenterItem}>
                        <div className={style.mainCenterItemLeft}>
                            <div className={style.mainCenterItemLeftItem}>Loading chat...</div>
                        </div>
                    </div>
                ) : (
                    <>
                        {ChatData?.data?.summary?.[0]?.summary ? (
                            <div className={style.mainCenterItem}>
                                <div className={style.mainCenterItemLeft}>
                                    <div 
                                        className={style.mainCenterItemLeftItem} 
                                        dangerouslySetInnerHTML={{__html: marked.parse(ChatData?.data?.summary[0]?.summary)}}
                                    />
                                </div>
                            </div>
                        ) : ""}
                        
                        {ChatData?.data?.chat?.messages?.length > 0 ? 
                            ChatData?.data?.chat?.messages?.map((value: any, index: number) => (
                                <div key={`msg-${index}-${value.role}`} className={style.mainCenterItem}>
                                    {value?.role === 'ai' ? (
                                        <div className={style.mainCenterItemLeft}>
                                            <div 
                                                className={style.mainCenterItemLeftItem} 
                                                dangerouslySetInnerHTML={{__html: marked.parse(value?.content)}}
                                            />
                                        </div>
                                    ) : (
                                        <div className={style.mainCenterItemRight}>
                                            <p>{value?.content}</p>
                                        </div>
                                    )}
                                </div>
                            )) 
                        : ""}
                        
                        {sending && (
                            <div className={style.mainCenterItem}>
                                <div className={style.mainCenterItemLeft}>
                                    <div className={style.mainCenterItemLeftItem}>
                                        Thinking...
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {!ChatData?.data?.summary?.[0]?.summary && 
                         !ChatData?.data?.chat?.messages?.length && 
                         !sending && "No Chat Found"}
                    </>
                )}
            </div>
            <div className={style.mainFooter}>
                <div className={style.mainFooterInput}>
                    <InputTen 
                        placeholder={"Type a message..."} 
                        value={chatMsg} 
                        onChange={chatMsgHandler}
                        onKeyPress={handleKeyPress}
                        disabled={sending || loading}
                    />
                </div>
                <div className={style.mainFooterBtn}>
                    <ButtonFour 
                        name={""} 
                        icon={<BsSendFill size={20}/>} 
                        onClick={sendMessage}
                        disabled={!chatMsg.trim() || sending || loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatCard;