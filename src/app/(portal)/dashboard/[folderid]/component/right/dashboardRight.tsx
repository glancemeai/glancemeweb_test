import React, { useEffect, useState } from 'react'
import style from "./dashboardRight.module.css"
import Search from './Component/search/search'
import Card, { FolderCard } from './Component/Card/Card'
import Apis from '@/app/service/hooks/ApiSlugs'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/app/redux/utils/message'
import SkeletonDashboardRight from './skeleton'
import Image from 'next/image'
import { useParams } from 'next/navigation'
export default function DashboardRight(props: any) {
  const params = useParams()

  const disptach = useDispatch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()
  const Data = async (folderid:string) => {
    const apis = Apis()
    
    await apis.AllNotes(folderid).then(data => {
      console.log(data);
      
      setData(data)
      setLoading(false);
    }).catch((error) => {
      disptach(setAlert({ data: { message: error.message, show: true, type: "error" } }))
      setLoading(false);
    })
  
  }

  useEffect(() => {
    if (params?.folderid) {
      Data(Array.isArray(params.folderid) ? params.folderid[0] : params.folderid)
    }else{
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={style.main}>
      {loading ? <SkeletonDashboardRight /> : (<div className={style.mainHolder}>
        <Search user={props?.user} />
        <div className={style.mainContentHeading}>
          <h2>All Notes</h2>
        </div>
        <div className={style.mainContentHolder}>
        {data?.data?.folders.map((val: any, index: number) => {
              return (
                <FolderCard key={index} data={val} />
              )
            })}
          {data?.data?.notes.length == 0 ? <div style={{ position: "relative", width: "auto",margin:"2px auto", height: "auto", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}><Image src={"/images/notes.png"} alt='zero notes in database' width={350} height={350} style={{ objectFit: "contain" }} /><p>No Notes Found Add Your Notes...</p></div> :
            data?.data?.notes.map((val: any, index: number) => {
              return (
                <Card key={index} data={val} />
              )
            })}
        </div>
      </div>)}
    </div>
  )
}
