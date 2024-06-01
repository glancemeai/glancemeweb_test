import style from "./skeleton.module.css"
const SkeletonNotes = () => {
    return (
        <div className={style.main}>
            <div className={style.mainCard}>
                <div className={style.card}>
                    <div className={`${style.card__image} ${style.loading}`}></div>
                </div>
            </div>
            <div className={style.mainTitles}>
            <div className={`${style.card__title} ${style.loading}`}></div>
            <div className={`${style.card__title} ${style.loading}`}></div>
            <div className={`${style.card__title} ${style.loading}`}></div>
            <div className={`${style.card__description} ${style.loading}`}></div>
            <div className={`${style.card__description} ${style.loading}`}></div>

            </div>
        </div>
    )
}

export default SkeletonNotes