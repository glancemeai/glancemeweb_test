import Image from "next/image"
import style from "./NotesItem.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Notes from "../../Interfaces/Notes";


interface NotesCard {
    data?:Notes;
    loading:boolean;
}

function hexToRgba(hex:string, alpha = 1) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


const NotesItem = (props:NotesCard) => {
    return (
        <div className={style.mainNotesItem} style={{background:`${hexToRgba(props?.data?.color || "", 0.4)}`}}>            
            <div className={style.mainNotesItemImage} style={{display:`${props?.data?.image ? "flex" : "none"}`}}>
                <Image src={`${props?.data?.image ? props?.data?.image : "/images/notesArticlelaceHolder.png"}`} alt={`${props?.data?.title}`} width={250} height={200} style={{objectFit:"cover",borderRadius:"8px"}}/>
            </div>
            <div className={style.mainNotesItemDetails}>
                <div className={style.mainNotesItemDetailsLine} style={{background:`${props?.data?.color}`}}></div>
                <div className={style.mainNotesItemDetailsText}>
                    <h3>{props?.data?.title}</h3>
                    <p>{props?.data?.description}</p>
                </div>
            </div>
            <div className={style.mainNotesItemOptions}>
                <p className={style.mainNotesItemOptionsItem}><BsThreeDotsVertical size={20}/></p>
                <div className={style.mainNotesItemMenu}>
                    <p><FiEdit size={20}/> Edit</p>
                    <p><RiDeleteBin6Line size={20}/> Delete</p>
                </div>
            </div>
        </div>
    )
}

export default NotesItem

