import { useDispatch, useSelector } from "react-redux";
import TitlePage from "../../components/TitlePage/TitlePage";
import NoteCard from "../../components/NoteCard/NoteCard";
import { notesActions } from "../../redux/note-slice";

let NotesPage = () => {
  let dispatch = useDispatch();
  let notes = useSelector((state) => state.notes.filteredData);
  let changeFilterByTypeHandle = (event) => {
    console.log(event.target.value);
    dispatch(notesActions.filterByType(event.target.value));
  };
  return (
    <>
      <div className="header-page-container">
        <TitlePage title="Notes" />
        <div className="select-container">
          <select
            className="filter-type"
            name=""
            id=""
            defaultValue="All"
            onChange={changeFilterByTypeHandle}
          >
            <option value="All">Filter By Type</option>
            <option value="Task">Tasks</option>
            <option value="Note">Notes</option>
          </select>
        </div>
      </div>
      <div className="cards">
        {notes.map((element) => (
          <NoteCard note={element} key={element.id} />
        ))}
      </div>
    </>
  );
};

export default NotesPage;
