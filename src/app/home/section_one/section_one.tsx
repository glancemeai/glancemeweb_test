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
          <h2>Every Glance is a Leap</h2>
          <h3>
            <BsStars size={40} color="#223FDA" />Towards Mastery 
          </h3>
        </div>
        <div className={style.mainHolderSubHeading}>
          <p>
          From information overload to focused learning grasp key concepts faster with instant summaries and intuitive topic search. With GlanceMe AI, ask questions interactively and build your personalized knowledge archive.
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
          <Link href={"https://chromewebstore.google.com/detail/glancemeai/pgjkednjpnkamnajfabgfigcldpgpokp"} passHref target="_blank"><button>
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