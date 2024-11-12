import React from "react";
import style from "./HomeThree.module.css";
import Image from "next/image";
import Link from "next/link";
export default function HomeThree() {
  return (
    <div className={style.main}>
      <div className={style.mainHeading}>
        <h2>Glanceme.Ai Pricing</h2>
      </div>
      <div className={style.mainHolder}>

        <div className={style.mainHolderItem}>
          <div className={style.mainHolderItemBg}>
            <div className={style.mainHolderItemBgOne}></div>
            <div className={style.mainHolderItemBgTwo}>
              <Image src={"/images/design.png"} alt="desing" width={150} height={150} style={{ objectFit: "contain" }} />
            </div>
          </div>
          <div className={style.mainHolderItemContainer}>
            <div className={style.mainHolderItemContainerHeading}>
              <h2>Free Tier</h2>
            </div>
            <div className={style.mainHolderItemContainerFeature}>
              <li>Save Notes.</li>
              <li>30 Video Credits</li>
              <li>150 Q&A Credits.</li>
              <li>Save Video Screenshots</li>
              <li>YouTube Video Summaries</li>
            </div>
            <div className={style.mainHolderItemContainerButton}>
              <Link href={"/login"} passHref><button>Try Now</button></Link>
              <div className={style.mainHolderItemContainerInfo}>
                <p>Terms & condition apply</p>
              </div>
            </div>

          </div>
        </div>

        <div className={style.mainHolderItem}>
          <div className={style.mainHolderItemBg}>
            <div className={style.mainHolderItemBgOne}></div>
            <div className={style.mainHolderItemBgTwo}>
              <Image src={"/images/design.png"} alt="desing" width={150} height={150} style={{ objectFit: "contain" }} />
            </div>
          </div>
          <div className={style.mainHolderItemContainer}>
            <div className={style.mainHolderItemContainerHeading}>
              <h2>Student Tier</h2>
            </div>
            <div className={style.mainHolderItemContainerFeature}>
              <li>Save Notes.</li>
              <li>100+ Video Credits</li>
              <li>750+ Q&A Credits.</li>
              <li>Save Video Screenshots</li>
              <li>YouTube Video Summaries</li>
              <li>Chat With PDF</li>
            </div>
            <div className={style.mainHolderItemContainerButton}>
              <button disabled>Try Now</button>
              <div className={style.mainHolderItemContainerInfo}>
                <p>Currently Not available</p>
              </div>
            </div>
          </div>
        </div>

        <div className={style.mainHolderItem}>
          <div className={style.mainHolderItemBg}>
            <div className={style.mainHolderItemBgOne}></div>
            <div className={style.mainHolderItemBgTwo}>
              <Image src={"/images/design.png"} alt="desing" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
          <div className={style.mainHolderItemContainer}>
            <div className={style.mainHolderItemContainerHeading}>
              <h2>Business Tier</h2>
            </div>
            <div className={style.mainHolderItemContainerFeature}>
              <li>Save Notes.</li>
              <li>500+ Video Credits</li>
              <li>2550+ Q&A Credits.</li>
              <li>Save Video Screenshots</li>
              <li>YouTube Video Summaries</li>
              <li>Chat With PDF</li>
              <li>Multiple Language support</li>
            </div>
            <div className={style.mainHolderItemContainerButton}>
              <button disabled>Try Now</button>
              <div className={style.mainHolderItemContainerInfo}>
                <p>Currently Not available</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
