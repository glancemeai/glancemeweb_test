import { PlansFeatures } from "@/app/(portal)/price/page";
import style from "./price.module.css"
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";

interface PriceCard {
    videoLimit:Number,
    name:string
    price: number,
    features:PlansFeatures[],
    id:string
    handlePayment?:Function
    link?:string
}


const PriceCard = (props:PriceCard) => {
    return (
        <>
        <div className={style.mainCard}>
            <div className={style.mainCardHeader}>
                    <h3>{props?.name} {"("}{`${props?.videoLimit}`} hour per video limit{")"}</h3>
                    <h4>${`${props?.price}`}/month</h4>
            </div>
            <div className={style.mainCardDetails}>
                {props?.features?.map((value:PlansFeatures,index:number) => {
                    return (
                        <div key={index} className={style.mainCardDetailsItem}>
                            <div className={style.mainCardDetailsItemName}>
                                <p><BsCheckCircleFill size={20} color="#365375"/></p>
                                <p>{value?.name}</p>
                            </div>
                            <div className={style.mainCardDetailsItemNumber}>
                                <p>{`${value?.credits == 1000000 ? "unlimited" : value?.credits}`}</p>
                            </div>
                        </div>
                    )
                })}

                <div className={style.mainCardButtons}>
                    {props?.handlePayment ?  props?.price > 0 ? <button onClick={() => { props?.handlePayment ? props?.handlePayment(props?.id) : ""}} data-id={props?.id}>Order Now</button> : <button onClick={() => { alert("Why settle for the free plan when you can level up? 🚀 Go for the paid plan and unlock all the awesome features waiting for you! 🎉")}} data-id={props?.id}>Order Now</button> : (props?.price > 0 ? <Link href={"/price"} passHref><button onClick={() => { props?.handlePayment ? props?.handlePayment(props?.id) : ""}} data-id={props?.id}>Order Now</button></Link> : <Link href={"/price"} passHref><button onClick={() => { alert("Why settle for the free plan when you can level up? 🚀 Go for the paid plan and unlock all the awesome features waiting for you! 🎉")}} data-id={props?.id}>Order Now</button></Link>)}
                </div>
            </div>
            
        </div>
        </>
    )
}

export default PriceCard;