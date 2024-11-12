'use client'
import React, { useEffect, useState } from 'react'
import style from "./dashboard.module.css"
import DashboardLeft from './component/left/dashboardLeft'
import DashboardRight from './component/right/dashboardRight'
import Intro from './component/intro/intro'
import Apis from '@/app/service/hooks/ApiSlugs'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/app/redux/utils/message'

export default function Dashboard() {
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<any>()
    const dispatch = useDispatch()

    const userDetails = async () => {
        const apis = Apis()
        await apis.UserDetails("profile").then((data) => {
            console.log(data);
            
            if(data.status == 200){
                setData(data)
                console.log(data);
                
                setLoading(false)
            }else{
                // window.location.href = "/login"
                setLoading(false)
                dispatch(setAlert({data:{message:data.message,show:true,type:"error"}}))
            }
        }).catch((error) => {
            console.log(error);

            setLoading(false)
            dispatch(setAlert({data:{message:error.message,show:true,type:"error"}}))
        })

    }

    useEffect(() => {
        userDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (<>
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderOne}>
                    <DashboardLeft loading={loading} data={data?.data} />
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
