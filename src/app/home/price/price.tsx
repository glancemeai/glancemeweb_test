'use client'
import Apis from "@/app/service/hooks/ApiSlugs"
import style from "./price.module.css"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { setAlert } from "@/app/redux/utils/message";
import { useDispatch } from "react-redux";
import { PriceCardSkeleton } from "@/app/components/utils/skeleton/skeleton";
import { PlansData } from "@/app/(portal)/price/page";
import PriceCard from "@/app/components/utils/cards/price/price";

const StaticPrice = () => {
    const router = useRouter();
    const [loading, setloading] = useState(true)
    const [plansData, setPlansData] = useState<any>()
    const dispatch = useDispatch()

    const PlanDetails = useCallback(async () => {
        const apis = Apis()
        setloading(true)
        setPlansData({})
        await apis.GetPlans().then((data) => {
            if(data.status == 200){
                console.log(data);
                
                setPlansData(data)
                setloading(false)
            }else{
                setloading(false)
                dispatch(setAlert({data:{message:data.message,show:true,type:"error"}}))
            }
        }).catch((error) => {
            setloading(false)
            setPlansData({})
            dispatch(setAlert({data:{message:error.message,show:true,type:"error"}}))
        })
    },[dispatch])

    useEffect(() => {
        PlanDetails()
    }, [PlanDetails])

    return (
        <div className={style.main}>
            {loading ? (
                <>
                    <PriceCardSkeleton />
                    <PriceCardSkeleton />
                    <PriceCardSkeleton />
                </>
            ) : (
                plansData?.data?.map((value:PlansData,index:string) => {
                    return (
                        <PriceCard key={index} id={value?._id} features={value?.features} name={value?.name} price={value?.price} videoLimit={value?.videoLimit}/>
                    )
                })
            )}
        </div>
    )
}

export default StaticPrice