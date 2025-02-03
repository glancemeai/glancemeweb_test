'use client';
import style from './notes.module.css';
import { SearchInput } from '@/app/components/utils/Edit/Input/Input';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { IoShareSocialSharp } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import Header from '../../component/header_v1/header';
import NotesItem from '@/app/components/utils/cards/NotesItem/NotesItem';
import ChatCard from '@/app/components/utils/cards/ChatCard/ChatCard';
import Filters from '@/app/components/utils/cards/Filter/FIlter';
import DateCreate from '@/app/components/utils/action/date';
import { FolderSkeleton } from '@/app/components/utils/skeleton/skeleton';
import { ButtonFour } from '@/app/components/utils/Edit/buttons/Buttons';
import Apis from '@/app/service/hooks/ApiSlugs';
import { setAlert } from '@/app/redux/utils/message';
import type Notes from '@/app/components/utils/Interfaces/Notes';
import DeleteAlert from '@/app/components/utils/popups/deleteAlert/deleteAlert';
interface FilterData {
  colors?: string[];
  type?: string;
  reminder?: boolean;
  title?: string;
  noteUrlCode?: string;
}

const SubHeader = ({
  title = 'Folder',
  search,
  onSearchChange,
  onSearchSubmit,
  onFilterToggle,
}: {
  title?: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onFilterToggle: () => void;
}) => (
  <div className={style.mainHolderHeader}>
    <div className={style.mainHolderHeaderTitle}>
      <p>{title}</p>
    </div>
    <div className={style.mainHolderHeaderOptions}>
      <div className={style.mainHolderHeaderOptionsSearch}>
        <SearchInput
          value={search}
          onChange={(e:any) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Search Notes"
        />
        <ButtonFour onClick={onSearchSubmit} name="" icon={<FiSearch size={18} />} />
        <p className={style.mainHolderHeaderOptionsSearchFilter} onClick={onFilterToggle}>
          <HiOutlineAdjustmentsVertical size={25} />
        </p>
      </div>
    </div>
  </div>
);

const NotesPage = () => {
  const params = useParams();

  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [notesData, setNotesData] = useState<any>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [folderIdAlert, setFolderIdAlert] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);

  const AlertShowHandler = useCallback((show: boolean, folderId: string) => {
    setFolderIdAlert(folderId);
    setAlertShow(show);
  }, []);

  const apis = Apis();

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await apis.UserDetails('profile');
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        router.push('/login');
        dispatch(setAlert({ data: { message: response.message, show: true, type: 'error' } }));
      }
    } catch (error: any) {
      dispatch(setAlert({ data: { message: error.message, show: true, type: 'error' } }));
    }
  }, []);

  const fetchNotes = useCallback(
    async (notesToken: string) => {
      try {
        setLoading(true);
        const response = await apis.SingleNotes({ urlCode: notesToken });
        if (response.status === 200) {
          setNotesData(response);
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: 'error' } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: 'error' } }));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    async (filters: FilterData) => {
      try {
        setLoading(true);
        const queryParams = {
          ...filters,
          title: searchQuery || undefined,
          noteUrlCode: userId || undefined,
        };
        // const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
        const queryString = new URLSearchParams(
          Object.entries(queryParams)
            .filter(([_, value]) => value !== undefined && value !== null) 
            .reduce((acc, [key, value]) => {
              acc[key] = Array.isArray(value) ? value.join(',') : String(value);
              return acc;
            }, {} as Record<string, string>)
        ).toString();
        
        const response = await apis.SearchNotes(queryString);
        if (response.status === 200) {
          setNotesData(response);
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: 'error' } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: 'error' } }));
      } finally {
        setLoading(false);
      }
    },
    [apis, searchQuery, id, dispatch]
  );


  const deleteAllNotes = useCallback(
    async (id: string) => {
      if (!id) {
        dispatch(setAlert({ data: { message: "Note Id Not Found", show: true, type: "error" } }));
        return;
      }
      setLoadingAlert(true);
      const apis = Apis();
      try {
        const response = await apis.DeleteAllNotes({ urlCode: id });
        if (response.status === 200) {
          AlertShowHandler(false, "");
          dispatch(setAlert({ data: { message: response.message, show: true, type: "success" } }));
          router.push('/dashboard'); 
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
      } finally {
        setLoadingAlert(false);
      }
    },
    [dispatch, AlertShowHandler, params]
  );


  const deleteNotes = useCallback(
    async (notesId: string) => {
      if (!notesId) {
        dispatch(setAlert({ data: { message: "Note Id Not Found", show: true, type: "error" } }));
        return;
      }
      setLoadingAlert(true);
      const apis = Apis();
      try {
        const response = await apis.DeleteNotes({ notes_token: notesId });
        if (response.status === 200) {
          router.refresh()
          dispatch(setAlert({ data: { message: response.message, show: true, type: "success" } }));
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: "error" } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: "error" } }));
      } finally {
        setLoadingAlert(false);
      }
    },
    [dispatch,fetchNotes, params]
  );

  useEffect(() => {
    fetchUserDetails();
    if (params?.id) {
      const noteId = Array.isArray(params.id) ? params.id[0] : params.id;
      setId(noteId);
      fetchNotes(noteId);
    } else {
      setLoading(false);
    }
  }, [fetchUserDetails,fetchNotes,id]);

  return (
    <div className={style.main}>
      <Header image={userData?.user?.image} title="Notes" backlink="/dashboard" />
      <div className={style.mainHolder}>
        <SubHeader
          title={notesData?.data[0]?.type === 'youtube' ? 'YouTube Notes' : "Article's Notes"}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => handleSearch({})}
          onFilterToggle={() => setFilterVisible(!filterVisible)}
        />
        <div className={style.mainHolderBody}>
          <div className={style.mainHolderBodyLeft}>
            <div className={style.mainHolderBodyLeftSection}>
                <p style={{borderBottom:"2px solid black"}}>Notes</p>
                {/* <p>Mind Map</p> */}
            </div>
            <br />

            <div className={style.mainHolderBodyLeftNotes}>
            <div className={style.mainHolderBodyLeftNotesOptions}>
                <div className={style.mainHolderBodyLeftNotesOptionsItems}>
                    <p>{DateCreate(notesData?.data[0]?.createdAt)}</p>
                </div>
                <div className={style.mainHolderBodyLeftNotesOptionsItems}>
                    <p><IoShareSocialSharp size={20} color="#6086F8"/></p>
                    <p onClick={() => {AlertShowHandler(true,userId)}}><RiDeleteBin6Line size={20} color="#F47564"/></p>
                </div>
            </div>
            <div className={style.mainHolderBodyLeftNotesImage}>
                {notesData?.data[0]?.metaimage ? <Image src={`${notesData?.data[0]?.metaimage ? notesData?.data[0]?.metaimage : "/images/notesArticlelaceHolder.png"}`} alt="image" fill style={{objectFit:"cover"}}  /> : notesData?.data[0]?.type == "youtube" ? <iframe style={{width:"100%",height:"450px"}} src={`https://www.youtube.com/embed/${notesData?.data[0]?.urlCode}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> : ""}
            </div>
              {loading ? (<div style={{position:"relative",width:"100%",display:"flex",gap:"20px"}}>{
                Array.from({ length: 3 }, (_, index) => <FolderSkeleton key={index} />)}</div>
              ) : (
                notesData?.data?.map((note: Notes, index: string) => (
                  <NotesItem key={index} loading={false} data={note} deleteNotes={deleteNotes} />
                ))
              )}
            </div>
          </div>
          <div className={style.mainHolderBodyRight}>
            <ChatCard />
          </div>
        </div>
      </div>
      <Filters
        show={filterVisible}
        filterShowHandler={setFilterVisible}
        onFilterApply={(filters:FilterData) => handleSearch(filters)}
      />
      <DeleteAlert
        loading={loadingAlert}
        show={alertShow}
        Title="Delete Notes"
        message="Click On Delete Button Your All Notes and Folder Related to this Notes will be deleted."
        cancle={AlertShowHandler}
        folderIdAlert={folderIdAlert}
        Delete={deleteAllNotes}
      />
    </div>
  );
};

export default NotesPage;
