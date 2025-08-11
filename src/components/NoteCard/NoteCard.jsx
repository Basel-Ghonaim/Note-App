import { ThreeDots } from "react-bootstrap-icons";
import { Star, StarFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { notesActions } from "../../redux/note-slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  deleteNotesFromServer,
  updateNoteOnServer,
} from "../../Service/notes-service";

let NoteCard = ({ note }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let noteFav = { ...note };
  let onClickFavoritesHandle = async () => {
    noteFav.favorite = !noteFav.favorite;
    let result = await updateNoteOnServer(noteFav);
    if (result) {
      dispatch(notesActions.favorite(noteFav));
    }
  };
  let showDetailsHandler = () => {
    dispatch(notesActions.setSingle(note));
    navigate(`/notes/${note.id}/details`);
  };

  let [status, setStatus] = useState(false);
  let toggleAction = () => {
    setStatus((prev) => !prev);
  };

  let deleteHandle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await deleteNotesFromServer(note.id);
        if (result) {
          dispatch(notesActions.delete(note.id));
          setStatus(false);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  let editNoteHandle = () => {
    dispatch(notesActions.setItem(note.id));
    navigate(`/notes/${note.id}/update`);
  };
  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center p-10">
          <h6 className="fw-bold m-0">{note.type}</h6>
          <div className="d-flex gap-2">
            <button className="favoritesBtn" onClick={onClickFavoritesHandle}>
              {noteFav.favorite ? (
                <StarFill color="gold" size={30} />
              ) : (
                <Star color="gold" size={30} />
              )}
            </button>
            <button
              type="button"
              className="favoritesBtn"
              onClick={toggleAction}
            >
              <ThreeDots size={20} color="black" />
            </button>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.details}</p>
          <button
            className="btn btn-primary d-flex"
            onClick={showDetailsHandler}
          >
            Show Notes Details
          </button>
        </div>
        {status && (
          <div
            className="btn-group-vertical"
            role="group"
            aria-label="Vertical button group"
          >
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteHandle}
            >
              delete
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={editNoteHandle}
            >
              edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteCard;
