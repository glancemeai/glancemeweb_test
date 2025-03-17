import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import style from "./NotesItem.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdColorLens } from "react-icons/md";
import Notes from "../../Interfaces/Notes";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/utils/message";
import Apis from "../../../../service/hooks/ApiSlugs";
import { FaTextHeight, FaPencilAlt, FaTrashAlt, FaPalette, FaTimes, FaSave } from "react-icons/fa";

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
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState<string | null>(null);
    const [currentColor, setCurrentColor] = useState('#FF0000');
    const [lineWidth, setLineWidth] = useState(3);
    const [textInput, setTextInput] = useState('');
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [showTextInput, setShowTextInput] = useState(false);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [initialImage, setInitialImage] = useState<HTMLImageElement | null>(null);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const colorOptions = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];

    const htmlToPlainText = (html: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html || '';
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    useEffect(() => {
        console.log(showScreenshotEditor)
        console.log(canvasRef.current)

       
        if (showScreenshotEditor && canvasRef.current) {
            console.log(props.data?.image)
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
                const img = new window.Image();
                img.crossOrigin = "anonymous";
                
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    
                    setInitialImage(img);
                    setIsImageLoaded(true);
                };
                
                img.onerror = (e) => {
                    console.error("Failed to load image:", e);
                    canvas.width = 800;
                    canvas.height = 600;
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#FF0000";
                    ctx.font = "24px Arial";
                    ctx.fillText("Unable to load image", 250, 300);
                    setIsImageLoaded(true);
                };
                
                const imageSrc = props.data?.image || '/images/notesArticlePlaceHolder.png';
                console.log(imageSrc , "abc")
                img.src = imageSrc;
            }
        }
    }, [showScreenshotEditor, props.data?.image]);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleImageClick = () => {
        if (props.data?.image) {
            setShowScreenshotEditor(true);
        }
    };
    
    

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current || !currentTool) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (currentTool === 'pencil') {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                setIsDrawing(true);
            }
        } else if (currentTool === 'text') {
            setTextPosition({ x, y });
            setShowTextInput(true);
        }
    };
    
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current || currentTool !== 'pencil') return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (ctx) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = currentColor;
            ctx.shadowBlur = 1;
            
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };
    
    const endDrawing = () => {
        setIsDrawing(false);
    };
    
    const addTextToCanvas = () => {
        if (!canvasRef.current || !textInput) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            ctx.font = '20px Arial';
            ctx.fillStyle = currentColor;
            ctx.fillText(textInput, textPosition.x, textPosition.y);
            setTextInput('');
            setShowTextInput(false);
        }
    };
    
    const handleToolChange = (tool: string) => {
        setCurrentTool(tool);
        setShowTextInput(false);
    };
    
    const handleColorChange = (color: string) => {
        setCurrentColor(color);
    };
    
    const handleColorButtonClick = () => {
        setShowColorPicker(prev => !prev);
    };
    const colorPickerStyles = {
        position: 'absolute',
        right: '70px',  
        top: '15px',   
        display: 'flex',
        flexWrap: 'wrap',
        width: '120px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000
    };

    const saveScreenshot = async () => {
        if (!canvasRef.current || !props?.data?.notes_token) {
            dispatch(setAlert({
                data: {
                    message: "Unable to save screenshot",
                    show: true,
                    type: "error"
                }
            }));
            return;
        }
        
        try {
            const dataUrl = canvasRef.current.toDataURL('image/png');
            setEditedImage(dataUrl);
            
            dispatch(setAlert({
                data: {
                    message: "Screenshot saved successfully",
                    show: true,
                    type: "success"
                }
            }));
            
            setShowScreenshotEditor(false);
        } catch (error) {
            dispatch(setAlert({
                data: {
                    message: "Failed to save screenshot",
                    show: true,
                    type: "error"
                }
            }));
        }
    };

    const handleDeleteClick = () => {

        setShowScreenshotEditor(false);
        setCurrentTool(null); 
        setIsDrawing(false);
        setEditedImage(null);
        setInitialImage(null);
        setTextInput('');
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    }

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedTitle(htmlToPlainText(props.data?.title || ''));
        setEditedDescription(htmlToPlainText(props.data?.description || ''));
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
                    <div className={style.mainNotesItemOptionsItemTwo}>
                        <p onClick={toggleMenu}><BsThreeDotsVertical size={20}/></p>
                        <div className={`${style.mainNotesItemMenu} ${showMenu ? style.show : ''}`}>
                            <p onClick={handleEditClick}><FaPencilAlt size={20}/> Edit</p>
                            <p onClick={handleDeleteClick}><RiDeleteBin6Line size={20}/> Delete</p>
                        </div>
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
                            <canvas
                                        ref={canvasRef}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={endDrawing}
                                        onMouseLeave={endDrawing}
                                        className={style.drawingCanvas}
                                    />
                                {/* {isImageLoaded ? (
                                    <canvas
                                        ref={canvasRef}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={endDrawing}
                                        onMouseLeave={endDrawing}
                                        className={style.drawingCanvas}
                                    />
                                ) : (
                                    <div className={style.loadingSpinner}>Loading...</div>
                                )} */}
                                
                            {showTextInput && (
                                <div 
                                    className={style.modernTextInputContainer}
                                    style={{
                                        position: 'absolute',
                                        left: `${textPosition.x}px`,
                                        top: `${textPosition.y}px`,
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addTextToCanvas();
                                            }
                                        }}
                                        autoFocus
                                        placeholder="Enter text"
                                        className={style.modernTextInput}
                                    />
                                    <div className={style.textInputControls}>
                                        <button 
                                            onClick={addTextToCanvas}
                                            className={style.textAddButton}
                                        >
                                            <FaSave size={16} />
                                        </button>
                                        <button 
                                            onClick={() => setShowTextInput(false)}
                                            className={style.textCancelButton}
                                        >
                                            <FaTimes size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            </div>
                            
                            <div className={style.sideToolbar}>
                                <button 
                                    className={`${style.toolButton} ${currentTool === 'text' ? style.activeToolButton : ''}`} 
                                    onClick={() => handleToolChange('text')}
                                >
                                    <FaTextHeight size={18} className={style.toolIcon} />
                                </button>
                                <button 
                                    className={`${style.toolButton} ${currentTool === 'pencil' ? style.activeToolButton : ''}`} 
                                    onClick={() => handleToolChange('pencil')}
                                >
                                    <FaPencilAlt size={18} className={style.toolIcon} />
                                </button>
                                <button 
                                    className={style.toolButton} 
                                    onClick={handleDeleteClick}
                                >
                                    <FaTrashAlt size={18} className={style.toolIcon} />
                                </button>
                                <button 
                                    className={style.toolButton} 
                                    onClick={handleColorButtonClick}
                                >

                                    <FaPalette size={18} className={style.toolIcon} />
                                </button>
                                
                                {showColorPicker && (
                                    <div 
                                        className={style.colorPickerContainer}
                                    >
                                        {colorOptions.map((color) => (
                                            <div 
                                                key={color} 
                                                className={style.colorOption}
                                                style={{ 
                                                    backgroundColor: color,
                                                    width: '25px',
                                                    height: '25px',
                                                    margin: '3px',
                                                    borderRadius: '50%',
                                                    cursor: 'pointer',
                                                    border: currentColor === color ? '2px solid #333' : '1px solid rgba(0,0,0,0.1)'
                                                }}
                                                onClick={() => {
                                                    handleColorChange(color);
                                                    setShowColorPicker(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                
                                <div className={style.profileButton}>
                                    <div className={style.profileCircle}></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={style.screenshotFooter}>
                            <button 
                                onClick={() => setShowScreenshotEditor(false)}
                                className={style.closeButton}
                            >
                                <FaTimes size={16} style={{ marginRight: '5px' }} /> Close Tab
                            </button>
                            <button 
                                onClick={saveScreenshot}
                                className={style.saveButton}
                            >
                                <FaSave size={16} style={{ marginRight: '5px' }} /> Save Screenshot
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotesItem;