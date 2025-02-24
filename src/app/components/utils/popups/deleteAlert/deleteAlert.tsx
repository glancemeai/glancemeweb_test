
import { ButtonSix, ButtonTwo } from "../../Edit/buttons/Buttons";
import style from "./deleteAlert.module.css"

interface DeleteProps {
    Title:string;
    message:string;
    cancle:Function;
    Delete:Function;
    loading:boolean
    show:boolean;
    folderIdAlert:string;
}

const DeleteAlert = (props:DeleteProps) => {
    return (
        <div className={style.mainDeleteAlert} style={{display:`${props?.show ? "block" : "none"}`}}>
            <div className={style.mainDeleteAlertHolder}>
                <div className={style.mainDeleteAlertHolderHeader}>
                    <p>{props?.Title}</p>
                </div>
                <div className={style.mainDeleteAlertHolderMessage}>
                    <p>{props?.message}</p>
                </div>
                <div className={style.mainDeleteAlertHolderButton}>
                    <ButtonTwo name="Cancel" onClick={() => {props?.cancle(false)}}/>
                    <ButtonSix name="Delete" loading={props?.loading} loadingText={"Deleting"} onClick={() => {props?.Delete(props?.folderIdAlert)}}/>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlert;