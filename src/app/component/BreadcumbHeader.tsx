"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "./breadcumb.module.css";

// Define interfaces for our data
interface BreadcrumbItem {
  id: string;
  name: string;
  path: string;
}

interface BreadcrumbHeaderProps {
  image?: string;
  title: string;
  backlink?: string; // Make backlink optional
  forward?: string;
  currentFolderId?: string;
  folderInfo?: any;
}

const BreadcrumbHeader = ({
  image,
  title,
  backlink,
  forward,
  currentFolderId,
  folderInfo
}: BreadcrumbHeaderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const router = useRouter();

  const buildBreadcrumbs = useCallback(() => {
    // Always start with Dashboard
    const trail: BreadcrumbItem[] = [
      {
        id: "dashboard",
        name: "Dashboard",
        path: "/dashboard"
      }
    ];

    if (folderInfo) {
      if (folderInfo.parentFolders && folderInfo.parentFolders.length > 0) {
        
        const sortedParents = [...folderInfo.parentFolders].sort(
          (a, b) => (a.depth || 0) - (b.depth || 0)
        );
        
        sortedParents.forEach(parent => {
          trail.push({
            id: parent.folder_token || parent._id,
            name: parent.name,
            path: `/folder/${parent.folder_token || parent._id}`
          });
        });
      }
      
      if (currentFolderId && folderInfo.name) {
        trail.push({
          id: currentFolderId,
          name: folderInfo.name,
          path: `/folder/${currentFolderId}`
        });
      }
    }

    setBreadcrumbs(trail);
    return trail; // Return the trail for immediate use
  }, [currentFolderId, folderInfo]);

  useEffect(() => {
    buildBreadcrumbs();
  }, [buildBreadcrumbs]);

  // Handle back button click
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Build breadcrumbs immediately to ensure we have the latest data
    const currentBreadcrumbs = buildBreadcrumbs();
    
    // If breadcrumbs exist and we're in a subfolder (more than just Dashboard)
    if (currentBreadcrumbs.length > 1) {
      // Navigate to parent folder (second-to-last item in breadcrumbs)
      const parentIndex = currentBreadcrumbs.length - 2;
      const parentPath = currentBreadcrumbs[parentIndex].path;
      console.log('Navigating to parent:', parentPath);
      router.push(parentPath);
    } else {
      // Fallback to browser history or provided backlink
      if (backlink) {
        router.push(backlink);
      } else if (typeof window !== 'undefined' && window.history.length > 1) {
        window.history.back();
      } else {
        router.push('/dashboard');
      }
    }
  };

  // Handle forward button click
  const handleForwardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (forward) {
      router.push(forward);
    } else {
      router.forward();
    }
  };

  return (
    <div className={style.header}>
      <div className={style.headerParts}>
        <div className={style.headerPartsOptions}>
          <a href="#" onClick={handleBackClick} className={style.headerPartsOptionsBack}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.71 15.88L10.83 12L14.71 8.12C15.1 7.73 15.1 7.1 14.71 6.71C14.32 6.32 13.69 6.32 13.3 6.71L8.71 11.3C8.32 11.69 8.32 12.32 8.71 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.09 16.91 15.1 16.27 14.71 15.88Z"
                fill="#323232"
              />
            </svg>
          </a>
          <a href="#" onClick={handleForwardClick} className={style.headerPartsOptionsForward}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.29 15.88L13.17 12L9.29 8.12C8.9 7.73 8.9 7.1 9.29 6.71C9.68 6.32 10.31 6.32 10.7 6.71L15.29 11.3C15.68 11.69 15.68 12.32 15.29 12.71L10.7 17.3C10.31 17.69 9.68 17.69 9.29 17.3C8.91 16.91 8.9 16.27 9.29 15.88Z"
                fill="#323232"
              />
            </svg>
          </a>
        </div>
        <div className={style.headerPartsBreadcrumb}>
          {breadcrumbs.map((item, index) => (
            <div key={item.id} className={style.breadcrumbItem}>
              <Link 
                href={item.path}
                className={index === breadcrumbs.length - 1 ? style.activeBreadcrumb : ''}
              >
                {item.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className={style.separator}>&gt;</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={style.headerProfile}>
        <Link href="/profile">
          <div className={style.headerProfileImage}>
            <Image
              src={image ? `/images/${image}.png` : "/images/1.png"}
              alt="Profile"
              width={50}
              height={50}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BreadcrumbHeader;