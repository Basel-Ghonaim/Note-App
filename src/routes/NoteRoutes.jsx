import { Route, Routes } from "react-router-dom";
import Note from "../pages/Note";
import FavoritesPage from "../pages/NotePage/FavoritesPage";
import NotesPage from "../pages/NotePage/NotesPage";
import NewNotePage from "../pages/NotePage/NewNotePage";
import SettingsPage from "../pages/NotePage/SettingsPage";
import DetailsNotePage from "../pages/NotePage/DetailsNotePage";
import UpdateNotePage from "../pages/NotePage/UpdateNotePage";

let NoteRoutes = () => {
  return (
    <Routes>
      <Route path="/notes" element={<Note />}>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/favorites" element={<FavoritesPage />} />
        <Route path="/notes/new" element={<NewNotePage />} />
        <Route path="/notes/settings" element={<SettingsPage />} />
        <Route path="/notes/:id/details" element={<DetailsNotePage />} />
        <Route path="/notes/:id/update" element={<UpdateNotePage />} />
      </Route>
    </Routes>
  );
}

export default NoteRoutes;