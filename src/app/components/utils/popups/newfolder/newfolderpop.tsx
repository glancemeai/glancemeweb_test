'use client'
import { useEffect, useState } from "react";
import { ButtonSix, ButtonTwo } from "../../Edit/buttons/Buttons";
import InputOne, { InputTen } from "../../Edit/Input/Input";
import style from "./newfolderpop.module.css"
import { useDispatch } from "react-redux";
import Apis from "@/app/service/hooks/ApiSlugs";
import { setAlert } from "@/app/redux/utils/message";
import { useParams } from "next/navigation";

const NewFolderPopUp = (props:any) => {
    const params = useParams()
    const [name,setName] = useState("")
    const [loading,setloading] = useState(false)
    const [show,setshow] = useState(props?.show || false)
    const dispatch = useDispatch()

    const CreateFolderHandler = async() => {
        const apis = Apis()
        setloading(true)
        if(name == "") {
            setloading(false)
            dispatch(setAlert({data:{message:"Enter Folder Name",show:true,type:"error"}}))
            return;
        }
        let id;
        if (params?.id) {
            id = Array.isArray(params.id) ? params.id[0] : params.id
        }else{
            id = null
        }
        await apis.CreateFolder({"parentFolderId":id,"name":name}).then((data) => {
            if(data.status == 201){
                setloading(false)
                folderShowHandle(false)
                props?.refresh()
                dispatch(setAlert({data:{message:data.message,show:true,type:"success"}}))
            }else{
                setloading(false)
                dispatch(setAlert({data:{message:data.message,show:true,type:"error"}}))
            }
        }).catch((error) => {
            setloading(false)
            dispatch(setAlert({data:{message:error.message,show:true,type:"error"}}))
        })
    }

    const folderShowHandle = (data:boolean) => {
        props?.folderShowHandler(data)
        if(data == false) {
            setName("")
        }
        setshow(data)
    }

    const nameHandler = (data:string) => {
        setName(data)
    }

    const handlekeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(event.key == "Enter" && name.trim() != "") {
            CreateFolderHandler()
        }
    }

    useEffect(() => {
        setshow(props?.show)
    },[props?.show])
    return (
        <div className={style.main} style={{display:`${show ? "block" : "none"}`}} onKeyDown={handlekeyDown} tabIndex={0}>
            <div className={style.mainClose} onClick={() => {folderShowHandle(false)}}></div>
            <div className={style.mainHolder}>
                <div className={style.mainHolderHeader}>
                    <p>New Folder</p>
                </div>
                <div className={style.mainHolderInput}>
                    <InputTen placeholder={"Enter Folder Name"} value={name} onChange={nameHandler}/>
                </div>
                <div className={style.mainHolderButton}>
                    <ButtonTwo name="cancel" onClick={() => {folderShowHandle(false)}}/>
                    <ButtonSix name="Create" loading={loading} loadingText={"creating"} onClick={CreateFolderHandler}/>
                </div>
            </div>
        </div>
    )
}

export default NewFolderPopUp;