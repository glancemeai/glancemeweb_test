'use client'
import React, { useEffect, useState } from 'react'
import Header from '../component/header/header'
import style from "./dashboard.module.css"
import DashboardLeft from './component/left/dashboardLeft'
import DashboardRight from './component/right/dashboardRight'
import Intro from './component/intro/intro'
import { cookies } from 'next/headers';
import Apis from '@/app/service/hooks/ApiSlugs'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/app/redux/utils/message'





export default function Dashboard() {
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<any>()
    const dispatch = useDispatch()

    const userDetails = async () => {
        const apis = Apis()
        await apis.UserDetails("user").then((data) => {
            setData(data)
            setLoading(false)
        }).catch((error) => {
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
