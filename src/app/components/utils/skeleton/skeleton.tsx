import style from "./skeleton.module.css"

const Skeleton = () => {
    return (

        <div className={style.card}>
            <div className={`${style.card__image} ${style.loading}`}></div>
            <div className={`${style.card__title} ${style.loading}`}></div>
            <div className={`${style.card__description} ${style.loading}`}></div>
        </div>

    )
}

export default Skeleton