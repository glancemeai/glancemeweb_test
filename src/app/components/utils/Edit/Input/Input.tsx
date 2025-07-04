import styles from "./Input.module.css"
import { AiOutlineClose } from "react-icons/ai"
import { BsSearch, BsSend, BsEmojiSmile } from "react-icons/bs"
import Image from "next/image"

export function InputTwo(props:any) {
    return (
        <div className={styles.mainInputTwo}>
            <label >{props?.name ?? "About Yourself"}</label>
            <textarea placeholder={props?.placeholder ?? "About Yourself"} />
        </div>
    )
}


export function InputThree(props: any) {

    return (
        <div className={styles.mainInputThree}>
            <label >{props?.placeholder}</label>

            <div className={styles.mainInputThreeData}>
                {props?.data?.map((val: any, index: number) => {
                    return (
                        <p key={index}>{val?.skill} <span><AiOutlineClose /></span></p>
                    )
                })}
            </div>
            <div className={styles.mainInputThreeInput}>
                <input type="text" placeholder={props?.placeholder} value={props?.value} onChange={(e: any) => { props?.onChange ? props?.onChange(e.target.value, props?.id) : "" }} />
                {/* suggetion container */}
                <div className={styles.mainInputThreeInputSuggestion}>
                    <div className={styles.mainInputThreeInputSuggestionClose}></div>
                    <div className={styles.mainInputThreeInputSuggestionHolderHeading}>
                        <h3>suggestions</h3>
                    </div>
                    <div className={styles.mainInputThreeInputSuggestionHolderData}>
                        <p>html</p>
                        <p>css</p>
                        <p>javascript</p>
                        <p>jquery</p>
                        <p>php</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function InputFour() {
    return (
        <div className={styles.mainInputFour}>
            <label >Filter</label>
            <div className={styles.mainInputFourHolder}>
                <div className={styles.mainInputFourItem}>
                    <input type="checkbox" id="job" />
                    <label htmlFor="job">Job Seeker</label>
                </div>
                <div className={styles.mainInputFourItem}>
                    <input type="checkbox" id="Founder" />
                    <label htmlFor="Founder">Founder</label>
                </div>
                <div className={styles.mainInputFourItem}>
                    <input type="checkbox" id="Freelancer" />
                    <label htmlFor="Freelancer">Freelancer</label>
                </div>
                <div className={styles.mainInputFourItem}>
                    <input type="checkbox" id="Mentor" />
                    <label htmlFor="Mentor">Mentor</label>
                </div>
            </div>
        </div>
    )
}


export function InputFive(props: any) {
    return (
        <div className={styles.mainInputFour}>
            <label >{props?.name ?? ""}</label>
            <div className={styles.mainInputFourHolder}>
                {props?.option ? props?.option?.map((val: any, index: number) => {
                    return (
                        <div className={styles.mainInputFourItem} key={index}>
                            <input type="radio" defaultChecked={ props?.selected == val.id ? true : false } name={props?.name} id={val.id} value={val.id} onClick={() => {props?.onClick ? props?.onClick(val.id) : ""}}/>
                            <label htmlFor={val.id}>{val.name}</label>
                        </div>)
                }) : ""} 
            </div>
        </div>
    )
}


export function InputSix() {
    return (
        <div className={styles.mainInputSix}>
            <label >Date Of Birth</label>
            <input type="date" placeholder="Date of Birth" />
        </div>
    )
}


export function InputSeven(props: any) {
    return (
        <div className={styles.mainInputSeven}>
            <label >City</label>
            <div className={styles.mainInputSevenInput}>
                <input type="text" placeholder="City" />
                {/* suggetion container */}
                <div className={styles.mainInputSevenInputSuggestion}>
                    <div className={styles.mainInputSevenInputSuggestionClose}></div>
                    <div className={styles.mainInputSevenInputSuggestionHolderHeading}>
                        <h3>suggestions</h3>
                    </div>
                    <div className={styles.mainInputSevenInputSuggestionHolderData}>
                        <p>Gwalior</p>
                        <p>Delhi</p>
                        <p>indor</p>
                        <p>mumbai</p>
                        <p>dabra</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput(props: SearchInputProps) {
  return (
    <div className={styles.mainSearchInput}>
      <label htmlFor="search">
        <BsSearch />
      </label>
      <input
        id="search"
        autoComplete="off"
        {...props} 
      />
    </div>
  );
}
// export function SearchInput(props: any) {
//     return (
//         <div className={styles.mainSearchInput}>
//             <label htmlFor="search" ><BsSearch /></label>

//             {props?.onChange ?

//                 <input id="search" autoComplete="off" type={props?.type ? props?.type : "text"} value={props?.value ? props?.value : ""} onChange={(e: any) => { props?.onChange ? props?.onChange(e.target.value, props?.id) : "" }} placeholder={props?.placeholder} />
//                 // <input type={props?.type ? props?.type : "text"} value={props?.value ? props?.value : ""} onChange={(e:any) => {props?.onChange ? props?.onChange(e.target.value,props?.id) : nofunction()}} placeholder={props?.placeholder} />
//                 :
//                 <input id="search" autoComplete="off" type="text" placeholder={props?.placeholder} />
//             }
//         </div>
//     )
// }


export function InputEight() {
    return (
        <div className={styles.mainEightInput}>
            <Image src={"/images/userbg.png"} alt="user" width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <div className={styles.mainEightInputField}>
                <p><BsEmojiSmile size={20} /></p>
                <input type="text" placeholder="write your comment..." />
                <p><BsSend size={20} /></p>
            </div>
        </div>
    )
}

export function InputNine(props: any) {
    return (
        <div className={styles.mainInputNine}>
            <label >{props?.name}</label>
            <input type="text" placeholder={props?.placeholder} />
        </div>
    )
}




export function InputTen(props: any) {
    
    const nofunction = () => {

    }
    return (
        <div className={styles.mainInputTen}>
            {props?.name ? <label >{props?.name}</label> : ""}
            {props?.onChange ?

                <input type={props?.type ? props?.type : "text"} disabled={props?.disable ?? false} value={props?.value ? props?.value : ""} onChange={(e: any) => { props?.onChange ? props?.onChange(e.target.value, props?.id) : nofunction() }} placeholder={props?.placeholder} />
                :
                <input type={props?.type ? props?.type : "text"} disabled={props?.disable ?? false} placeholder={props?.placeholder} value={props?.value ? props?.value : ""}/>
            }
        </div>
    )
}

export default function InputOne(props: any) {
    
    const nofunction = () => {

    }
    return (
        <div className={styles.mainInputOne}>
            <label >{props?.name}</label>
            {props?.onChange ?

                <input type={props?.type ? props?.type : "text"} disabled={props?.disable ?? false} value={props?.value ? props?.value : ""} onChange={(e: any) => { props?.onChange ? props?.onChange(e.target.value, props?.id) : nofunction() }} placeholder={props?.placeholder} />
                :
                <input type={props?.type ? props?.type : "text"} disabled={props?.disable ?? false} placeholder={props?.placeholder} />
            }
        </div>
    )
}
