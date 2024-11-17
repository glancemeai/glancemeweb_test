'use client'
import React, { useEffect, useState } from 'react'
import style from "./notes.module.css"
import DashboardLeft from '../../dashboard/component/left/dashboardLeft'
import Intro from '../../dashboard/component/intro/intro'
import Note from './component/note'
import { useDispatch } from 'react-redux'
import Apis from '@/app/service/hooks/ApiSlugs'
import { setAlert } from '@/app/redux/utils/message'

export default function SingleNote() {
    const [userData, setUserData] = useState<any>({})
    const [userLoading, setUserLoading] = useState(true)
    const disptach = useDispatch()

    const UserHandler = async () => {
        const apis = Apis()
        await apis.UserDetails("profile").then(data => {
            if (data.status == 200) {
                console.log(data);
                
                setUserData(data)
                setUserLoading(false)
            } else {
                setUserLoading(false)
                disptach(setAlert({ data: { message: data.message, show: true, type: "error" } }))
            }
        }).catch((error) => {
            setUserLoading(false)
            disptach(setAlert({ data: { message: error.message, show: true, type: "error" } }))
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (<>
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderOne}>
                    <DashboardLeft loading={userLoading} name={userData?.data?.name} email={userData?.data?.email} currentCredits={userData?.data?.currentCredits} image={userData?.data?.image} qnaCredits={userData?.data?.qnaCredits} />
                    <Intro />
                </div>
                <div className={style.mainHolderTwo}>
                    {/* {notesLoading ? <SkeletonNotes/> :<Note url={searchParams?.url} data={notesData?.data}/> } */}
                    <Note />
                </div>
            </div>
        </div>
    </>
    )
}
