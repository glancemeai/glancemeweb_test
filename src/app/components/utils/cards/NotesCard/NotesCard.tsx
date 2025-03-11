import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaFolder, FaTrash, FaChevronRight, FaChevronDown, FaArrowLeft, FaEllipsisV, FaFolderOpen } from 'react-icons/fa';
import style from './Notes.module.css';
import {FolderSkeleton} from '../../skeleton/skeleton';
import Notes from '../../Interfaces/Notes';
import Folders from '../../Interfaces/Folders';
import DateCreate from '../../action/date';
import Link from 'next/link';
import Apis from '../../../../service/hooks/ApiSlugs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setAlert } from '../../../../redux/utils/message';
import { setAllFolders } from '../../../../redux/utils/folders';
import { MdOutlineDriveFileMove } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface NotesCard {
  data?:Notes;
  loading:boolean;
  folders?: Folders[]; 
  moveNoteToFolder?: (noteToken: string, targetFolderId: string) => void;
  refreshNotes?: () => void;
  AlertShowHandler?: (show: boolean, id?: string) => void; // Add this line

}

const NotesCard = (props: NotesCard) => {
 
  const [showOptions, setShowOptions] = useState(false);
  const [showMoveFolder, setShowMoveFolder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [currentFolderPath, setCurrentFolderPath] = useState<string[]>([]);
  const [hasFetchedFolders, setHasFetchedFolders] = useState(false);
  const dispatch = useDispatch();
  const apis = Apis();

  // Use Redux selector to get folders
  const allFolders = useSelector((state: RootState) => state.folders.allFolders);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        if (!hasFetchedFolders && allFolders.length === 0) {
          const response = await apis.GetFolders();
          if (response.status === 200) {
            dispatch(setAllFolders(response.data));
          }
          setHasFetchedFolders(true);
        }
      } catch (error) {
        dispatch(setAlert({
          data: {
            message: "Failed to fetch folders",
            show: true,
            type: "error"
          }
        }));
      }
    };

    fetchFolders();
  }, [apis, dispatch, hasFetchedFolders, allFolders.length]);

  const currentLevelFolders = useMemo(() => {
    // If no current folder path, show only root folders
    if (currentFolderPath.length === 0) {
      return allFolders.filter(folder => 
        !folder.parentFolder || folder.parentFolder === null
      );
    }
    
    // Show children of the current folder in the path
    const currentFolderId = currentFolderPath[currentFolderPath.length - 1];
    return allFolders.filter(folder => folder.parentFolder === currentFolderId);
  }, [allFolders, currentFolderPath]);

  const RecursiveFolderList: React.FC<{
    parentFolderId?: string | null;
    depth?: number;
    folders?: Folders[];
  }> = ({ parentFolderId = null, depth = 0, folders = allFolders }) => {
    const handleFolderSelect = (folderId: string) => {
      setSelectedFolderId(folderId);
    };

    const handleFolderDoubleClick = (folder: Folders) => {
      // Safely check for children
      const children = folder.children ?? [];
      
      // If folder has children, drill down
      if (children.length > 0) {
        setCurrentFolderPath(prev => [...prev, folder._id]);
        // Reset selected folder when drilling down
        setSelectedFolderId(null);
      } else {
        // If no children, just select the folder
        setSelectedFolderId(folder._id);
      }
    };

    const handleBackNavigation = () => {
      if (currentFolderPath.length > 0) {
        // Remove the last folder from the path
        setCurrentFolderPath(prev => prev.slice(0, -1));
        // Reset selected folder when going back
        setSelectedFolderId(null);
      }
    };

    return (
      <div className={style.folderListContainer}>
        {/* Back navigation */}
        {currentFolderPath.length > 0 && (
          <div 
            className={style.backButton} 
            onClick={handleBackNavigation}
          >
            <FaArrowLeft /> Back to Parent Folder
          </div>
        )}

        <div className={style.recursiveFolderList}>
          {currentLevelFolders.map(folder => {
            // Safely check for children
            const hasChildren = (folder.children?.length ?? 0) > 0;
            
            return (
              <div 
                key={folder._id} 
                className={`${style.recursiveFolderItem} ${depth > 0 ? style.nestedFolder : ''}`}
              >
                <div 
                  className={`${style.folderItem} ${selectedFolderId === folder._id ? style.folderItemSelected : ''}`}
                  onClick={() => handleFolderSelect(folder._id)}
                  // onDoubleClick={() => handleFolderDoubleClick(folder)}
                >
                  {hasChildren && (
                    <span className={style.folderExpandIcon}>
                      <FaChevronRight />
                    </span>
                  )}
                  
                  {hasChildren ? <FaFolderOpen /> : <FaFolder />}
                  
                  <span>{folder.name}</span>
                  
                  {hasChildren && (
                    <span className={style.childCount}>
                      {folder.children?.length ?? 0} subfolder{(folder.children?.length ?? 0) !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMoveFolderDialog = () => {
    if (!showMoveFolder) return null;

    const handleCancelMove = () => {
      setShowMoveFolder(false);
      setSelectedFolderId(null); // Reset selected folder
    };

    return (
      <div className={style.moveFolderModal}>
        <div className={style.moveFolderContent}>
          <div className={style.dialogHeader}>
            <h3>Move to Folder</h3>
          </div>
          <div className={style.folderList}>
            <RecursiveFolderList />
          </div>

          <div className={style.modalActions}>
            <button 
              className={style.cancelButton} 
              onClick={handleCancelMove}
            >
              Cancel
            </button>
            <button 
              className={`${style.moveButton} ${!selectedFolderId ? style.moveButtonDisabled : ''}`}
              onClick={() => selectedFolderId && handleMoveToFolder(selectedFolderId)}
              disabled={!selectedFolderId}
            >
              Move
            </button>
          </div>
        </div>
      </div>
    );
  };

  const toggleOptions = (isVisible: boolean) => {
    setShowOptions(isVisible);
  };

  const handleMoveClick = () => {
    setShowMoveFolder(true)
    setShowOptions(false);
  };

  const handleMoveToFolder = async (targetFolderId: string) => {
    try {
      if (!props.data?.notes_token) {
        throw new Error('Note token is required');
      }

      const targetFolder = allFolders.find(f => f._id === targetFolderId);
      if (!targetFolder?._id) {
        throw new Error('Invalid target folder');
      }

      if (targetFolderId === props.data?.folderId) {
        throw new Error('Cannot move note to its current folder');
      }

      const result = await apis.moveToFolder(targetFolderId, props.data.notes_token);

      if (result.status === 200) {
        dispatch(setAlert({
          data: {
            message: "Note moved successfully",
            show: true,
            type: "success"
          }
        }));

        if (props.refreshNotes) {
          props.refreshNotes();
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      dispatch(setAlert({
        data: {
          message: error.message || "Failed to move note",
          show: true,
          type: "error"
        }
      }));
    }
    
    setShowMoveFolder(false);
    setShowOptions(false);
  };

  const handleDelete = async () => {
    try {
      // Log the current note details for debugging
      console.log('Deleting Note:', {
        token: props.data?.notes_token,
        folderId: props.data?.folderId
      });

      const result = await apis.DeleteNotes({
        notes_token: props.data?.notes_token || ''
      });

      if (result.status === 200) {
        dispatch(setAlert({
          data: {
            message: "Note deleted successfully",
            show: true,
            type: "success"
          }
        }));
        
        // Always call refreshNotes if it's provided, with additional logging
        if (props.refreshNotes) {
          console.log('Triggering refreshNotes after delete');
          await props.refreshNotes();
        } else {
          console.warn('No refreshNotes method provided');
        }
        
        // Close delete confirmation modal
        setShowDeleteConfirm(false);
      } else {
        dispatch(setAlert({
          data: {
            message: "Failed to delete note",
            show: true,
            type: "error"
          }
        }));
      }
    } catch (error: any) {
      dispatch(setAlert({
        data: {
          message: error.message || "Failed to delete note",
          show: true,
          type: "error"
        }
      }));
      console.error('Delete note error:', error);
    }
  };

  const availableFolders = props.folders 
    ? props.folders.filter(folder => folder._id !== props.data?.folderId)
    : [];

  return (
    <div className={style.notesCard}>
      {props.loading ? (
        <FolderSkeleton />
      ) : (
        <div className={style.mainNotes}>
          <div className={style.mainNotesImage}>
            <Link href={`/notes/${props?.data?.urlHash}`} passHref>
              <Image 
                src={`${props?.data?.image ? props?.data?.image : props?.data?.metaimage ? props?.data?.metaimage : props?.data?.type == "youtube"  ? "/images/notesVideoPlaceHolder.png" : "/images/notesArticlelaceHolder.png"}`} 
                alt={`${props?.data?.type} notes image`} 
                width={200} 
                height={150} 
                style={{ objectFit: 'contain' }} 
              />
            </Link>
            {props?.data?.type == "youtube" ? (
              <div className={style.mainNotesImagePlay}> 
                <Image 
                  src="/images/playbtn.png" 
                  alt="folder" 
                  width={30} 
                  height={30} 
                  style={{ objectFit: 'contain' }} 
                />
              </div>
            ) : null}
          </div>
          <div className={style.mainNotesDetails}>
            <Link href={`/notes/${props?.data?.urlHash}`} passHref>
              <p>{props?.data?.title}</p>
            </Link>
            <div className={style.mainFolderDetailsOptions}
        onMouseEnter={() => toggleOptions(true)}
        onMouseLeave={() => toggleOptions(false)}
        >
          <p>{DateCreate(props.data?.createdAt || '')}</p>
          <div className={style.mainFolderDetailsOptionsShow}>
            <BsThreeDotsVertical size={20}/>
            {showOptions && (
              <div className={style.mainNotesItemMenu}>
                <p onClick={handleMoveClick}>
                  <MdOutlineDriveFileMove size={20} /> Move to Folder
                </p>
                <p onClick={() => setShowDeleteConfirm(true)}>
                  <RiDeleteBin6Line size={20} /> Delete
                </p>
              </div>
            )}
          </div>
        </div>
            {renderMoveFolderDialog()}
            {showDeleteConfirm && (
              <div className={style.deleteModal}>
                <div className={style.deleteContent}>
                  <h3>Delete Note</h3>
                  <p>Are you sure you want to delete this note? This action cannot be undone.</p>
                  <div className={style.modalActions}>
                    <button 
                      className={style.cancelButton}
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className={style.deleteButton}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesCard;
