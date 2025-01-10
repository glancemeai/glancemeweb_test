'use client'
import Image from "next/image";
import style from "./section_one.module.css";
import { BsStars } from "react-icons/bs";
import { FaChrome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
const Section_one = () => {
  return (
    <div className={style.main}>
      <div className={style.mainBg}></div>
      <div className={style.mainHolder}>
        <div className={style.mainHolderHeading}>
          <h2>Glance your hourly content</h2>
          <h3>
            <BsStars size={40} color="#223FDA" /> in a minute !
          </h3>
        </div>
        <div className={style.mainHolderSubHeading}>
          <p>
            Quickly glance the meetings, lectures, podcasts, depositions and
            more. Glanceme gives you superhuman recall and review using AI.
          </p>
        </div>
        <div className={style.mainHolderButton}>
          <Image
            src={"/images/home/magic.png"}
            alt="magic"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <Link href={"#"} passHref target="_blank"><button>
            <FaChrome size={25} color="white" /> Add to Chrome for Free
          </button></Link>
        </div>
      </div>

      <div className={style.mainBanner}>
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glarePosition="all"
          glareBorderRadius="20px"
        >
          <div className={style.mainBannerImage}>
            <Image
              src={"/images/home/banner.png"}
              alt="magic"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default Section_one;
