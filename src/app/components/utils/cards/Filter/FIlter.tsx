import { useState } from "react";
import style from "./filter.module.css";
import { ButtonThree } from "../../Edit/buttons/Buttons";
import { IoMdClose } from "react-icons/io";
type FilterColorItemProps = {
  color: string;
  isActive: boolean;
  onClick: () => void;
};

type FiltersProps = {
  onFilterApply: (filterData: {
    colors?: string[];
    type: string;
    reminder: boolean;
  }) => void;
  filterShowHandler:Function;
  show:boolean;
};

const FilterColorItem: React.FC<FilterColorItemProps> = ({ color, isActive, onClick }) => {
  return (
    <div
      className={style.mainColorItem}
      onClick={onClick}
      style={{ background: `${isActive ? color + "59" : ""}` }}
    >
      <div
        className={style.mainColorItemCircle}
        style={{ background: `${color}` }}
      ></div>
      <div className={style.mainColorItemName}>
        <p>{color}</p>
      </div>
    </div>
  );
};

const Filters: React.FC<FiltersProps> = ({ onFilterApply,filterShowHandler,show }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("none");
  const [reminder, setReminder] = useState<boolean>(false);

  const toggleColor = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleFilterClick = () => {
    const filterData: { colors?: string[]; type: string; reminder: boolean } = {
      type: selectedType,
      reminder,
    };
  
    // Add colors only if the array is not empty
    if (selectedColors.length > 0) {
      filterData.colors = selectedColors;
    }
  
    filterShowHandler(false);
    onFilterApply(filterData);
  };
  
  return (
    <div className={style.mainSideFilter} style={{display:`${show ? "block" : "none"}`}}>
      <div className={style.mainSideFilterHolder}>
        <div className={style.mainSideFilterHolderHeader}>
          <h3>Filters</h3>
          <p onClick={() => {filterShowHandler(false);}}><IoMdClose size={20} color="#222"/></p>
        </div>

        <div className={style.mainSideFilterHolderBody}>
          <div className={style.mainSideFilterHolderBodyItemTitle}>
            <p>Colors</p>
          </div>
          <div className={style.mainSideFilterHolderBodyItem}>
            {["#f4d292", "#add9e6", "#b19bd8", "#90ee90", "#fecccb"].map(
              (color) => (
                <FilterColorItem
                  key={color}
                  color={color}
                  isActive={selectedColors.includes(color)}
                  onClick={() => toggleColor(color)}
                />
              )
            )}
          </div>

          <div className={style.mainSideFilterHolderBodyItemTitle}>
            <p>Type</p>
          </div>
          <div className={style.mainSideFilterHolderBodyItem}>
            <select
              className={style.mainTypeItem}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="none">All</option>
              <option value="youtube">Youtube</option>
              <option value="article">Article</option>
            </select>
          </div>

          <div className={style.mainSideFilterHolderBodyItemTitle}>
            <p>Reminder</p>
          </div>
          <div className={style.mainSideFilterHolderBodyItemReminder}>
            <input
              type="checkbox"
              id="reminder"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
            <label htmlFor="reminder">Select all reminder Notes.</label>
          </div>
        </div>

        <div className={style.mainSideFilterHolderFooter}>
          <ButtonThree name={"Filter Search"} onClick={handleFilterClick} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
