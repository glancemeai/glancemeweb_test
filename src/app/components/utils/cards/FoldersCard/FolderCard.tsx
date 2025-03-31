import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { MdOutlineDriveFileMove } from 'react-icons/md';
import { FaFolder, FaFolderOpen, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import style from './FolderCard.module.css';
import { FolderSkeleton } from '../../skeleton/skeleton';
import DateCreate from '../../action/date';
import { setAlert } from '@/app/redux/utils/message';
import { useDispatch, useSelector } from 'react-redux';
import Apis from '@/app/service/hooks/ApiSlugs';
import { setAllFolders } from '@/app/redux/utils/folders';
import { RootState } from '@/app/redux/store';
import Folders from '../../Interfaces/Folders';

// Define the folder structure based on the API response
interface FolderHierarchy {
  _id: string;
  name: string;
  parentFolder: string | null;
  createdAt: string;
  subfolders: FolderHierarchy[];
}

interface FolderCardProps {
  data: FolderHierarchy;
  loading: boolean;
  AlertShowHandler: (show: boolean, id?: string) => void;
  refresh?: () => void;
  folders?: Folders[];
}

const FolderCard = (props: FolderCardProps) => {
  const dispatch = useDispatch();
  const apis = Apis();
  
  const [showOptions, setShowOptions] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [editingFolderName, setEditingFolderName] = useState<string>(props.data.name);
  const [loading, setLoading] = useState(false);
  
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

    if (showMoveModal) {
      fetchFolders();
    }
  }, [apis, dispatch, folderHierarchy.length, showMoveModal]);

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

  // Function to filter out the current folder to prevent circular references
  const filterFolders = (folders: FolderHierarchy[]): FolderHierarchy[] => {
    return folders.filter(folder => {
      // Skip the current folder
      if (folder._id === props.data._id) {
        return false;
      }
      
      // Recursively filter subfolders if they exist
      // if (folder.subfolders && folder.subfolders.length > 0) {
      //   folder.subfolders = filterFolders(folder.subfolders);
      // }
      
      return true;
    });
  };

  const renderFolderTree = (folders: FolderHierarchy[], depth = 0) => {
    // Filter folders to prevent circular references
    const filteredFolders = filterFolders(folders);
    
    return filteredFolders.map(folder => {
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

  const toggleOptions = (isVisible: boolean) => {
    setShowOptions(isVisible);
  };

  const handleMoveClick = () => {
    setShowMoveModal(true);
    setShowOptions(false);
  };

  const handleEditClick = () => {
    setEditingFolderName(props.data.name);
    setShowEditModal(true);
    setShowOptions(false);
  };

  const handleCancelMove = () => {
    setShowMoveModal(false);
    setSelectedFolderId(null);
  };
  
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingFolderName(props.data.name);
  };

  const handleMove = async () => {
    if (!selectedFolderId) return;

    try {
      const response = await apis.moveFolderToFolder(props.data._id, selectedFolderId);
      
      if (response.status === 200) {
        dispatch(setAlert({
          data: {
            message: "Folder moved successfully",
            show: true,
            type: "success"
          }
        }));
        
        window.location.reload();
      } else {
        throw new Error(response.message || 'Failed to move folder');
      }
    } catch (error: any) {
      dispatch(setAlert({
        data: {
          message: error.message || "Failed to move folder",
          show: true,
          type: "error"
        }
      }));
    }
    
    setShowMoveModal(false);
    setSelectedFolderId(null);
  };

  const handleEditFolder = async () => {
    if (!editingFolderName.trim()) {
      dispatch(setAlert({
        data: {
          message: "Folder name cannot be empty",
          show: true,
          type: "error"
        }
      }));
      return;
    }

    try {
      const response = await apis.EditFolder({
        name: editingFolderName,
        folderId: props.data._id
      });
      
      if (response.status === 200) {
        dispatch(setAlert({
          data: {
            message: "Folder name updated successfully",
            show: true,
            type: "success"
          }
        }));
        
        if (props.refresh) {
          props.refresh();
        }
      } else {
        throw new Error(response.message || 'Failed to update folder name');
      }
    } catch (error: any) {
      dispatch(setAlert({
        data: {
          message: error.message || "Failed to update folder name",
          show: true,
          type: "error"
        }
      }));
    }
    
    setShowEditModal(false);
  };

  const renderMoveFolderDialog = () => {
    if (!showMoveModal) return null;

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
              onClick={handleCancelMove}
            >
              Cancel
            </button>
            <button 
              className={`${style.moveButton} ${!selectedFolderId ? style.moveButtonDisabled : ''}`}
              onClick={() => selectedFolderId && handleMove()}
              disabled={!selectedFolderId}
            >
              Move
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEditFolderDialog = () => {
    if (!showEditModal) return null;

    return (
      <div className={style.moveFolderModal}>
        <div className={style.moveFolderContent}>
          <div className={style.dialogHeader}>
            <h3>Edit Folder Name</h3>
          </div>
          
          <input 
            type="text"
            value={editingFolderName}
            onChange={(e) => setEditingFolderName(e.target.value)}
            className={style.editFolderInput}
            placeholder="Enter new folder name"
          />

          <div className={style.modalActions}>
            <button 
              className={style.cancelButton} 
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button 
              className={`${style.moveButton} ${!editingFolderName.trim() ? style.moveButtonDisabled : ''}`}
              onClick={handleEditFolder}
              disabled={!editingFolderName.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (props.loading) {
    return <FolderSkeleton />;
  }

  return (
    <div className={style.mainFolder}>
      <div className={style.mainFolderImage}>
        <Link href={`/folder/${props.data._id}`} passHref>
          <Image src="/images/folderv2.png" alt="folder" width={200} height={150} style={{ objectFit: 'contain' }} />
        </Link>
      </div>
      <div className={style.mainFolderDetails}>
        <Link href={`/folder/${props.data._id}`} passHref>
          <p>{props.data.name}</p>
        </Link>
        <div className={style.mainFolderDetailsOptions}
          onMouseEnter={() => toggleOptions(true)}
          onMouseLeave={() => toggleOptions(false)}
        >
          <p>{DateCreate(props.data.createdAt)}</p>
          <div className={style.mainFolderDetailsOptionsShow}>
            <BsThreeDotsVertical size={20}/>
            {showOptions && (
              <div className={style.mainNotesItemMenu}>
                <p onClick={handleMoveClick}>
                  <MdOutlineDriveFileMove size={20} /> Move to Folder
                </p>
                <p onClick={handleEditClick}>
                  <RiEditLine size={20} /> Edit Folder Name
                </p>
                <p onClick={() => props.AlertShowHandler(true, props.data._id)}>
                  <RiDeleteBin6Line size={20} /> Delete
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {renderMoveFolderDialog()}
      {renderEditFolderDialog()}
    </div>
  );
};

export default FolderCard;