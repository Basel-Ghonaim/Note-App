import { useState } from "react";
import TitlePage from "../../components/TitlePage/TitlePage";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../redux/note-slice";
import createNote from "../../models/note";
import { createNotesOnServer } from "../../Service/notes-service";

let NewNotePage = () => {
  let dispatch = useDispatch();
  let [note, setNote] = useState({
    title: "",
    details: "",
    type: "",
  });
  let [errors, setErrors] = useState({});

  // Handle form submission
  let submitHandle = (event) => {
    event.preventDefault();
    let validateError = validationData(note);
    if (Object.keys(validateError).length > 0) {
      return;
    }
    saveData();
  };
  // Handle input change
  let onChangeHandle = (event) => {
    let { name, value } = event.target;
    setNote((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  // Save note data
  let saveData = async () => {
    let noteCreated = createNote(note.title, note.details, note.type, false);
    let noteId = await createNotesOnServer(noteCreated);
    if (noteId != null) {
      noteCreated.id = noteId ?? Date.now();
      dispatch(notesActions.create(noteCreated));
      Swal.fire({
        title: "The note has been created successfully",
        position: "center",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
      });
      clear();
    }
  };
  // Validate note fields
  let validationData = (note) => {
    let error = {};
    Object.keys(note).forEach((key) => {
      if (note[key].trim() === "") {
        error[key] = `Field ${key}`;
      }
    });
    setErrors(error);
    return error;
  };
  // Clear input fields
  let clear = () => {
    setNote({
      title: "",
      details: "",
      type: "",
    });
  };
  return (
    <>
      <TitlePage title="New Notes" />
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
          {errors.title && <p>{errors.title} is required</p>}
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
          {errors.details && <p>{errors.details} is required</p>}
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
          {errors.type && <p>{errors.type} is required</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewNotePage;
