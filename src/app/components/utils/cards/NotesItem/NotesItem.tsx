import { useState } from "react";
import Image from "next/image"
import style from "./NotesItem.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSave, FaTimes } from "react-icons/fa";
import Notes from "../../Interfaces/Notes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/utils/message";
import Apis from "../../../../service/hooks/ApiSlugs";

interface NotesCard {
    data?:Notes;
    deleteNotes?: (notesToken: string) => void;
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
    const router = useRouter();
    const dispatch = useDispatch();
    const apis = Apis();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.data?.title || '');
    const [editedDescription, setEditedDescription] = useState(props.data?.description || '');

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };


    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(props.data?.title || '');
        setEditedDescription(props.data?.description || '');
    }

    const handleSaveEdit = async () => {
        if (!props?.data?.notes_token) {
            dispatch(setAlert({
                data: {
                    message: "Note ID not found",
                    show: true,
                    type: "error"
                }
            }));
            return;
        }

        try {
            const response = await apis.EditNotes({
                notes_token: props.data.notes_token,
                color: props.data.color,
                description: editedDescription,
                title: editedTitle,
                folderId: props.data.folderId ?? undefined,
                reminder: false,
                reminderDate: undefined
            });

            if (response.status === 200) {
                dispatch(setAlert({
                    data: {
                        message: "Note Updated Successfully",
                        show: true,
                        type: "success"
                    }
                }));
                
                // Refresh the page
                window.location.reload();
            } else {
                dispatch(setAlert({
                    data: {
                        message: response.message || "Failed to update note",
                        show: true,
                        type: "error"
                    }
                }));
            }
        } catch (error) {
            dispatch(setAlert({
                data: {
                    message: "An error occurred while updating the note",
                    show: true,
                    type: "error"
                }
            }));
        } finally {
            setIsEditing(false);
        }
    }

    const handleConfirmDelete = async () => {
        console.log('Delete token:', props?.data?.notes_token);
        
        if (!props?.deleteNotes) {
            console.error('Delete function not provided');
            dispatch(setAlert({
                data: {
                    message: "Delete function not available",
                    show: true,
                    type: "error"
                }
            }));
            setShowDeleteConfirm(false);
            return;
        }

        if (!props?.data?.notes_token) {
            console.error('No notes token found');
            dispatch(setAlert({
                data: {
                    message: "Note ID not found",
                    show: true,
                    type: "error"
                }
            }));
            setShowDeleteConfirm(false);
            return;
        }

        try {
            // Call the delete function passed from parent
            await props.deleteNotes(props.data.notes_token);
            
            // Additional navigation to ensure refresh
            window.location.reload()
        } catch (error) {
            console.error('Delete error:', error);
            dispatch(setAlert({
                data: {
                    message: "Failed to delete note",
                    show: true,
                    type: "error"
                }
            }));
        } finally {
            setShowDeleteConfirm(false);
        }
    }

    return (
        <div className={style.mainNotesItem} style={{background:`${hexToRgba(props?.data?.color || "", 0.4)}`}}>            
            {showDeleteConfirm && (
                <div className={style.deleteConfirmDialog}>
                    <div className={style.deleteConfirmContent}>
                        <p>Do you want to delete?</p>
                        <div className={style.deleteConfirmButtons}>
                            <button onClick={handleCancelDelete}>Cancel</button>
                            <button onClick={handleConfirmDelete} className={style.deleteButton}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <div className={style.mainNotesItemImage} style={{display:`${props?.data?.image ? "flex" : "none"}`}}>
                <Image src={`${props?.data?.image ? props?.data?.image : "/images/notesArticlelaceHolder.png"}`} alt={`${props?.data?.title}`} fill style={{objectFit:"cover",borderRadius:"8px"}}/>
            </div>
            <div className={style.mainNotesItemDetails}>
                <div className={style.mainNotesItemDetailsLine} style={{background:`${props?.data?.color}`}}></div>
                <div className={style.mainNotesItemDetailsText}>
                    {isEditing ? (
                        <>
                            <input 
                                type="text" 
                                value={editedTitle} 
                                onChange={(e) => setEditedTitle(e.target.value)}
                                placeholder="Note Title"
                                className={style.editInput}
                            />
                            <textarea 
                                value={editedDescription} 
                                onChange={(e) => setEditedDescription(e.target.value)}
                                placeholder="Note Description"
                                className={style.editTextarea}
                            />
                            <div className={style.editActions}>
                                <button className={style.simpleButton} onClick={handleSaveEdit}>Save</button>
                                <button className={style.cancelButton} onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>{props?.data?.title}</h3>
                            <p>{props?.data?.description}</p>
                        </>
                    )}
                </div>
            </div>
            <div className={style.mainNotesItemOptions}>
                <a 
                    href={
                        props?.data?.type === 'youtube' 
                            ? `${props?.data?.selectedData?.url}&t=${Math.floor(props?.data?.selectedData?.time || 0)}s`
                            : props?.data?.urlCode || '#'
                    } 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.mainNotesItemOptionsItem}
                >
                    <FiExternalLink size={20}/>
                </a>
                <div className={style.mainNotesItemOptionsItemTwo}>
                    <p onClick={toggleMenu}><BsThreeDotsVertical size={20}/></p>
                    <div className={`${style.mainNotesItemMenu} ${showMenu ? style.show : ''}`}>
                        <p onClick={handleEditClick}><FiEdit size={20}/> Edit</p>
                        <p onClick={handleDeleteClick}><RiDeleteBin6Line size={20}/> Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
