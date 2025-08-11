import { useEffect, useState } from "react";
import TitlePage from "../../components/TitlePage/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import createNote from "../../models/note";
import { useNavigate } from "react-router-dom";
import { notesActions } from "../../redux/note-slice";
import Swal from "sweetalert2";
import { updateNoteOnServer } from "../../Service/notes-service";
let UpdateNotePage = () => {
  let item = useSelector((state) => state.notes.item);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [note, setNote] = useState({
    title: "",
    details: "",
    type: "",
  });
  let [errors, setErrors] = useState({});
  useEffect(function () {
    setNote({
      title: item.title,
      details: item.details,
      type: item.type,
    });
  }, []);

  let submitHandle = (event) => {
    event.preventDefault();
    let validateError = validation(note);
    if (Object.keys(validateError).length > 0) {
      return;
    }
    save();
  };
  let onChangeHandle = (event) => {
    let { value, name } = event.target;
    setNote((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  let validation = (note) => {
    let error = {};
    Object.keys(note).map((key) => {
      note[key].trim() === "" && (error[key] = `Feild ${key} is required`);
    });
    setErrors(error);
    return error;
  };
  let save = () => {
    let updatedNote = createNote(
      note.title,
      note.details,
      note.type,
      item.favorite
    );
    updatedNote.id = item.id;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await updateNoteOnServer(updatedNote);

        if (result) {
          dispatch(notesActions.update(updatedNote));
        }
        Swal.fire("Updated!", "", "success");
        navigate(-1);
      }
    });
  };

  let backHandle = () => {
    navigate(-1);
  };
  return (
    <>
      <TitlePage title="Update Notes" />
      <form onSubmit={submitHandle}>
        <div className={`mb-3 ${errors.title && "inValidInput"}`}>
          <label htmlFor="title" className="form-label">
            Title Note
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            onChange={onChangeHandle}
            name="title"
            value={note.title}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div className={`mb-3 ${errors.details && "inValidInput"}`}>
          <label htmlFor="details" className="form-label">
            Details Note
          </label>
          <textarea
            id="details"
            className="form-control"
            rows="3"
            onChange={onChangeHandle}
            name="details"
            value={note.details}
          ></textarea>
          {errors.details && <p>{errors.details}</p>}
        </div>
        <div className={`mb-3 ${errors.type && "inValidInput"}`}>
          <select
            onChange={onChangeHandle}
            className="form-select"
            aria-label="Default select example"
            name="type"
            value={note.type}
          >
            <option value="">Select type</option>
            <option value="Note">Note</option>
            <option value="Task">Task</option>
          </select>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={backHandle}
          >
            Back
          </button>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateNotePage;
