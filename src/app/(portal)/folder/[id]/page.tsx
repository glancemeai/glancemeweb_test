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
import Header from "../../component/header_v1/header";

import { LuPlus } from "react-icons/lu";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import style from "./folder.module.css";
import Apis from "@/app/service/hooks/ApiSlugs";
import { setAlert } from "@/app/redux/utils/message";

import Folders from "@/app/components/utils/Interfaces/Folders";
import Notes from "@/app/components/utils/Interfaces/Notes";

interface SubHeaderProps {
  name?: string;
  search: string;
  onChange: (value: string) => void;
  searchHandler: (data: filterData) => void;
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
          onChange={(e:any) => onChange(e.target.value)}
          type="text"
          placeholder="Search Notes"
        />
        <ButtonFour
          onClick={() =>
            searchHandler({ type: "none", reminder: false, title: search })
          }
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

  const folderShowHandler = useCallback((show: boolean) => {
    setShowNewFolderPopUp(show);
  }, []);

  const filterShowHandler = useCallback((show: boolean) => {
    setFilterShow(show);
  }, []);

  const AlertShowHandler = useCallback((show: boolean, folderId: string) => {
    setFolderIdAlert(folderId);
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
          console.log(response);
          
          setFolderData(response);
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
        if (response.status === "200") {
          AlertShowHandler(false, "");
          fetchData(id);
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
    async (filter: filterData) => {
      const apis = Apis();
      setLoading(true);

      try {
        const filteredData: filterData = { ...filter, folderId: id, title };
        if (filteredData.type === "none") delete filteredData.type;

        const query = new URLSearchParams(filteredData as any).toString();
        const response = await apis.SearchNotes(query);

        if (response.status === 200) {
          setFolderData(response);
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
      } finally {
        setLoading(false);
      }
    },
    [dispatch, id, title]
  );

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

  return (
    <div className={style.main}>
      <Header
        image={data?.data?.user?.image}
        title={folderData?.data?.folderInfo?.name || "folder"}
        backlink="/dashboard"
      />
      <div className={style.mainHolder}>
        <SubHeader
          search={title}
          name={folderData?.data?.folderInfo?.name}
          onChange={setTitle}
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
              {folderData?.data?.folders?.map((folder: Folders, index: string) => (
                <FolderCard
                  key={index}
                  data={folder}
                  AlertShowHandler={AlertShowHandler}
                  loading={loading}
                />
              ))}
              {folderData?.data?.notes?.map((note: Notes, index: string) => (
                <NotesCard key={index} data={note} loading={loading} />
              ))}
              {folderData?.data?.folders?.length === 0 &&
                folderData?.data?.notes?.length === 0 && (
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
