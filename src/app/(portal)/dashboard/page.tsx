'use client'
import React, { useEffect, useState } from 'react'
import style from "./dashboard.module.css"
import DashboardLeft from './component/left/dashboardLeft'
import DashboardRight from './component/right/dashboardRight'
import Intro from './component/intro/intro'
import Apis from '@/app/service/hooks/ApiSlugs'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/app/redux/utils/message'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const router = useRouter();
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<any>({})
    const dispatch = useDispatch()

    const userDetails = async () => {
        const apis = Apis()
        setLoading(true)
        setData({})
        await apis.UserDetails("profile").then((data) => {
       
            if(data.status == 200){
                console.log(data);
                
                setData(data)
                setLoading(false)
            }else{
                router.push("/login")
                setLoading(false)
                dispatch(setAlert({data:{message:data.message,show:true,type:"error"}}))
            }
        }).catch((error) => {
            setLoading(false)
            setData({})
            dispatch(setAlert({data:{message:error.message,show:true,type:"error"}}))
        })

    }

    useEffect(() => {
        userDetails()
    }, [])
    return (<>
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderOne}>
                    <DashboardLeft loading={loading} name={data?.data?.name} email={data?.data?.email} currentCredits={data?.data?.currentCredits} image={data?.data?.image} qnaCredits={data?.data?.qnaCredits} />
                    <Intro />
                </div>
                <div className={style.mainHolderTwo}>
                    <DashboardRight user={data?.data}/>
                </div>

            </div>
        </div>
    </>
    )
}
