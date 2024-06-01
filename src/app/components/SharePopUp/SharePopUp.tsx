"use client"
import { AiOutlineClose } from "react-icons/ai"
import style from "./SharePopUp.module.css"
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs"
import { MdContentCopy } from "react-icons/md"

export default function SharePopUp() {
    function unsecuredCopyToClipboard(text: string) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
    }

    const copyToClipboard = (content: string) => {
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(content);
        } else {
            unsecuredCopyToClipboard(content);
        }
    };
    return (
        <div className={style.main} >
            <div className={style.mainCloser} ></div>
            <div className={style.mainHolder}>
                <div className={style.mainHolderHeading}>
                    <h1>Share</h1>
                    <div className={style.mainHolderClose} >
                        <p ><AiOutlineClose size={20} /></p>
                    </div>
                </div>
                <div className={style.mainHolderSocial}>
                    <div className={style.mainHolderSocialItem}>
                        <p><BsFacebook size={25} /></p>
                    </div>
                    <div className={style.mainHolderSocialItem}>
                        <p><BsWhatsapp size={25} /></p>
                    </div>
                    <div className={style.mainHolderSocialItem}>
                        <p><BsInstagram size={25} /></p>
                    </div>
                    <div className={style.mainHolderSocialItem}>
                        <p><BsLinkedin size={25} /></p>
                    </div>
                    <div className={style.mainHolderSocialItem}>
                        <p><BsTwitter size={25} /></p>
                    </div>
                </div>
                <div className={style.mainHolderHeading}>
                    <h2>Copy Link</h2>
                </div>
                <div className={style.mainHolderInput}>
                    <input type="text"  placeholder="copy link" disabled />
                    <button title="copy"><MdContentCopy size={20} /></button>
                </div>
            </div>
        </div>
    )
}
