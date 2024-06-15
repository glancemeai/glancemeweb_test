import React, { useEffect, useState } from 'react'
import style from "./notes.module.css"
import { BsArrowLeft, BsSave } from 'react-icons/bs'
import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'
import Link from 'next/link'
import { CiMenuKebab } from 'react-icons/ci'
import { ButtonFour, ButtonThree } from '@/app/components/utils/Edit/buttons/Buttons'
import { FaFloppyDisk } from 'react-icons/fa6'
import Apis from '@/app/service/hooks/ApiSlugs'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/app/redux/utils/message'
import { IoMdClose } from 'react-icons/io'
import SkeletonNotes from '../skeleton'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Preview from '@/app/components/utils/preview/preview'





const EditNotes = (props: any) => {
    const dispatch = useDispatch()
    const [color, setColor] = useState(props?.color)
    const [description, setDescription] = useState(props?.desc)
    const [loading, setLoading] = useState(false)
    const colorHandler = (data: string) => {
        setColor(data)
    }

    const saveData = async (notes_token: string) => {
        const apis = Apis()
        setLoading(true)
        await apis.EditNotes({ color: color, description: description, notes_token: notes_token }).then(data => {
            setLoading(false)
            dispatch(setAlert({ data: { message: "Note updated!!!", show: true, type: "success" } }))
            props?.close()
            setColor("")
            setDescription("")
            props?.dataReload()
        }).catch((error) => {
            setLoading(false)
            setColor("")
            dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }))
            setDescription("")
            props?.close()
        })
    }
    const update = () => {
        setColor(props?.color)
        setDescription(props?.desc)
    }
    useEffect(() => {
        update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.color])
    return (
        <div className={style.mainEditNotes} style={{ display: `${props?.show ? "block" : "none"}` }}>
            <div className={style.mainEditNotesContainer}>
                <div className={style.mainEditNotesHeading}>
                    <p>Edit Note</p>
                    <p onClick={() => { props?.close ? props?.close() : "" }}><IoMdClose /></p>
                </div>
                <div className={style.mainEditNotesColor}>
                    <div className={style.mainEditNotesColorItem} style={{ backgroundColor: "rgb(244, 210, 145)", border: `${color == "rgb(244, 210, 145)" ? "2px solid #333" : "none"}` }} onClick={() => colorHandler("rgb(244, 210, 145)")}>
                    </div>
                    <div className={style.mainEditNotesColorItem} style={{ backgroundColor: "rgb(173, 216, 230)", border: `${color == "rgb(173, 216, 230)" ? "2px solid #333" : "none"}` }} onClick={() => colorHandler("rgb(173, 216, 230)")}>
                    </div>
                    <div className={style.mainEditNotesColorItem} style={{ backgroundColor: "rgb(177, 156, 217)", border: `${color == "rgb(177, 156, 217)" ? "2px solid #333" : "none"}` }} onClick={() => colorHandler("rgb(177, 156, 217)")}>
                    </div>
                    <div className={style.mainEditNotesColorItem} style={{ backgroundColor: "rgb(144, 238, 144)", border: `${color == "rgb(144, 238, 144)" ? "2px solid #333" : "none"}` }} onClick={() => colorHandler("rgb(144, 238, 144)")}>
                    </div>
                    <div className={style.mainEditNotesColorItem} style={{ backgroundColor: "rgb(255, 204, 203)", border: `${color == "rgb(255, 204, 203)" ? "2px solid #333" : "none"}` }} onClick={() => colorHandler("rgb(255, 204, 203)")}>
                    </div>
                </div>
                <div className={style.mainEditNotesDescription}>
                    <textarea placeholder='write your notes...' value={description} onChange={(e: any) => { setDescription(e.target.value) }}></textarea>
                </div>
                <div className={style.mainEditNotesButton}>
                    <ButtonThree load={loading} onClick={() => { saveData(props?.notes_token) }} icon={<FaFloppyDisk color='white' />} name={"save"} />
                </div>

            </div>
        </div>
    )
}




export default function Note(props: any) {
    const disptach = useDispatch()
    const router = useRouter()
    const path = usePathname()
    const search = useSearchParams()
    const Dates = (time: any) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(time);

        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    }
    const [noteToken, setNotToken] = useState("")
    const [editShow, setEditShow] = useState(false)
    const [editColor, setEditColor] = useState("")
    const [editDesc, setEditDesc] = useState("")

    const editShowHandler = (data: boolean) => {
        setEditShow(data)
    }

    const MenuHandler = (type: string, token: string, color: string, desc: string) => {
        if (type == "edit") {
            setNotToken(token)
            setEditShow(true)
            setEditColor(color)
            setEditDesc(desc)
        } else if (type == "delete") {
            setNotToken(token)
            setEditShow(false)
            setEditColor("")
            setEditDesc("")
            NotesDelete(token)
        }
    }

    const [notesData, setNotesData] = useState<any>([])
    const [notesLoading, setNotesLoading] = useState(true)

    const NotesHandler = async (url: string) => {
        const apis = Apis()
        await apis.SingleNotes({ urlCode: url }).then(data => {
            setNotesData(data)
            
            if(data.data.length <= 0){
                router.push("/dashboard")
                disptach(setAlert({data:{message:"Notes not fount",show:true,type:"error"}}))
            }
            setNotesLoading(false)
        }).catch((error) => {
            setNotesLoading(false)
            disptach(setAlert({ data: { message: error.message, show: true, type: "error" } }))
        })
    }

    const [url, setUrl] = useState("")
    const NotesDelete = async (token: string) => {
        const apis = Apis()

        await apis.DeleteNotes({ notes_token: token }).then(data => {
            NotesHandler(url)
            disptach(setAlert({ data: { message: "Deleted successfully", show: true, type: "info" } }))
            setNotesLoading(false)
        }).catch((error) => {
            setNotesLoading(false)
            disptach(setAlert({ data: { message: error.message, show: true, type: "error" } }))
        })
    }

    const [prevImage,setPrevImage] = useState("")
    const [prevDislay,setPrevDislay] = useState(false)

    const prevHandler = (image:string,display:boolean) => {
        setPrevImage(image)
        setPrevDislay(display)
    }

    useEffect(() => {
        const currentUrl = window.location.href;
        
        let newUrl = currentUrl;
        if (currentUrl.includes('https://devtool-eta.vercel.app/notes/roten.x?url=')) {
            newUrl = currentUrl.replace('https://devtool-eta.vercel.app/notes/roten.x?url=', '');
        } else if (currentUrl.includes('http://localhost:3000/notes/roten.x?url=')) {
            newUrl = currentUrl.replace('http://localhost:3000/notes/roten.x?url=', '');
        }
        setUrl(newUrl)
        NotesHandler(newUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {notesLoading ? <SkeletonNotes /> : (
                <div className={style.main}>
                    <div className={style.mainHeader}>
                        <Link href={"/dashboard"} passHref><div className={style.mainHeaderBack}>
                            <BsArrowLeft />
                        </div></Link>
                        <div className={style.mainHeaderDate}>
                            <p>{notesData?.data[0]?.data[0]?.type == "Youtube" ? "Youtube Notes" : "Text Notes"}</p>
                        </div>
                    </div>
                    <div className={style.mainHolder}>
                        <div className={style.mainHolderOne}>
                            <div className={style.mainHolderOneImage}>
                                <Image onClick={() =>prevHandler(notesData?.data[0]?.data[0]?.image,true)} src={notesData?.data[0]?.data[0]?.image ? notesData?.data[0]?.data[0]?.image : "/images/rotenx.png"} alt='user' fill style={{ objectFit: "contain" }} />
                            </div> 
                        </div>
                        <div className={style.mainHolderTwo}>
                            <div className={style.mainHolderTwoDetailLink}>
                                <a href={`${notesData?.data[0]?.data[0]?.type == "Youtube" ? `https://youtube.com/watch?v=${notesData?.data[0]?._id}` : notesData?.data[0]?._id}`} target="_blank" rel="noopener noreferrer"><p>{notesData?.data[0]?.data[0]?.type == "Youtube" ? `https://youtube.com/watch?v=${notesData?.data[0]?._id}` : notesData?.data[0]?._id} <BiLinkExternal /> </p></a>
                            </div>
                            {notesData?.data[0]?.data?.map((val: any, index: number) => {
                                return (
                                    <div className={style.mainHolderTwoDetail} key={index}>
                                        <div className={style.mainHolderTwoMenu} >
                                            <div className={style.mainHolderTwoMenuBar} >
                                                <CiMenuKebab />
                                                <div className={style.mainHolderTwoMenuItemContainer} >
                                                    <div className={style.mainHolderTwoMenuItemContainerItem} onClick={() => { MenuHandler("edit", val?.notes_token, val?.color, val?.description) }}>
                                                        Edit Note
                                                    </div>
                                                    <div className={style.mainHolderTwoMenuItemContainerItem} onClick={() => { MenuHandler("delete", val?.notes_token, "", "") }}>
                                                        Delete Note
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={style.mainHolderTwoDetailBg} style={{ background: `${val?.color}` }}></div>
                                        {notesData?.data[0]?.data[0]?.image == val?.image ? "" :
                                            <div className={style.mainHolderOneImage}>
                                                <Image onClick={() =>prevHandler(val?.image,true)} src={val?.image ? val?.image : "/images/rotenx.png"} alt='user' fill style={{ objectFit: "contain" }} />
                                            </div>}
                                        <p style={{ borderLeft: ` 4px solid ${val?.color}` }}><b>{val?.title}</b>
                                            {val?.description ? <br /> : ""}
                                            {val?.description ? <br /> : ""}
                                            {val?.description}
                                            <br />
                                        </p>
                                        <div className={style.mainHolderTwoDetailSub}>
                                            <a href={`${val.type == "Youtube" ? `https://youtube.com/watch?v=${val.urlCode}&t=${Math.ceil(val?.selectedData?.time)}s` : `${val.urlCode}#${val.notes_token}`}`} style={{ fontSize: "13px" }} target='_blank' rel="noopener noreferrer"> {val.type == "Youtube" ? `https://youtube.com/watch?v=${val.urlCode.substring(0, 10)}` : `${val.urlCode.substring(0, 30)}#${val.notes_token.substring(0, 3)}`}... <BiLinkExternal /> </a>
                                            <span>{Dates(val.time)}</span>
                                        </div>
                                    </div>
                                
                                )
                            })}
                        </div>
                    </div>
                    <Preview image={prevImage} display={prevDislay} onClick={prevHandler}/>
                    <EditNotes show={editShow} color={editColor} desc={editDesc} close={editShowHandler} notes_token={noteToken} dataReload={() => { NotesHandler(url) }} />
                </div>
            )}
        </>

    )
}
