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

  // Handlers
  const folderShowHandler = (isVisible: boolean) => setNewFolderPopUp(isVisible);
  const filterShowHandler = (isVisible: boolean) => setFilterShow(isVisible);
  const alertShowHandler = (isVisible: boolean, folderId: string) => {
    setFolderIdAlert(folderId);
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
  }, [dispatch, router]);

  const fetchNotesData = useCallback(async () => {
    const apis = Apis();
    setLoading(true);

    try {
      const response = await apis.AllNotes();
      if (response.status === 200) {
        setNotesData(response);
      } else {
        dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
      }
    } catch (error: any) {
      dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

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
      } else {
        dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
      }
    } catch (error: any) {
      dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
    } finally {
      setLoadingAlert(false);
    }
  };

  const searchNotesHandler = async (filters: FilterData) => {
    const apis = Apis();
    setLoading(true);

    try {
      let filteredData = { ...filters };
        if (filteredData.type === "none") {
          delete filteredData.type;
        }

        if(title != ""){
            filteredData.title = title
        }
      // Convert `data` object into URL query parameters
      const params = new URLSearchParams(filteredData as any).toString();
      const response = await apis.SearchNotes(params);

      if (response.status === 200) {
        setNotesData(response);
      } else {
        dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
      }
    } catch (error: any) {
      dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    userDetails();
    fetchNotesData();
  }, [userDetails, fetchNotesData]);

  // Render Helper
  const renderContent = () => {
      if (loading) {
        return Array.from({ length: 3 }, (_, index) => <FolderSkeleton key={index} />);
      }
 

    if (!notesData?.data?.folders?.length && !notesData?.data?.notes?.length) {
      return (
        <div className={style.mainHolderBodyEmpty}>
          <div className={style.mainHolderBodyEmptyImage}>
            <Image src="/images/emptyfolder.png" alt="Empty Folder" fill style={{ objectFit: "contain" }} />
          </div>
          <p>This folder is empty</p>
        </div>
      );
    }

    return (
      <>
        {notesData?.data?.folders?.map((folder: Folders, index: string) => (
          <FolderCard key={index} AlertShowHandler={alertShowHandler} loading={loading} data={folder} />
        ))}
        {notesData?.data?.notes?.map((note: Notes, index: string) => (
          <NotesCard key={index} loading={loading} data={note} />
        ))}
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
