import React, { useState } from "react";
import "./form.css";
import Buttonload from "../buttonloader/Buttonload";
const EditForm = ({ closeformupdate, values, updatedata }) => {
  const [editTitle, setEditTitle] = useState(values.title);
  const [editDescription, setEditDescription] = useState(values.description);
  const [editImage, setEditImage] = useState(values.image);
  const [load, setLoad] = useState(false);
  const [editformErrors, setEditformErrors] = useState({
    title: "",
    description: "",
    bordertitle: false,
    borderdescription: false,
  });
  const data = {
    title: editTitle,
    description: editDescription,
    image: editImage,
  };
  const editformvalidation = (e) => {
    e.preventDefault();
    if (editTitle.trim() === "") {
      setEditformErrors((editformErrors) => ({
        ...editformErrors,
        title: "title cannot be empty",
        bordertitle: true,
      }));
    } else if (editTitle.trim().length < 5) {
      setEditformErrors((editformErrors) => ({
        ...editformErrors,
        title: "title must be greater than 5 words",
        bordertitle: true,
      }));
    } else {
      setEditformErrors((editformErrors) => ({
        ...editformErrors,
        title: "",
        bordertitle: false,
      }));
    }
    if (editDescription.trim() === "") {
      setEditformErrors((editformErrors) => ({
        ...editformErrors,
        description: "description cannot be empty",
        borderdescription: true,
      }));
    } else if (editDescription.trim().length < 10) {
      setEditformErrors((editformErrors) => ({
        ...editformErrors,
        description: "description must be greater than 10 words",
        borderdescription: true,
      }));
    } else {
      setEditformErrors((editformErrors) => ({
        ...editformErrors,
        description: "",
        borderdescription: false,
      }));
    }
    if (
      editTitle.trim() !== "" &&
      editTitle.trim().length >= 5 &&
      editDescription.trim() !== "" &&
      editDescription.trim().length > 10
    ) {
      updatedata(values.id, data);
      setLoad(true);
    } else {
      setLoad(false);
    }
  };
  return (
    <div className="editform">
      <form
        className="form-overlay"
        onSubmit={editformvalidation}
        encType="multipart/form-data"
      >
        <h3>update blog</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title:
          </label>
          <span className="text-danger">*</span>
          <input
            type="text"
            className="form-control"
            placeholder="blog title"
            name="title"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
            required
            style={
              editformErrors.bordertitle
                ? { border: "2px solid red" }
                : { border: "" }
            }
          />
          {editformErrors.title && (
            <p className="text-danger">{editformErrors.title}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description:
          </label>
          <span className="text-danger">*</span>
          <textarea
            cols="45"
            rows="10"
            placeholder="description"
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
            }}
            required
            name="description"
            style={
              editformErrors.borderdescription
                ? { border: "2px solid red" }
                : { border: "" }
            }
          ></textarea>
          {editformErrors.description && (
            <p className="text-danger">{editformErrors.description}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            image:
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            name="image"
            onChange={(e) => {
              setEditImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="mb-3 ms-auto">
          {load ? (
            <Buttonload />
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="update blog"
              />
              <button className="btn btn-danger" onClick={closeformupdate}>
                cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditForm;