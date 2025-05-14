import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaFolder, FaTrash, FaChevronRight, FaChevronDown, FaArrowLeft, FaFolderOpen } from 'react-icons/fa';
import style from './Notes.module.css';
import { FolderSkeleton } from '../../skeleton/skeleton';
import Notes from '../../Interfaces/Notes';
import Link from 'next/link';
import Apis from '../../../../service/hooks/ApiSlugs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setAlert } from '../../../../redux/utils/message';
import { setAllFolders } from '../../../../redux/utils/folders';
import { MdOutlineDriveFileMove } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Folders from '../../Interfaces/Folders';

// Define the FolderHierarchy interface to match the API response
interface FolderHierarchy {
  _id: string;
  name: string;
  parentFolder: string | null;
  subfolders: FolderHierarchy[];
}

interface NotesCard {
  data?: Notes;
  loading: boolean;
  refreshNotes?: () => void;
  folders?: Folders[];
  moveNoteToFolder?: (noteToken: string, targetFolderId: string) => void;
}

const NotesCard = (props: NotesCard) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showMoveFolder, setShowMoveFolder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const apis = Apis();
  
  // Use Redux selector to get folders
  const folderHierarchy = useSelector((state: RootState) => state.folders.allFolders as unknown as FolderHierarchy[]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        // Only fetch if we don't have data yet
        if (folderHierarchy.length === 0) {
          const response = await apis.GetFolders();
          if (response.status === 200) {
            dispatch(setAllFolders(response.data));
          } else {
            throw new Error(response.message || 'Failed to fetch folders');
          }
        }
      } catch (error: any) {
        dispatch(setAlert({
          data: {
            message: error.message || "Failed to fetch folders",
            show: true,
            type: "error"
          }
        }));
      } finally {
        setLoading(false);
      }
    };

    if (showMoveFolder) {
      fetchFolders();
    }
  }, [apis, dispatch, folderHierarchy.length, showMoveFolder]);

  const toggleFolderExpansion = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering folder selection
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

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  const renderFolderTree = (folders: FolderHierarchy[], depth = 0) => {
    return folders.map(folder => {
      const hasChildren = folder.subfolders && folder.subfolders.length > 0;
      const isExpanded = expandedFolders.has(folder._id);
      
      return (
        <div key={folder._id} className={`${style.recursiveFolderItem} ${depth > 0 ? style.nestedFolder : ''}`}>
          <div 
            className={`${style.folderItem} ${selectedFolderId === folder._id ? style.folderItemSelected : ''}`}
            onClick={() => handleFolderSelect(folder._id)}
          >
            {hasChildren && (
              <span 
                className={style.folderExpandIcon} 
                onClick={(e) => toggleFolderExpansion(folder._id, e)}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
            {!hasChildren && <span className={style.folderExpandIconPlaceholder}></span>}
            
            <span className={style.folderNameWrapper}>
              {isExpanded ? <FaFolderOpen className={style.folderIcon} /> : <FaFolder className={style.folderIcon} />}
              <span className={style.folderName}>{folder.name}</span>
            </span>
            
            {hasChildren && (
              <span className={style.childCount}>
                {folder.subfolders.length} subfolder{folder.subfolders.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className={style.nestedFolderList}>
              {renderFolderTree(folder.subfolders, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const renderMoveFolderDialog = () => {
    if (!showMoveFolder) return null;

    return (
      <div className={style.moveFolderModal}>
        <div className={style.moveFolderContent}>
          <div className={style.dialogHeader}>
            <h3>Move to Folder</h3>
          </div>
          
          <div className={style.folderList}>
            {loading ? (
              <div className={style.loadingFolders}>Loading folders...</div>
            ) : folderHierarchy.length === 0 ? (
              <div className={style.noFolders}>No folders available</div>
            ) : (
              <div className={style.folderListContainer}>
                {renderFolderTree(folderHierarchy)}
              </div>
            )}
          </div>

          <div className={style.modalActions}>
            <button 
              className={style.cancelButton} 
              onClick={() => {
                setShowMoveFolder(false);
                setSelectedFolderId(null);
              }}
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
    setShowMoveFolder(true);
    setShowOptions(false);
  };

  const handleMoveToFolder = async (targetFolderId: string) => {
    try {
      if (!props.data?.notes_token) {
        throw new Error('Note token is required');
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

        window.location.reload();
      } else {
        throw new Error(result.message || 'Failed to move note');
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
    setSelectedFolderId(null);
  };

  const handleDelete = async () => {
    try {
      if (!props.data?.urlHash) {
        throw new Error('URL hash is required');
      }
  
      const result = await apis.DeleteAllNotes({
        urlCode: props.data.urlHash
      });
  
      if (result.status === 200) {
        dispatch(setAlert({
          data: {
            message: "Notes deleted successfully",
            show: true,
            type: "success"
          }
        }));
        
        // Navigate to dashboard after deletion
        window.location.href = '/dashboard';
      } else {
        throw new Error(result.message || 'Failed to delete notes');
      }
    } catch (error: any) {
      dispatch(setAlert({
        data: {
          message: error.message || "Failed to delete notes",
          show: true,
          type: "error"
        }
      }));
      console.error('Delete notes error:', error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  if (props.loading) {
    return <FolderSkeleton />;
  }

  return (
    <div className={style.notesCard}>
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
            <p>{props.data?.createdAt ? new Date(props.data.createdAt).toLocaleDateString() : ''}</p>
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
                <p>This will delete all the notes on this video/article. This action cannot be undone. Please click Delete to continue.</p>
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
    </div>
  );
};

export default NotesCard;