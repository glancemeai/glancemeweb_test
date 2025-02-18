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
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../../redux/utils/message';

interface NotesCard {
  data?:Notes;
  loading:boolean;
  folders?: Folders[]; 
  moveNoteToFolder?: (noteToken: string, targetFolderId: string) => void;
  refreshNotes?: () => void;
}

const NotesCard = (props: NotesCard) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showMoveFolder, setShowMoveFolder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderHistory, setFolderHistory] = useState<string[]>([]);
  const [allFolders, setAllFolders] = useState<Folders[]>([]);
  const dispatch = useDispatch();
  const apis = Apis();

  useEffect(() => {
    const initializeFolders = async () => {
      // Prevent multiple calls if folders are already loaded
      if (allFolders.length > 0) return;

      try {
        const foldersResponse = await apis.GetFolders();
        
        if (foldersResponse.status === 200 && foldersResponse.data.length > 0) {
          // Directly set the nested folders from API
          setAllFolders(foldersResponse.data);
        } else {
          // Dispatch an alert if no folders found
          dispatch(setAlert({
            data: {
              message: "No folders available",
              show: true,
              type: "info"
            }
          }));
        }
      } catch (error) {
        // Handle any errors during folder retrieval
        dispatch(setAlert({
          data: {
            message: "Failed to retrieve folders",
            show: true,
            type: "error"
          }
        }));
      }
    };

    // Initialize folders only when needed
    if (showMoveFolder) {
      initializeFolders();
    }
  }, [showMoveFolder, allFolders.length]);

  const RecursiveFolderList: React.FC<{
    parentFolderId?: string | null;
    depth?: number;
    folders?: Folders[];
  }> = ({ parentFolderId = null, depth = 0, folders = allFolders }) => {
    // Get current level folders
    const currentLevelFolders = useMemo(() => {
      return folders.filter(folder => {
        if (parentFolderId === null) {
          return !folder.parentFolder;
        }
        return folder.parentFolder === parentFolderId;
      });
    }, [parentFolderId, folders]);

    // Expanded folders state
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    // Toggle folder expansion
    const toggleExpand = (folderId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setExpandedFolders(prev => {
        const newSet = new Set(prev);
        if (newSet.has(folderId)) {
          newSet.delete(folderId);
        } else {
          newSet.add(folderId);
        }
        return newSet;
      });
    };

    // No folders to display
    if (!currentLevelFolders.length) {
      return null;
    }

    return (
      <div className={style.recursiveFolderList}>
        {currentLevelFolders.map(folder => {
          // Check if folder has children
          const hasChildren = folder.children && folder.children.length > 0;
          const isExpanded = expandedFolders.has(folder._id);

          return (
            <div key={folder._id} className={style.recursiveFolderItem}>
              <div 
                className={`${style.folderItem} ${selectedFolderId === folder._id ? style.folderItemSelected : ''}`}
                style={{ paddingLeft: `${depth * 20}px` }}
                onClick={() => handleFolderSelect(folder._id)}
                onDoubleClick={() => handleFolderDoubleClick(folder._id)}
              >
                {hasChildren && (
                  <span 
                    className={style.folderExpandIcon}
                    onClick={(e) => toggleExpand(folder._id, e)}
                  >
                    {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                )}
                <FaFolder className={style.folderIcon} />
                <span>{folder.name}</span>
              </div>

              {hasChildren && isExpanded && (
                <RecursiveFolderList
                  parentFolderId={folder._id}
                  depth={depth + 1}
                  folders={folder.children}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleFolderDoubleClick = (folderId: string) => {
    // Find the specific folder by ID
    const clickedFolder = allFolders.find(folder => folder._id === folderId);
    
    // Check if folder has children using the new nested structure
    const hasChildren = clickedFolder?.children && clickedFolder.children.length > 0;
    
    if (hasChildren) {
      // Update folder history and current folder
      setFolderHistory(prev => [...prev, currentFolderId || 'root']);
      setCurrentFolderId(folderId);
      
      // Reset selected folder when navigating
      setSelectedFolderId(null);
    } else {
      // If no children, just select the folder
      setSelectedFolderId(folderId);
    }
  };

  const getVisibleFolders = () => {
    if (!currentFolderId) {
      // If no current folder, show root-level folders
      return allFolders.filter(folder => !folder.parentFolder);
    }
    
    // Find the current folder
    const currentFolder = allFolders.find(folder => folder._id === currentFolderId);
    
    // Return children of the current folder
    return currentFolder?.children || [];
  };

  const handleBack = () => {
    if (folderHistory.length > 0) {
      const previousFolder = folderHistory[folderHistory.length - 1];
      setCurrentFolderId(previousFolder === 'root' ? null : previousFolder);
      setFolderHistory(prev => prev.slice(0, -1));
    }
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  const renderMoveFolderDialog = () => {
    if (!showMoveFolder) return null;

    return (
      <div className={style.moveFolderModal}>
        <div className={style.moveFolderContent}>
          <div className={style.dialogHeader}>
            <h3>Move to Folder</h3>
            {folderHistory.length > 0 && (
              <button className={style.backButton} onClick={handleBack}>
                <FaArrowLeft /> Back
              </button>
            )}
          </div>
          
          <div className={style.folderList}>
            <RecursiveFolderList />
          </div>

          <div className={style.modalActions}>
            <button 
              className={style.cancelButton} 
              onClick={() => setShowMoveFolder(false)}
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

  const OptionsMenu = () => {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div className={style.optionsContainer}>
        <div 
          className={style.threeDotIcon}
          onClick={() => setShowOptions(!showOptions)}
        >
          <FaEllipsisV />
        </div>
        
        {showOptions && (
          <div className={style.optionsDropdown}>
            <div 
              className={style.optionItem}
              onClick={() => {
                toggleMoveFolder();
                setShowOptions(false);
              }}
            >
              <FaFolderOpen className={style.optionIcon} />
              <span className={style.optionText}>Move to Folder</span>
            </div>
            <div 
              className={style.optionItem}
              onClick={() => {
                toggleDeleteConfirm();
                setShowOptions(false);
              }}
            >
              <FaTrash className={style.optionIcon} />
              <span className={style.optionText}>Delete</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    if (showMoveFolder) {
      setShowMoveFolder(false);
      setSelectedFolderId(null);
      setCurrentFolderId(null);
      setFolderHistory([]);
    }
    if (showDeleteConfirm) {
      setShowDeleteConfirm(false);
    }
  };

  const toggleMoveFolder = () => {
    setShowMoveFolder(!showMoveFolder);
    setShowOptions(false);
    setSelectedFolderId(null);
    setCurrentFolderId(null);
    setFolderHistory([]);
  };

  const toggleDeleteConfirm = () => {
    setShowDeleteConfirm(!showDeleteConfirm);
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
      if (!props.data?.notes_token) {
        throw new Error('Note token is missing');
      }

      const result = await apis.DeleteNotes({
        notes_token: props.data.notes_token
      });

      if (result.status !== 200) {
        throw new Error(result.message);
      }

      dispatch(setAlert({
        data: {
          message: "Note deleted successfully",
          show: true,
          type: "success"
        }
      }));

      if (props.refreshNotes) {
        props.refreshNotes();
      }
    } catch (error: any) {
      dispatch(setAlert({
        data: {
          message: error.message || "Failed to delete note",
          show: true,
          type: "error"
        }
      }));
    }
  };

  const availableFolders = props.folders 
    ? props.folders.filter(folder => folder._id !== props.data?.folderId)
    : [];

  return (
    <>
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
            <div className={style.mainNotesDetailsOptions}>
              <p>{DateCreate(props.data?.createdAt || '')}</p>
              <OptionsMenu />
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
                      onClick={toggleDeleteConfirm}
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
    </>
  );
};

export default NotesCard;
