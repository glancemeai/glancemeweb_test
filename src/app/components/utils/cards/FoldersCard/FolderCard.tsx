import React, { useState } from 'react';
import Image from 'next/image'; // Adjust the import if needed
import { BsThreeDotsVertical } from 'react-icons/bs'; // Ensure you have this installed
import style from './Folder.module.css'; // Adjust the import path for the styles
import {FolderSkeleton} from '../../skeleton/skeleton';
import Link from 'next/link';
import Folders from '../../Interfaces/Folders';
import DateCreate from '../../action/date';
import { IoShareSocialSharp } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { setAlert } from '@/app/redux/utils/message';
import { useDispatch } from 'react-redux';
import Apis from '@/app/service/hooks/ApiSlugs';
import DeleteAlert from '../../popups/deleteAlert/deleteAlert';




interface FolderCard {
  data?:Folders;
  loading:boolean;
  AlertShowHandler:Function;
}

const FolderCard = (props: FolderCard) => {
  return (
    props?.loading ? (
      <FolderSkeleton />
    ) : (
      <div className={style.mainFolder}>
        <div className={style.mainFolderImage}>
        <Link href={`/folder/${props?.data?._id}`} passHref ><Image src="/images/folderv2.png" alt="folder" width={200} height={150} style={{ objectFit: 'contain' }} /></Link>
        </div>
        <div className={style.mainFolderDetails}>
          <Link href={`/folder/${props?.data?._id}`} passHref ><p>{props?.data?.name}</p></Link>
          <div className={style.mainFolderDetailsOptions}>
            <p>{DateCreate(props?.data?.createdAt)}</p>
            <div className={style.mainFolderDetailsOptionsShow}><BsThreeDotsVertical size={20} />
            <div className={style.mainNotesItemMenu}>
                    <p onClick={() => {props?.AlertShowHandler(true,props?.data?._id)}}><RiDeleteBin6Line size={20}/> Delete</p>
                </div>
            </div>
          </div>
        </div>
      </div>
     )
  );
};

export default FolderCard;
