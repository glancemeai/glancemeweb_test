'use client'
import React, { useEffect, useState } from 'react'
import style from "./notes.module.css"
import Header from '../../component/header/header'
import DashboardLeft from '../../dashboard/component/left/dashboardLeft'
import Intro from '../../dashboard/component/intro/intro'
import Note from './component/note'
import { useDispatch } from 'react-redux'
import Apis from '@/app/service/hooks/ApiSlugs'
import { setAlert } from '@/app/redux/utils/message'
import SkeletonNotes from './skeleton'

export default function SingleNote({searchParams}:any) {
    const [userData,setUserData] = useState<any>()
    const [userLoading,setUserLoading] = useState(true)
    const disptach = useDispatch()

    const UserHandler = async() => {
        const apis = Apis()
        await apis.UserDetails("details").then(data => {
            setUserData(data)
            setUserLoading(false)
        }).catch((error) => {
            setUserLoading(false)
            disptach(setAlert({data:{message:error.message,show:true,type:"error"}}))
        })
    }

    // const [notesData,setNotesData] = useState<any>()
    // const [notesLoading,setNotesLoading] = useState(true)
    
    // const NotesHandler = async(url:string) => {
    //     const apis = Apis()
    //     await apis.SingleNotes({urlCode:url}).then(data => {
    //         setNotesData(data)
    //         console.log(data);
            
    //         setNotesLoading(false)
    //     }).catch((error) => {
    //         setNotesLoading(false)
    //         disptach(setAlert({data:{message:error.message,show:true,type:"error"}}))
    //     })
    // }

    useEffect(() => {
        UserHandler()
    },[])
    return (<>
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderOne}>
                    <DashboardLeft loading={userLoading} data={userData?.data}/>
                    <Intro/>
                </div>
                <div className={style.mainHolderTwo}>
                    {/* {notesLoading ? <SkeletonNotes/> :<Note url={searchParams?.url} data={notesData?.data}/> } */}
                    <Note url={searchParams?.url} />
                </div>
            </div>
        </div>
    </>
    )
}
