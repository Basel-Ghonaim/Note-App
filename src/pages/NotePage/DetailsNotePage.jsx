import { Star, StarFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../redux/note-slice";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteNotesFromServer,
  readNoteByIdFromServer,
  updateNoteOnServer,
} from "../../Service/notes-service";
import { useEffect } from "react";
let DetailsNotePage = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.notes.singleItem);
  //on refresh fetch note 
  const fetchData = async () => {
    let response = await readNoteByIdFromServer(id);
    if (response) {
      dispatch(notesActions.setSingle(response));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let onClickFavoritesHandle = async () => {
    let updatedItem = { ...item, favorite: !item.favorite };
    let result = await updateNoteOnServer(updatedItem);
    if (result) dispatch(notesActions.favorite(updatedItem));
  };
  let deleteNoteHandle = () => {
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
        let result = await deleteNotesFromServer(item.id);
        if (result) {
          dispatch(notesActions.delete(item.id));
          navigate(-1);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  let editHandle = () => {
    dispatch(notesActions.setItem(id))
    navigate(`/notes/${id}/update`);
  };
  let backHandler = () => {
    navigate(-1);
  };
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-center">
          {item.type}
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.title} </h5>
          <p className="card-text">{item.details}</p>
          <div className="d-flex justify-content-between ">
            <button className="favoritesBtn" onClick={onClickFavoritesHandle}>
              {item.favorite ? (
                <StarFill color="gold" size={30} />
              ) : (
                <Star color="gold" size={30} />
              )}
            </button>
            <div
              className="d-flex gap-2"
              //role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteNoteHandle}
              >
                delete
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={editHandle}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={backHandler}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsNotePage;
