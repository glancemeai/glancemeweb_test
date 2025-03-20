import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import style from "./NotesItem.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Notes from "../../Interfaces/Notes";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/utils/message";
import Apis from "../../../../service/hooks/ApiSlugs";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import RichTextEditor from "../../../RichTextEditor/RichText";

interface NotesCard {
    data?: Notes;
    deleteNotes?: (notesToken: string) => void;
    loading: boolean;
}

function hexToRgba(hex: string, alpha = 1) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const NotesItem = (props: NotesCard) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const apis = Apis();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    
    const [showScreenshotEditor, setShowScreenshotEditor] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.data) {
            setEditedTitle(htmlToPlainText(props.data.title || ''));
            setEditedDescription(props.data.description || '');
        }
    }, [props.data]);

    // Add click outside handler for the menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }

        // Add event listener when menu is shown
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const htmlToPlainText = (html: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html || '';
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click from reaching document
        setShowMenu((prev) => !prev);
    };

    const handleImageClick = () => {
        if (props.data?.image) {
            setShowScreenshotEditor(true);
        }
    };

    const handleDeleteClick = () => {
        setShowMenu(false); // Close menu when delete dialog opens
        setShowDeleteConfirm(true);
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    }

    const handleEditClick = () => {
        setShowMenu(false); // Close menu when entering edit mode
        setIsEditing(true);
        setEditedTitle(htmlToPlainText(props.data?.title || ''));
        setEditedDescription(props.data?.description || '');
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const handleSaveEdit = async (content: string, title?: string) => {
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

        // Use the content and title from the rich text editor
        const updatedTitle = title || editedTitle;
        const updatedDescription = content;

        try {
            const response = await apis.EditNotes({
                notes_token: props.data.notes_token,
                color: props.data.color,
                description: updatedDescription,
                title: updatedTitle,
                folderId: props.data.folderId ?? undefined,
                reminder: false,
                reminderDate: undefined,
            });

            if (response.status === 200) {
                dispatch(setAlert({
                    data: {
                        message: "Note Updated Successfully",
                        show: true,
                        type: "success"
                    }
                }));
                
                // Update local state to avoid a full page reload
                setEditedTitle(updatedTitle);
                setEditedDescription(updatedDescription);
                setIsEditing(false);
                
                
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
        }
    }

    const handleConfirmDelete = async () => {
        if (!props?.deleteNotes) {
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
            await props.deleteNotes(props.data.notes_token);
            window.location.reload();
        } catch (error) {
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
        <>
            <div className={style.mainNotesItem} style={{background: `${hexToRgba(props?.data?.color || "", 0.4)}`}}>            
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
                
                <div 
                    className={`${style.mainNotesItemImage} ${props?.data?.image ? style.clickable : ''}`} 
                    style={{display: `${props?.data?.image ? "flex" : "none"}`}}
                    onClick={handleImageClick}
                >
                    <NextImage 
                        src={editedImage || props?.data?.image || "/images/notesArticlePlaceHolder.png"} 
                        alt={`${props?.data?.title || 'Note image'}`} 
                        fill 
                        style={{objectFit: "cover", borderRadius: "8px"}}
                    />
                </div>
                
                <div className={style.mainNotesItemDetails}>
                    <div className={style.mainNotesItemDetailsLine} style={{background: `${props?.data?.color}`}}></div>
                    <div className={style.mainNotesItemDetailsText}>
                        {isEditing ? (
                            <RichTextEditor 
                                initialContent={props.data?.description || ''}
                                initialTitle={htmlToPlainText(props.data?.title || '')}
                                onSave={handleSaveEdit}
                                onCancel={handleCancelEdit}
                                placeholder="Enter your note here..."
                            />
                        ) : (
                            <>
                               <h3 dangerouslySetInnerHTML={{ __html: props?.data?.title || "" }}></h3>
                                <p dangerouslySetInnerHTML={{ __html: props?.data?.description || "" }}></p>
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
                    <div className={style.mainNotesItemOptionsItemTwo} ref={menuRef}>
                        <p onClick={toggleMenu}><BsThreeDotsVertical size={20}/></p>
                        {showMenu && (
                            <div className={`${style.mainNotesItemMenu} ${showMenu ? style.show : ''}`}>
                                <p onClick={handleEditClick}><FaPencilAlt size={20}/> Edit</p>
                                <p onClick={handleDeleteClick}><RiDeleteBin6Line size={20}/> Delete</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showScreenshotEditor && (
                <div className={style.screenshotEditorOverlay}>
                    <div className={style.screenshotEditorContainer}>
                        <div className={style.screenshotHeader}>
                            <h2>Glanceme.Ai</h2>
                        </div>
                        
                        <div className={style.screenshotContent}>
                            <div className={style.imageContainer}>
                                <NextImage 
                                    src={props?.data?.image || "/images/notesArticlePlaceHolder.png"} 
                                    alt={`${props?.data?.title || 'Note image'}`} 
                                    fill 
                                    style={{objectFit: "contain"}}
                                />
                            </div>
                        </div>
                        
                        <div className={style.screenshotFooter}>
                            <div className={style.closeButtonContainer}>
                                <button 
                                    onClick={() => setShowScreenshotEditor(false)}
                                    className={style.closeButton}
                                >
                                    <FaTimes size={16} style={{ marginRight: '5px' }} /> Close Tab
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotesItem;