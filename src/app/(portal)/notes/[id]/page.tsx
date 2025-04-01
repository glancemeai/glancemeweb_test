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

import Header1 from '@/app/home/header/header';
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
import Navigation from '@/app/home/navigation/navigation';

interface FilterData {
  colors?: string[];
  type?: string;
  reminder?: boolean;
  title?: string;
  noteUrlCode?: string;
}

interface Flashcard {
  _id: string;
  title: string;
  content: string;
  importance: string;
  color: string;
  timestamp: string;
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
      <Navigation />
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

const FlashcardItem = ({ flashcard }: { flashcard: Flashcard }) => {
  const [flipped, setFlipped] = useState(false);
  
  // Convert color string to actual color (remove backticks if present)
  const getColor = (colorStr: string) => {
    if (colorStr?.startsWith('`') && colorStr?.endsWith('`')) {
      return colorStr.substring(1, colorStr.length - 1);
    }
    return colorStr || '#6086F8';
  };
  
  return (
    <div className={style.flashcardItem} onClick={() => setFlipped(!flipped)}>
      <div className={`${style.flashcardInner} ${flipped ? style.flipped : ''}`}>
        <div className={style.flashcardFront} style={{ background: getColor(flashcard.color) }}>
          <h3>Question</h3>
          <p>{flashcard.title}</p>
          <small>Importance: {flashcard.importance}</small>
          <small>Timestamp: {flashcard.timestamp}</small>
        </div>
        <div className={style.flashcardBack}>
          <h3>Answer</h3>
          <p>{flashcard.content}</p>
        </div>
      </div>
    </div>
  );
};

const NotesPage = () => {
  const params = useParams();

  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const [loading, setLoading] = useState(true);
  const [flashcardsLoading, setFlashcardsLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [notesData, setNotesData] = useState<any>(null);
  const [flashcardsData, setFlashcardsData] = useState<Flashcard[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [folderIdAlert, setFolderIdAlert] = useState("");
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'flashcards'
  const [isYoutubeNote, setIsYoutubeNote] = useState(false);

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
          // Check if it's a YouTube note and set state accordingly
          if (response.data && response.data[0] && response.data[0].type === 'youtube') {
            setIsYoutubeNote(true);
          } else {
            setIsYoutubeNote(false);
            // Set active tab to notes if it's not a YouTube note
            setActiveTab('notes');
          }
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

  const fetchFlashcards = useCallback(
    async (videoUrl: string) => {
      try {
        setFlashcardsLoading(true);
        // Only fetch flashcards if it's a YouTube note
        const response = await apis.GetFlashCards(videoUrl);
        if (response.status === 200) {
          setFlashcardsData(response.data);
        } else {
          dispatch(setAlert({ data: { message: response.message, show: true, type: 'error' } }));
        }
      } catch (error: any) {
        dispatch(setAlert({ data: { message: error.message, show: true, type: 'error' } }));
      } finally {
        setFlashcardsLoading(false);
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
    [apis, dispatch, searchQuery, userId]
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
    [dispatch, AlertShowHandler, router]
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
    [dispatch, router]
  );

  useEffect(() => {
    fetchUserDetails();
    if (params?.id) {
      const noteId = Array.isArray(params.id) ? params.id[0] : params.id;
      setId(noteId);
      setUserId(noteId);
      fetchNotes(noteId);
    } else {
      setLoading(false);
      setFlashcardsLoading(false);
    }
  }, [fetchUserDetails, fetchNotes, params?.id]);

  // Fetch flashcards only if it's a YouTube note
  useEffect(() => {
    if (isYoutubeNote && userId) {
      fetchFlashcards(userId);
    } else {
      setFlashcardsLoading(false);
    }
  }, [isYoutubeNote, userId, fetchFlashcards]);

  return (
    <div className={style.main}>
      <div className={style.mainBg}></div>
      <Header1 />
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
            {/* Always show the Notes tab, but only show Flashcards tab for YouTube notes */}
            <div className={style.mainHolderBodyLeftSection}>
              <p 
                className={activeTab === 'notes' ? style.activeTab : ''}
                onClick={() => setActiveTab('notes')}
                style={{borderBottom: activeTab === 'notes' ? "2px solid black" : "none"}}
              >
                Notes
              </p>
              {isYoutubeNote && (
                <p 
                  className={activeTab === 'flashcards' ? style.activeTab : ''}
                  onClick={() => setActiveTab('flashcards')}
                  style={{borderBottom: activeTab === 'flashcards' ? "2px solid black" : "none"}}
                >
                  Flashcards
                </p>
              )}
            </div>
            <br />

            {activeTab === 'notes' && (
              <div className={style.mainHolderBodyLeftNotes}>
                <div className={style.mainHolderBodyLeftNotesOptions}>
                  <div className={style.mainHolderBodyLeftNotesOptionsItems}>
                    <p>{notesData?.data[0]?.createdAt ? DateCreate(notesData?.data[0]?.createdAt) : ''}</p>
                  </div>
                  <div className={style.mainHolderBodyLeftNotesOptionsItems}>
                    <p><IoShareSocialSharp size={20} color="#6086F8"/></p>
                    <p onClick={() => {AlertShowHandler(true, userId)}}><RiDeleteBin6Line size={20} color="#F47564"/></p>
                  </div>
                </div>
                <div className={style.mainHolderBodyLeftNotesImage}>
                  {notesData?.data[0]?.metaimage ? (
                    <Image 
                      src={notesData?.data[0]?.metaimage || "/images/notesArticlelaceHolder.png"} 
                      alt="image" 
                      fill 
                      style={{objectFit:"cover"}} 
                    />
                  ) : notesData?.data[0]?.type === "youtube" ? (
                    <iframe 
                      style={{width:"100%",height:"450px"}} 
                      src={`https://www.youtube.com/embed/${notesData?.data[0]?.urlCode}`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  ) : ""}
                </div>
                {loading ? (
                  <div style={{position:"relative",width:"100%",display:"flex",gap:"20px"}}>
                    {Array.from({ length: 3 }, (_, index) => <FolderSkeleton key={index} />)}
                  </div>
                ) : (
                  notesData?.data?.map((note: Notes, index: string) => (
                    <NotesItem key={index} loading={false} data={note} deleteNotes={deleteNotes} />
                  ))
                )}
              </div>
            )}

            {/* Only show flashcards tab content if it's a YouTube note and flashcards tab is active */}
            {isYoutubeNote && activeTab === 'flashcards' && (
              <div className={style.flashcardsContainer}>
                {flashcardsLoading ? (
                  <div style={{position:"relative",width:"100%",display:"flex",gap:"20px"}}>
                    {Array.from({ length: 3 }, (_, index) => <FolderSkeleton key={index} />)}
                  </div>
                ) : flashcardsData && flashcardsData.length > 0 ? (
                  <div className={style.flashcardsGrid}>
                    {flashcardsData.map((flashcard) => (
                      <FlashcardItem key={flashcard._id} flashcard={flashcard} />
                    ))}
                  </div>
                ) : (
                  <div className={style.emptyFlashcards}>
                    <p>No flashcards available for this content.</p>
                  </div>
                )}
              </div>
            )}
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