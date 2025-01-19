'use client'
import styles from "./Buttons.module.css"
import {BsArrowRight, BsSave} from "react-icons/bs"
import { FiLoader } from "react-icons/fi";
export default function ButtonOne(props:any) {
  return (
    <div className={styles.main}>
      <button title={props?.name}><span><BsSave/></span> {props?.name}</button>
    </div>
  )
}

export function ButtonFour(props:any) {
  return (
    <div className={styles.mainFour}>
      <button title={props?.name} onClick={() => {props?.onClick ? props?.onClick() : "" }}>{props?.icon ?? ""} {props?.name}</button>
    </div>
  )
}

export function ButtonFive(props:any) {
  return (
    <div className={styles.mainFive}>
      <button title={props?.name} onClick={() => {props?.onClick ? props?.onClick() : "" }}>{props?.icon ?? ""} {props?.name}</button>
    </div>
  )
}

export function ButtonThree(props:any) {
  return (
    <div className={styles.mainThree} >
      <button title={props?.name} onClick={() => {props?.onClick ? props?.onClick() : "" }}>{props?.name}  {props?.load ? <span><FiLoader/></span> : <span>{props?.icon ? props?.icon : <BsArrowRight/>}</span>} </button>
    </div>
  )
}


export function ButtonTwo(props:any) {
  return (
    <div className={styles.mainTwo} >
      <button title={props?.name} type="button" onClick={() => {props?.onClick ? props?.onClick() : "" }}>{props?.icons ? (<span>{props?.icons}</span>) : ""}{props?.name}</button>
    </div>
  )
}

export function ButtonSix(props:any) {
  return (
    <div className={styles.mainSix} >
      <button title={props?.name} disabled={props?.loading ? true : false} type="button" onClick={() => {props?.onClick ? props?.onClick() : "" }} >{props?.laoding ? props?.loadingText : props?.name}</button>
    </div>
  )
}


