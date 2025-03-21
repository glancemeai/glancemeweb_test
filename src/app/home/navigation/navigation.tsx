'use client'
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationProps {
  backlink?: string;
  forward?: string;
  onBackClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ backlink, forward, onBackClick }) => {
  const router = useRouter();

  // Handle back button click
  const handleBackClick = (e: React.MouseEvent) => {
    if (onBackClick) {
      e.preventDefault();
      onBackClick();
    } else if (!backlink) {
      e.preventDefault();
      router.back();
    }
    // If backlink is provided and onBackClick is not, use the default link behavior
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
      <Link 
        href={backlink || "#"} 
        passHref
        onClick={handleBackClick}
      >
        <p style={{ color: `${backlink && onBackClick ? "#BBBBBB" : "#161616"}` }}>
          <RiArrowLeftSLine size={25} />
        </p>
      </Link>
      <Link href={`${forward || ""}`} passHref>
        <p style={{ color: `${forward == "" ? "#BBBBBB" : "#161616"}` }}>
          <RiArrowRightSLine size={25} />
        </p>
      </Link>
    </div>
  );
};

export default Navigation;