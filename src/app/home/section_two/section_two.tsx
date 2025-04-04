import Image from "next/image"
import style from "./section_two.module.css"

const Section_two = () => {
    return (
        <div className={style.main}>
        <div className={style.mainBg}></div>
        <div className={style.mainHolder}>
            <div className={style.mainHeading}>
                <p>Revolutionize Learning with AI driven Platform</p>
                <h3>See What Glanceme.Ai Can Do</h3>
            </div>
            <div className={style.mainBanner}>
                <Image src={"/images/FeaturesBanner.png"} alt="banner2" fill style={{objectFit:"contain"}}/>
            </div>
        </div>
        </div>
    )
}

export default Section_two