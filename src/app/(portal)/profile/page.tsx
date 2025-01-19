'use client'
import Apis from "@/app/service/hooks/ApiSlugs";
import Header from "../component/header_v1/header";
import style from  "./profile.module.css"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@/app/redux/utils/message";
import Image from "next/image";
import InputOne, { InputTen } from "@/app/components/utils/Edit/Input/Input";
import ButtonOne, { ButtonThree, ButtonTwo } from "@/app/components/utils/Edit/buttons/Buttons";


const Profile = () => {
    const router = useRouter();
    const [loading,setloading] = useState(true)
    const [data,setData] = useState<any>()

    const dispatch = useDispatch()

    const userDetails = useCallback(async () => {
        const apis = Apis()
        setloading(true)
        setData({})
        await apis.UserDetails("profile").then((data) => {
            if(data.status == 200){
                console.log(data);
                
                setData(data)
                setloading(false)
            }else{
                router.push("/login")
                setloading(false)
                dispatch(setAlert({data:{message:data.message,show:true,type:"error"}}))
            }
        }).catch((error) => {
            setloading(false)
            setData({})
            dispatch(setAlert({data:{message:error.message,show:true,type:"error"}}))
        })
    },[dispatch,router])
    useEffect(() => {
        userDetails()
    }, [userDetails])
    return (
        <>
        <Header image={data?.data?.user?.image} title="Profile" backlink="/dashboard" forward="" />
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderHeader}>
                    <div className={style.mainHolderHeaderImage}>
                        <Image src={data?.data?.user?.image ? `/images/${data?.data?.user?.image}.png` : `/images/1.png`} alt="" width={200} height={200} style={{objectFit:"cover",borderRadius:"50%"}} />
                    </div>
                </div>
                <div className={style.mainHolderBody}>
                    <div className={style.mainHolderBodyTitle}>
                        <p>Profile Details</p>
                    </div>
                    <div className={style.mainHolderBodyItem}>
                        <InputTen name={"Name"} placeholder={"Enter Your Name"} value={data?.data?.user?.name}/>
                    </div>
                    <div className={style.mainHolderBodyItem}>
                        <InputTen name={"Email"} disable={true} placeholder={"Enter Your Email"} value={data?.data?.user?.email}/>
                    </div>
                    <div className={style.mainHolderBodyTitle}>
                        <p>Credit Score</p>
                    </div>

                    <div className={style.mainHolderBodyItemHolder}>
                    {data?.data?.creditsData?.features?.map((value:any,index:string) => {
                        return (
                            <div key={index} className={style.mainHolderBodyItem}>
                                <h3>{value.name}</h3> <p>{value?.credits == 1000000 ? "unlimited" :value?.credits }</p>
                                {/* <InputTen name={`${value.name}`} disable={true} placeholder={"Enter Your Current Credits"} value={value?.credits == 1000000 ? "unlimited" :value?.credits }/> */}
                            </div>
                        )
                    })}
                    </div>

                    <div className={style.mainHolderBodyItem}>
                        <ButtonThree name={"Save Profile"}/>
                    </div>
                </div>
                <div className={style.mainHolderFooter}>

                </div>
            </div>
        </div>
        </>
    )
}


export default Profile;