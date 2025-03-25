'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import Header1 from "../../home/header/header";
import style from "./dashboard.module.css";
import { LuPlus } from "react-icons/lu";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";

import ButtonOne, { ButtonFive, ButtonFour } from "@/app/components/utils/Edit/buttons/Buttons";
import { SearchInput } from "@/app/components/utils/Edit/Input/Input";
import FolderCard from "@/app/components/utils/cards/FoldersCard/FolderCard";
import NotesCard from "@/app/components/utils/cards/NotesCard/NotesCard";
import NewFolderPopUp from "@/app/components/utils/popups/newfolder/newfolderpop";
import Filters from "@/app/components/utils/cards/Filter/FIlter";
import DeleteAlert from "@/app/components/utils/popups/deleteAlert/deleteAlert";
import { FolderSkeleton } from "@/app/components/utils/skeleton/skeleton";

import Apis from "@/app/service/hooks/ApiSlugs";
import { setAlert } from "@/app/redux/utils/message";
import Notes from "@/app/components/utils/Interfaces/Notes";
import Folders from "@/app/components/utils/Interfaces/Folders";
import Navigation from "@/app/home/navigation/navigation";
import DeleteAccount from "../component/deleteaccount/page";
import Link from "next/link";

interface FilterData {
  colors?: string[];
  type?: string;
  reminder?: boolean;
  title?: string;
}

interface NotesData {
  notes: Notes[];
  folders: Folders[];
  folderInfo?: any;
}

const SubHeader = ({
  search,
  onChange,
  searchHandler,
  filterShowHandler,
  folderShowHandler,
}: any) => (
  <div className={style.mainHolderHeader}>
    <div className={style.mainHolderHeaderTitle}>
      <Navigation />
      <p>All Notes</p>
    </div>
    <div className={style.mainHolderHeaderOptions}>
      <ButtonFive
        name="New Folder"
        icon={<LuPlus size={20} color="#848484" />}
        onClick={() => folderShowHandler(true)}
      />
      <div className={style.mainHolderHeaderOptionsSearch}>
        <SearchInput
          value={search}
          onChange={onChange}
          type="text"
          placeholder="Search in this Folder"
        />
        <ButtonFour onClick={() => searchHandler()} icon={<FiSearch size={18} color="#fff" />} />
        <p
          className={style.mainHolderHeaderOptionsSearchFilter}
          onClick={() => filterShowHandler(true)}
        >
          <HiOutlineAdjustmentsVertical size={25} />
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // States
  const [loading, setLoading] = useState(true);
  const [showNewFolderPopUp, setNewFolderPopUp] = useState(false);
  const [data, setData] = useState<any>(null);
  const [notesData, setNotesData] = useState<NotesData | null>(null);
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [folderIdAlert, setFolderIdAlert] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [title, setTitle] = useState("");
  const [folders, setFolders] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Notes[] | null>(null);
  const [filteredFolders, setFilteredFolders] = useState<Folders[] | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterData>({});

  // Handlers
  const folderShowHandler = (isVisible: boolean) => setNewFolderPopUp(isVisible);
  const filterShowHandler = (isVisible: boolean) => setFilterShow(isVisible);
  const alertShowHandler = (isVisible: boolean, folderId?: string) => {
    setFolderIdAlert(folderId || "");
    setAlertShow(isVisible);
  };

  // Handle search input changes - handles both event object or direct value
  const searchTitleHandler = (newValue: any) => {
    // Check if newValue is an event or a direct string value
    if (newValue && typeof newValue === 'object' && newValue.target) {
      setTitle(newValue.target.value);
    } else {
      setTitle(newValue);
    }
  };

  // Client-side search (for immediate feedback when API search is slow)
  const performLocalSearch = useCallback(() => {
    if (!notesData) return;

    // If no search term, show all notes and folders
    if (!title.trim() && Object.keys(currentFilters).length === 0) {
      setFilteredNotes(null);
      setFilteredFolders(null);
      return;
    }

    const searchTerm = title.trim().toLowerCase();
    
    // Filter notes
    const matchedNotes = notesData.notes.filter(note => {
      const titleMatch = note.title?.toLowerCase().includes(searchTerm) || false;
      const contentMatch = note.content?.toLowerCase().includes(searchTerm) || false;
      
      // Apply additional filters (if any)
      let passesFilters = true;
      if (currentFilters.type && currentFilters.type !== "none") {
        passesFilters = passesFilters && note.type === currentFilters.type;
      }
      
      if (currentFilters.reminder !== undefined) {
        passesFilters = passesFilters && note.reminder === currentFilters.reminder;
      }
      
      return (titleMatch || contentMatch) && passesFilters;
    });
    
    // Filter folders
    const matchedFolders = notesData.folders.filter(folder => 
      folder.name?.toLowerCase().includes(searchTerm) || false
    );
    
    setFilteredNotes(matchedNotes);
    setFilteredFolders(matchedFolders);
  }, [title, notesData, currentFilters]);

  const userDetails = useCallback(async () => {
    const apis = Apis();
    setLoading(true);

    try {
      const response = await apis.UserDetails("profile");
      if (response.status === 200) {
        setData(response);
      } else {
        router.push("/login");
        dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
      }
    } catch (error: any) {
      dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
    } finally {
      setLoading(false);
    }
  }, [router, dispatch]);

  const fetchNotesData = useCallback(async () => {
    const apis = Apis();
    setLoading(true);

    try {
      const response = await apis.AllNotes();

      if (response?.data) {
        setNotesData({
          notes: response.data.notes || [],
          folders: response.data.folders || [],
          folderInfo: response.data.folderInfo || null
        });
        
        // Reset filtered data when fetching fresh data
        setFilteredNotes(null);
        setFilteredFolders(null);
      }
    } catch (error: any) {
      console.error('Notes fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFolders = useCallback(async () => {
    const apis = Apis();
    setLoading(true);

    try {
      const response = await apis.GetFolders();

      if (response?.data) {
        setFolders(response.data);
      }
    } catch (error: any) {
      // Silently handle any errors
      console.error('Folders fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchNotesHandler = async (filters?: FilterData) => {
    // Update current filters if provided
    if (filters) {
      setCurrentFilters(filters);
    }
    
    // First perform local search for immediate feedback
    performLocalSearch();
    
    // Then try API search if possible
    const apis = Apis();
    setLoading(true);

    try {
      const filteredData: Record<string, string> = {};
      
      // Use provided filters or current filters
      const activeFilters = filters || currentFilters;
      
      // Safely add filters
      if (activeFilters.type && activeFilters.type !== "none") {
        filteredData.type = activeFilters.type;
      }
      if (activeFilters.reminder) {
        filteredData.reminder = String(activeFilters.reminder);
      }
      if (title) {
        filteredData.title = title;
      }

      const params = new URLSearchParams(filteredData).toString();
      const response = await apis.SearchNotes(params);

      if (response.status === 200 && response.data) {
        // Update the notes data with search results
        setNotesData({
          notes: response.data.notes || [],
          folders: response.data.folders || [],
          folderInfo: response.data.folderInfo || null
        });
        
        // Clear filtered states since we're now showing search results
        setFilteredNotes(null);
        setFilteredFolders(null);
      } else {
        dispatch(setAlert({ 
          data: { 
            message: response.message || 'Failed to search notes', 
            show: true, 
            type: "error" 
          } 
        }));
      }
    } catch (error: any) {
      dispatch(setAlert({ 
        data: { 
          message: error.message || 'An unexpected error occurred', 
          show: true, 
          type: "error" 
        } 
      }));
    } finally {
      setLoading(false);
    }
  };

  const deleteFolder = async (folderId: string) => {
    if (!folderId) {
      dispatch(setAlert({ data: { message: "Folder ID not found", show: true, type: "error" } }));
      return;
    }

    setLoadingAlert(true);
    const apis = Apis();

    try {
      const response = await apis.DeleteFolder({ parentFolderId: folderId });
      if (response.status === 200) {
        alertShowHandler(false, "");
        fetchNotesData();
        dispatch(setAlert({data: {message: "Folder Deleted Successfully", show: true, type: "success"}}))
      } else {
        dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
      }
    } catch (error: any) {
      dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
    } finally {
      setLoadingAlert(false);
    }
  };

  const refreshNotes = useCallback(async () => {
    try {
      await fetchNotesData();
      await fetchFolders();
    } catch (error) {
      console.error('Error refreshing notes:', error);
    }
  }, [fetchNotesData, fetchFolders]);

  // Method to move a note between folders in local state
  const moveNoteToFolder = useCallback((noteToken: string, targetFolderId: string) => {
    setNotesData((prevData: NotesData | null) => {
      if (!prevData?.notes) return prevData;

      const updatedNotes = prevData.notes.map(note => {
        if (note.notes_token === noteToken) {
          return { ...note, folderId: targetFolderId };
        }
        return note;
      });

      return {
        ...prevData,
        notes: updatedNotes
      };
    });
  }, []);

  // Run local search when title or filters change
  useEffect(() => {
    if (notesData) {
      performLocalSearch();
    }
  }, [notesData, title, currentFilters, performLocalSearch]);

  // Effects
  useEffect(() => {
    userDetails();
    fetchNotesData();
    fetchFolders();
  }, [userDetails, fetchNotesData, fetchFolders]);

  // Render Helper
  const renderContent = () => {
    // Determine which data to render
    const foldersToRender = filteredFolders || notesData?.folders || [];
    const notesToRender = filteredNotes || notesData?.notes || [];

    return (
      <>
        {loading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <FolderCard 
                key={index} 
                loading={true} 
                AlertShowHandler={() => {}} 
                data={{} as Folders}
              />
            ))}
            {Array.from({ length: 6 }).map((_, index) => (
              <NotesCard key={index} loading={true} />
            ))}
          </>
        ) : (
          <>
            {foldersToRender.map((folder: Folders, index: number) => (
              <FolderCard 
              key={index} 
              AlertShowHandler={alertShowHandler} 
              loading={loading} 
              data={folder}
              folders={notesData?.folders || []}
              refresh={refreshNotes}
              />
            ))}
            {notesToRender.map((note: Notes, index: number) => (
              <NotesCard 
                key={index.toString()} 
                data={note} 
                loading={loading} 
                folders={notesData?.folders || []} 
                refreshNotes={refreshNotes} 
                moveNoteToFolder={moveNoteToFolder} 
              />
            ))}
            {!loading && foldersToRender.length === 0 && notesToRender.length === 0 && (
              <div className={style.noResults}>
                {title !== "" ? (
                  <p>No matching folders or notes found for &quot;{title}&quot;</p>
                ) : (
                  <p>No notes found. Create your first note to get started!</p>
                )}
              </div>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className={style.main}>
      <div className={style.mainBg}></div>
      <Header1 />
      <div className={style.mainHolder}>
        <SubHeader
          search={title}
          onChange={searchTitleHandler}
          searchHandler={searchNotesHandler}
          filterShowHandler={filterShowHandler}
          folderShowHandler={folderShowHandler}
        />
        <div className={style.mainHolderBody}>{renderContent()}</div>
      </div>
      <Filters show={filterShow} filterShowHandler={filterShowHandler} onFilterApply={searchNotesHandler} />
      <DeleteAlert
        loading={loadingAlert}
        show={alertShow}
        Title="Delete Folder"
        message="Deleting this folder will remove all its notes and subfolders."
        cancle={() => alertShowHandler(false, "")}
        folderIdAlert={folderIdAlert}
        Delete={deleteFolder}
      />
      <NewFolderPopUp show={showNewFolderPopUp} refresh={fetchNotesData} folderShowHandler={folderShowHandler} />
    </div>
  );
};

export default Dashboard;