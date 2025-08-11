import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notesActions } from "../../redux/note-slice";
import { Star, StarFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { updateNoteOnServer } from "../../Service/notes-service";

let FavoriteCard = ({ note }) => {

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let showDetailsHandle = () => {
    dispatch(notesActions.setItem(note.id));
    navigate(`/notes/${note.id}/details`);
  };
  let favoriteHandle = () => {
    let updatedItem = { ...note, favorite: !note.favorite };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await updateNoteOnServer(updatedItem);
        if (result) dispatch(notesActions.favorite(updatedItem));
        Swal.fire({
          title: "Removed!",
          text: "Your Note has been Removed.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center p-10">
        <h6 className="fw-bold m-0">{note.type}</h6>
        <div>
          <button
            type="button"
            className="favoritesBtn"
            onClick={favoriteHandle}
          >
            {note.favorite ? (
              <StarFill color="gold" size={30} />
            ) : (
              <Star color="gold" size={30} />
            )}
          </button>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.details}</p>
        <button className="btn btn-primary d-flex" onClick={showDetailsHandle}>
          Show Notes Details
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
