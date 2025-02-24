'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";

import Header from "../component/header_v1/header";
import style from "./dashboard.module.css";
import { LuPlus } from "react-icons/lu";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

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
      <p>DashBoard</p>
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
          placeholder="Search Notes"
        />
        <ButtonFour onClick={() => searchHandler({ type: "none", reminder: false, title: search })} icon={<FiSearch size={18} />} />
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
  const [notesData, setNotesData] = useState<any>(null);
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [folderIdAlert, setFolderIdAlert] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [title, setTitle] = useState("");
  const [folders, setFolders] = useState<any[]>([]);

  // Handlers
  const folderShowHandler = (isVisible: boolean) => setNewFolderPopUp(isVisible);
  const filterShowHandler = (isVisible: boolean) => setFilterShow(isVisible);
  const alertShowHandler = (isVisible: boolean, folderId?: string) => {
    setFolderIdAlert(folderId || "");
    setAlertShow(isVisible);
  };

  const searchTitleHandler = (newTitle: string) => setTitle(newTitle);

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

      if (response?.data?.notes?.length > 0) {
        console.log('First note structure:', response.data.notes[0]);
      }
      if (response?.data) {
        setNotesData({
          notes: response.data.notes || [],
          folders: response.data.folders || [],
          folderInfo: response.data.folderInfo || null
        });
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

  const searchNotesHandler = async (filters: FilterData) => {
    const apis = Apis();
    setLoading(true);

    try {
      const filteredData: Record<string, string> = {};
      
      // Safely add filters
      if (filters.type && filters.type !== "none") {
        filteredData.type = filters.type;
      }
      if (filters.reminder) {
        filteredData.reminder = String(filters.reminder);
      }
      if (title) {
        filteredData.title = title;
      }

      const params = new URLSearchParams(filteredData).toString();
      const response = await apis.SearchNotes(params);

      if (response.status === 200 && response.data) {
        setNotesData(response);
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
        dispatch(setAlert({data: {message: "Folder Deleted Succesfully", show: true, type: "success"}}))
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

  // Effects
  useEffect(() => {
    userDetails();
    fetchNotesData();
    fetchFolders();
  }, [userDetails, fetchNotesData, fetchFolders]);

  // Render Helper
  const renderContent = () => {
    return (
      <>
        {loading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <FolderCard 
                key={index} 
                loading={true} 
                AlertShowHandler={() => {}} 
                data={notesData?.folders || []}
              />
            ))}
            {Array.from({ length: 6 }).map((_, index) => (
              <NotesCard key={index} loading={true} />
            ))}
          </>
        ) : (
          <>
            {notesData?.folders?.map((folder: Folders, index: number) => (
              <FolderCard 
                key={index} 
                AlertShowHandler={alertShowHandler} 
                loading={loading} 
                data={folder}
                folders={notesData?.folders || []}
                refresh={refreshNotes}
              />
            ))}
            {notesData?.notes?.map((note: Notes, index: string) => (
              <NotesCard 
                key={index} 
                data={note} 
                loading={loading} 
                folders={notesData?.folders || []} 
                refreshNotes={refreshNotes} 
                moveNoteToFolder={moveNoteToFolder} 
              />
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div className={style.main}>
      <Header image={data?.data?.user?.image} title="Dashboard" backlink="/" forward="" />
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
