"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import ButtonOne, { ButtonFive, ButtonFour } from "@/app/components/utils/Edit/buttons/Buttons";
import { SearchInput } from "@/app/components/utils/Edit/Input/Input";
import FolderCard from "@/app/components/utils/cards/FoldersCard/FolderCard";
import NotesCard from "@/app/components/utils/cards/NotesCard/NotesCard";
import NewFolderPopUp from "@/app/components/utils/popups/newfolder/newfolderpop";
import DeleteAlert from "@/app/components/utils/popups/deleteAlert/deleteAlert";
import Filters from "@/app/components/utils/cards/Filter/FIlter";
import { FolderSkeleton } from "@/app/components/utils/skeleton/skeleton";

import BreadcrumbHeader from "../../../component/BreadcumbHeader";
import Header1 from "@/app/home/header/header";


import { LuPlus } from "react-icons/lu";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import style from "./folder.module.css";
import Apis from "@/app/service/hooks/ApiSlugs";
import { setAlert } from "@/app/redux/utils/message";

import Folders from "@/app/components/utils/Interfaces/Folders";
import Notes from "@/app/components/utils/Interfaces/Notes";
import Header from "../../component/header_v1/header";
import Navigation from "@/app/home/navigation/navigation";

interface SubHeaderProps {
  name?: string;
  search: string;
  onChange: (value: any) => void;
  searchHandler: (data?: filterData) => void;
  filterShowHandler: (show: boolean) => void;
  folderShowHandler: (show: boolean) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  name,
  search,
  onChange,
  searchHandler,
  filterShowHandler,
  folderShowHandler,
}) => (
  <div className={style.mainHolderHeader}>
    <div className={style.mainHolderHeaderTitle}>
      <Navigation />
      <p>{name || "folder"}</p>
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
        <ButtonFour
          onClick={() => searchHandler()}
          name=""
          icon={<FiSearch size={18} />}
        />
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

interface filterData {
  colors?: string[];
  type?: string;
  reminder?: boolean;
  title?: string;
  folderId?: string;
}

const Folder = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [showNewFolderPopUp, setShowNewFolderPopUp] = useState(false);
  const [data, setData] = useState<any>();
  const [folderData, setFolderData] = useState<any>();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [filterShow, setFilterShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [folderIdAlert, setFolderIdAlert] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState<Notes[] | null>(null);
  const [filteredFolders, setFilteredFolders] = useState<Folders[] | null>(null);
  const [currentFilters, setCurrentFilters] = useState<filterData>({});
  const [isFiltered, setIsFiltered] = useState(false);
  

  // Handle search input changes - handles both event object or direct value
  const searchTitleHandler = useCallback((newValue: any) => {
    // Check if newValue is an event or a direct string value
    if (newValue && typeof newValue === 'object' && newValue.target) {
      setTitle(newValue.target.value);
    } else {
      setTitle(newValue);
    }
  }, []);

  // Client-side search for immediate feedback
  const performLocalSearch = useCallback(() => {
    if (!folderData?.data) return;

    // If no search term and no filters, show all notes and folders
    if (!title.trim() && Object.keys(currentFilters).length === 0) {
      setFilteredNotes(null);
      setFilteredFolders(null);
      setIsFiltered(false);
      return;
    }

    setIsFiltered(true);
    const searchTerm = title.trim().toLowerCase();
    
    // Filter notes
    let matchedNotes = folderData.data.notes || [];
    let matchedFolders = folderData.data.folders || [];
    
    if (searchTerm) {
      // Filter notes by search term
      matchedNotes = matchedNotes.filter((note: Notes) => {
        const titleMatch = note.title?.toLowerCase().includes(searchTerm) || false;
        const contentMatch = note.content?.toLowerCase().includes(searchTerm) || false;
        return titleMatch || contentMatch;
      });
      
      // Filter folders by search term
      matchedFolders = matchedFolders.filter((folder: Folders) => 
        folder.name?.toLowerCase().includes(searchTerm) || false
      );
    }
    
    // Apply additional filters if any
    if (currentFilters.type && currentFilters.type !== "none") {
      matchedNotes = matchedNotes.filter((note: Notes) => note.type === currentFilters.type);
    }
    
    if (currentFilters.reminder !== undefined) {
      matchedNotes = matchedNotes.filter((note: Notes) => note.reminder === currentFilters.reminder);
    }
    
    setFilteredNotes(matchedNotes);
    setFilteredFolders(matchedFolders);
  }, [title, folderData, currentFilters]);

  const folderShowHandler = useCallback((show: boolean) => {
    setShowNewFolderPopUp(show);
  }, []);

  const filterShowHandler = useCallback((show: boolean) => {
    setFilterShow(show);
  }, []);

  const AlertShowHandler = useCallback((show: boolean, id?: string) => {
    setFolderIdAlert(id || "");
    setAlertShow(show);
  }, []);

  const userDetails = useCallback(async () => {
    const apis = Apis();
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
    }
  }, [dispatch, router]);

  const fetchData = useCallback(
    async (folderId: string) => {
      const apis = Apis();
      setLoading(true);
      try {
        const response = await apis.AllNotes(folderId);
        if (response.status === 200) {
          setFolderData(response);
          // Reset filtered states when fetching fresh data
          setFilteredNotes(null);
          setFilteredFolders(null);
          setIsFiltered(false);
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const refreshCurrentFolder = useCallback(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  const deleteFolder = useCallback(
    async (folderId: string) => {
      if (!folderId) {
        dispatch(setAlert({ data: { message: "Folder Id Not Found", show: true, type: "error" } }));
        return;
      }
      setLoadingAlert(true);
      const apis = Apis();
      try {
        const response = await apis.DeleteFolder({ parentFolderId: folderId });
        if (response.status === 200) {
          AlertShowHandler(false, "");
          fetchData(id);
          dispatch(setAlert({data: {message: "Folder Deleted Successfully", show: true, type: "success"}}))
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
      } finally {
        setLoadingAlert(false);
      }
    },
    [dispatch, fetchData, AlertShowHandler, id]
  );

  const SearchNotesHandler = useCallback(
    async (filter?: filterData) => {
      // Update current filters if provided
      if (filter) {
        setCurrentFilters(filter);
      }
      
      // First perform local search for immediate feedback
      performLocalSearch();
      
      // Then try API search
      const apis = Apis();
      setLoading(true);
  
      try {
        // Use provided filters or current filters
        const activeFilters = filter || currentFilters;
        
        // Create the search parameters
        const filteredData: Record<string, string> = { 
          folderId: id
        };
        
        // Add title if it exists
        if (title) {
          filteredData.title = title;
        }
        
        // Add other filters safely
        if (activeFilters.type && activeFilters.type !== "none") {
          filteredData.type = activeFilters.type;
        }
        
        if (activeFilters.reminder !== undefined) {
          filteredData.reminder = String(activeFilters.reminder);
        }
        
        // Add recursive parameter for nested folder search
        filteredData.recursive = "true";
  
        const query = new URLSearchParams(filteredData).toString();
        const response = await apis.SearchNotes(query);
  
        if (response.status === 200) {
          setFolderData(response);
          // Clear filtered states since we're now showing search results
          setFilteredNotes(null);
          setFilteredFolders(null);
          // But we still want to know if we're showing filtered results
          setIsFiltered(true);
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
      } finally {
        setLoading(false);
      }
    },
    [dispatch, id, title, currentFilters, performLocalSearch]
  );

  // Run local search when title or filters change
  useEffect(() => {
    if (folderData?.data) {
      performLocalSearch();
    }
  }, [folderData?.data, title, currentFilters, performLocalSearch]);

  useEffect(() => {
    userDetails();
    if (params?.id) {
      const folderId = Array.isArray(params.id) ? params.id[0] : params.id;
      setId(folderId);
      fetchData(folderId);
    } else {
      setLoading(false);
    }
  }, [params, userDetails, fetchData]);

  // Determine which data to render
  const foldersToRender = filteredFolders || folderData?.data?.folders || [];
  const notesToRender = filteredNotes || folderData?.data?.notes || [];

  return (
    <div className={style.main}>
      <Header1 />
      <div className={style.mainHolder}>
        <SubHeader
          search={title}
          name={folderData?.data?.folderInfo?.name}
          onChange={searchTitleHandler}
          searchHandler={SearchNotesHandler}
          filterShowHandler={filterShowHandler}
          folderShowHandler={folderShowHandler}
        />
        <div className={style.mainHolderBody}>
          {loading ? (
            <>
              <FolderSkeleton />
              <FolderSkeleton />
              <FolderSkeleton />
            </>
          ) : (
            <>
              {foldersToRender.map((folder: Folders, index: number) => (
                <FolderCard
                  key={index.toString()}
                  data={folder}
                  AlertShowHandler={AlertShowHandler}
                  loading={loading}
                  refresh={refreshCurrentFolder}
                  folders={folderData?.data?.folders || []}
                />
              ))}
              {notesToRender.map((note: Notes, index: number) => (
                <NotesCard 
                  key={index.toString()} 
                  data={note} 
                  loading={loading} 
                  refreshNotes={refreshCurrentFolder}
                  folders={folderData?.data?.folders || []}
                />
              ))}
              {!loading && foldersToRender.length === 0 && notesToRender.length === 0 && isFiltered && (
                <div className={style.mainHolderBodyEmpty}>
                  <div className={style.mainHolderBodyEmptyImage}>
                    <Image
                      src="/images/emptyfolder.png"
                      alt="Empty Folder"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p>No matching folders or notes found for &quot;{title}&quot;</p>
                </div>
              )}
              {!loading && foldersToRender.length === 0 && notesToRender.length === 0 && !isFiltered && (
                <div className={style.mainHolderBodyEmpty}>
                  <div className={style.mainHolderBodyEmptyImage}>
                    <Image
                      src="/images/emptyfolder.png"
                      alt="Empty Folder"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p>This folder is empty</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Filters
        show={filterShow}
        filterShowHandler={filterShowHandler}
        onFilterApply={SearchNotesHandler}
      />
      <DeleteAlert
        loading={loadingAlert}
        show={alertShow}
        Title="Delete Folder"
        message="Click On Delete Button Your All Notes and Folder Related to this folder will be deleted."
        cancle={AlertShowHandler}
        folderIdAlert={folderIdAlert}
        Delete={deleteFolder}
      />
      <NewFolderPopUp
        show={showNewFolderPopUp}
        refresh={() => fetchData(id)}
        folderShowHandler={folderShowHandler}
      />
    </div>
  );
};

export default Folder;