import React from 'react';
import Image from 'next/image'; // Adjust the import if needed
import { BsThreeDotsVertical } from 'react-icons/bs'; // Ensure you have this installed
import style from './Notes.module.css'; // Adjust the import path for the styles
import {FolderSkeleton} from '../../skeleton/skeleton';
import Notes from '../../Interfaces/Notes';
import DateCreate from '../../action/date';
import Link from 'next/link';


interface NotesCard {
  data?:Notes;
  loading:boolean;
}

const NotesCard = (props: NotesCard) => {
  return (
    props?.loading ? (
      <FolderSkeleton />
    ) : (
      <div className={style.mainNotes}>
        <div className={style.mainNotesImage}>
          <Link href={`/notes/${props?.data?.urlHash}`} passHref ><Image src={`${props?.data?.image ? props?.data?.image : props?.data?.metaimage ? props?.data?.metaimage : props?.data?.type == "youtube"  ? "/images/notesVideoPlaceHolder.png" : "/images/notesArticlelaceHolder.png"}`} alt={`${props?.data?.type} notes image`} width={200} height={150} style={{ objectFit: 'contain' }} /></Link>
          {props?.data?.type == "youtube" ? (<div className={style.mainNotesImagePlay}> 
          <Image src="/images/playbtn.png" alt="folder" width={30} height={30} style={{ objectFit: 'contain' }} />
          </div>) : ""}
        </div>
        <div className={style.mainNotesDetails}>
        <Link href={`/notes/${props?.data?.urlHash}`} passHref ><p>{props?.data?.title}</p></Link>
          <div className={style.mainNotesDetailsOptions}>
            <p>{`${DateCreate(props?.data?.createdAt)}`}</p>
            <p><BsThreeDotsVertical size={20} /></p>
          </div>
        </div>
      </div>
    )
  );
};

export default NotesCard;
