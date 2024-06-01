import React, { useEffect, useState } from 'react'
import style from "./dashboardRight.module.css"
import Search from './Component/search/search'
import Card from './Component/Card/Card'
import Apis from '@/app/service/hooks/ApiSlugs'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/app/redux/utils/message'
import SkeletonDashboardRight from './skeleton'
import Image from 'next/image'
export default function DashboardRight(props: any) {
  const disptach = useDispatch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()
  const Data = async () => {
    const apis = Apis()
    await apis.AllNotes().then(data => {
      setData(data)
      setLoading(false);
    }).catch((error) => {
      disptach(setAlert({ data: { message: error.message, show: true, type: "error" } }))
      setLoading(false);
    })
  }

  useEffect(() => {
    Data()
  }, [])
  return (
    <div className={style.main}>
      {loading ? <SkeletonDashboardRight /> : (<div className={style.mainHolder}>
        <Search user={props?.user} />
        <div className={style.mainContentHeading}>
          <h2>All Notes</h2>
        </div>
        <div className={style.mainContentHolder}>
          {data?.data?.length == 0 ? <div style={{ position: "relative", width: "auto",margin:"2px auto", height: "auto", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}><Image src={"/images/notes.png"} alt='zero notes in database' width={350} height={350} style={{ objectFit: "contain" }} /><p>No Notes Found Add Your Notes...</p></div> :
            data?.data?.map((val: any, index: number) => {
              return (
                <Card key={index} data={val} />
              )
            })}
        </div>
      </div>)}
    </div>
  )
}
