import InputOne, { InputTwo } from "@/app/components/utils/Edit/Input/Input"
import style from "./support.module.css"
import ButtonOne, { ButtonFour, ButtonThree } from "@/app/components/utils/Edit/buttons/Buttons"

const SupportPage = () => {
    return (
        <div className={style.main}>
            <div className={style.mainHolder}>
                <div className={style.mainHolderHeading}>
                    <h1>Support Page</h1>
                </div>
                <div className={style.mainHolderContainer}>
                    <InputOne name={"Enter Your Name"} placeholder={"Enter Your Name"}/>
                    <InputOne name={"Enter Your Email"} placeholder={"Enter Your Email"}/>
                    <InputTwo name={"Enter Your Query"} placeholder={"Write Your Query We will get back to you soon..."}/>
                    <ButtonThree name={"Send Query"}/>
                </div>
            </div>
        </div>
    )
}

export default SupportPage