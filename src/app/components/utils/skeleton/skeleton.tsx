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

export const FolderSkeleton = () => {
    return (

        <div className={style.Foldercard}>
            <div className={`${style.Foldercard__image} ${style.loading}`}></div>
            <div className={`${style.Foldercard__title} ${style.loading}`}></div>
            <div className={`${style.Foldercard__description} ${style.loading}`}></div>
        </div>

    )
}

export const PriceCardSkeleton = () => {
    return (

        <div className={style.Pricecard__Skeleton}>
           <div className={`${style.Pricecard_header__Skeleton}  ${style.loading}`}></div>
           <div className={`${style.Pricecard_Body__Skeleton} `}>
                <div className={`${style.Pricecard_Body_item__Skeleton}  ${style.loading}`}></div>
                <div className={`${style.Pricecard_Body_item_two__Skeleton}  ${style.loading}`}></div>
                <div className={`${style.Pricecard_Body_item_two__Skeleton}  ${style.loading}`}></div>
                <div className={`${style.Pricecard_Body_item_two__Skeleton}  ${style.loading}`}></div>
           </div>
           <div className={`${style.Pricecard_button__Skeleton} ${style.loading}`}>
           </div>
        </div>

    )
}

export default Skeleton