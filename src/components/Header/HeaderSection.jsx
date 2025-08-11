import { useDispatch, useSelector } from "react-redux";
import style from "./HeaderSection.module.css";
import { notesActions } from "../../redux/note-slice";

let Header = () => {
  let data = useSelector((state) => state.notes.filteredData);

  let dispatch = useDispatch();
  let filterBySearchHandle = (event) => {
    dispatch(notesActions.filterBySearch(event.target.value));
  };

  return (
    <header className={style.header}>
      <div className={style.searchContainer}>
        <input
          className={style.searchInput}
          type="search"
          placeholder="Search..."
          onChange={filterBySearchHandle}
        />
      </div>
    </header>
  );
};

export default Header;
