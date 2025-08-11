import { Outlet } from "react-router-dom";
import Header from "../components/Header/HeaderSection";
import SideBar from "../components/SideBar/SideBarSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../redux/note-slice";
import { readNotesFromServer } from "../Service/notes-service";

let Note = () => {
  let notes = useSelector((state) => state.notes.filteredData);
  let dispatch = useDispatch();
  let fetchNotes = async () => {
    if (notes.length === 0) {
      let data = await readNotesFromServer();
      dispatch(notesActions.read(data));
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <Header />
      <SideBar />
      <main className="main-page">
        <Outlet />
      </main>
    </>
  );
};

export default Note;
