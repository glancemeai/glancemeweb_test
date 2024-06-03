import React from "react";
import style from "./HomeTwo.module.css";

export default function HomeTwo() {
  return (
    <div className={style.main}>
      <div className={style.mainHolder}>
        <div className={style.mainHolderItem}>
          <div className={style.mainHolderItemContainer} style={{background:"#b8b1ff"}}>
            <div className={style.mainHolderItemContainerHeading}>
              <h3>Make Your Notes Online</h3>
            </div>
            <div className={style.mainHolderItemContainerPara}>
              <p>Transform your note-taking experience with Roten.x DevTool: Craft online notes, highlight crucial points, and add key insights effortlessly, ensuring you never lose context. With DevTool, your important blogs are easily accessible, keeping all your notes conveniently organized in one place.
              </p>
            </div>
          </div>
        </div>
        <div className={style.mainHolderItem}>
        <div className={style.mainHolderItemContainer} style={{background:"#aae2cb"}}>
            <div className={style.mainHolderItemContainerHeading}>
              <h3>Generate Summaries for YouTube Videos</h3>
            </div>
            <div className={style.mainHolderItemContainerPara}>
              <p>
              Discover a new dimension of understanding with Roten.x DevTool: Generate concise summaries of YouTube videos, providing enhanced context to deepen your comprehension and enrich your viewing experience.
              </p>
            </div>
          </div>
        </div>
        <div className={style.mainHolderItem}>
        <div className={style.mainHolderItemContainer} style={{background:"#f7cedc"}}>
            <div className={style.mainHolderItemContainerHeading}>
              <h3>Ask Questions Directly to YouTube Videos</h3>
            </div>
            <div className={style.mainHolderItemContainerPara}>
              <p>
              Unlock clarity and deepen comprehension: Roten.x DevTool enables you to pose targeted questions about YouTube videos, enhancing your understanding and tackling even the most complex content with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
