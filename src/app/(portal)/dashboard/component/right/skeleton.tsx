import React from 'react'
import style from "./skeleton.module.css"
export default function SkeletonDashboardRight() {

    return (
        <div className={style.mainHolder}>
            <div className={`${style.searchbar} ${style.loading}`}></div>
            <div className={style.mainContentHeading}>
                <h2>All Notes</h2>
            </div>
            <div className={style.mainContentHolder}>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                    <div className={`${style.card__title} ${style.loading}`}></div>
                    <div className={`${style.card__description} ${style.loading}`}></div>
                </div>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                    <div className={`${style.card__title} ${style.loading}`}></div>
                    <div className={`${style.card__description} ${style.loading}`}></div>
                </div>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                    <div className={`${style.card__title} ${style.loading}`}></div>
                    <div className={`${style.card__description} ${style.loading}`}></div>
                </div>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                    <div className={`${style.card__title} ${style.loading}`}></div>
                    <div className={`${style.card__description} ${style.loading}`}></div>
                </div>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                    <div className={`${style.card__title} ${style.loading}`}></div>
                    <div className={`${style.card__description} ${style.loading}`}></div>
                </div>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                    <div className={`${style.card__title} ${style.loading}`}></div>
                    <div className={`${style.card__description} ${style.loading}`}></div>
                </div>
            </div>
        </div>
    )
}
