import React, { useState } from 'react';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { MdOutlineDriveFileMove } from 'react-icons/md';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import style from './FolderCard.module.css';
import { FolderSkeleton } from '../../skeleton/skeleton';
import DateCreate from '../../action/date';
import { setAlert } from '@/app/redux/utils/message';
import { useDispatch } from 'react-redux';
import Apis from '@/app/service/hooks/ApiSlugs';
import Folders from '../../Interfaces/Folders';

interface FolderCardProps {
  data: Folders;
  loading: boolean;
  AlertShowHandler: (show: boolean, id?: string) => void;
  folders?: Folders[];
  refresh?: () => void;
}

interface NestedFolder extends Folders {
  children?: NestedFolder[];
}

const NestedFolderSelector: React.FC<{
  folders: NestedFolder[];
  selectedFolderId: string;
  onSelectFolder: (folderId: string) => void;
  currentPath?: string;
  depth?: number;
}> = ({ 
  folders, 
  selectedFolderId, 
  onSelectFolder, 
  currentPath = '', 
  depth = 0 
}) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderFolders = (folderList: NestedFolder[], currentDepth: number) => {
    return folderList.map((folder) => {
      const isExpanded = expandedFolders.includes(folder._id);
      const hasChildren = folder.children && folder.children.length > 0;
      const fullPath = currentPath ? `${currentPath} / ${folder.name}` : folder.name;

      return (
        <div 
          key={folder._id} 
          className={style.nestedFolderItem}
          style={{ paddingLeft: `${currentDepth * 20}px` }}
        >
          <div 
            className={`
              ${style.folderItem} 
              ${selectedFolderId === folder._id ? style.selected : ''}
            `}
            onClick={() => onSelectFolder(folder._id)}
          >
            {hasChildren && (
              <span 
                className={style.expandIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(folder._id);
                }}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
            <span className={style.folderName}>{fullPath}</span>
          </div>
          
          {hasChildren && isExpanded && (
            <div>
              {renderFolders(folder.children || [], currentDepth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={style.nestedFolderList}>
      {renderFolders(folders, depth)}
    </div>
  );
};

const FolderCard = (props: FolderCardProps) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [folderName, setFolderName] = useState<string>(props.data.name);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFolderName, setEditingFolderName] = useState<string>(props.data.name);

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
    setSelectedFolderId("");
  }
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingFolderName(folderName);
  }

  

  const handleMove = async () => {
    if (!selectedFolderId) return;

    const apis = Apis();
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
        setShowMoveModal(false);
        if (props.refresh) {
          props.refresh();
        }
      } else {
        throw new Error(response.message);
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

    const apis = Apis();
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
        setFolderName(editingFolderName);
        setShowEditModal(false);
        if (props.refresh) {
          props.refresh();
        }
      } else {
        throw new Error(response.message);
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
  };

  if (props.loading) {
    return <FolderSkeleton />;
  }

  const availableFolders = props.folders?.filter(folder => folder._id !== props.data._id) || [];

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

      {showEditModal && (
        <div className={style.moveModal}>
          <div className={style.moveModalContent}>
            <h3>Edit Folder Name</h3>
            <input 
              type="text"
              value={editingFolderName}
              onChange={(e) => setEditingFolderName(e.target.value)}
              className={style.editFolderInput}
              placeholder="Enter new folder name"
            />
            <div className={style.modalButtons}>
              <button onClick={handleCancelEdit}>Cancel</button>
              <button 
                onClick={handleEditFolder}
                disabled={!editingFolderName?.trim()}
                className={!editingFolderName?.trim() ? style.disabled : ''}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showMoveModal && (
        <div className={style.moveModal}>
          <div className={style.moveModalContent}>
            <h3>Move to Folder</h3>
            <NestedFolderSelector
              folders={props.folders as NestedFolder[] || []}
              selectedFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
            />
            <div className={style.modalButtons}>
              <button onClick={handleCancelMove}>Cancel</button>
              <button 
                onClick={handleMove}
                disabled={!selectedFolderId}
                className={!selectedFolderId ? style.disabled : ''}
              >
                Move
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderCard;