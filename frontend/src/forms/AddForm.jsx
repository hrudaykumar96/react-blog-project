import React, { useState } from "react";
import "./form.css";
import Buttonload from "../buttonloader/Buttonload";
const AddForm = (props) => {
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addimage, setAddimage] = useState(null);
  const [addformErrors, setAddformErrors] = useState({
    title: "",
    description: "",
    bordertitle: false,
    borderdescription: false,
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const data = {
    title: addTitle,
    description: addDescription,
    image: addimage,
  };
  const addformvalidation = async (e) => {
    e.preventDefault();
    if (addTitle.trim() === "") {
      setAddformErrors((addformErrors) => ({
        ...addformErrors,
        title: "title cannot be empty",
        bordertitle: true,
      }));
    } else if (addTitle.trim().length < 5) {
      setAddformErrors((addformErrors) => ({
        ...addformErrors,
        title: "title must be greater than 5 words",
        bordertitle: true,
      }));
    } else {
      setAddformErrors((addformErrors) => ({
        ...addformErrors,
        title: "",
        bordertitle: false,
      }));
    }
    if (addDescription.trim() === "") {
      setAddformErrors((addformErrors) => ({
        ...addformErrors,
        description: "description cannot be empty",
        borderdescription: true,
      }));
    } else if (addDescription.trim().length < 10) {
      setAddformErrors((addformErrors) => ({
        ...addformErrors,
        description: "description must be greater than 10 words",
        borderdescription: true,
      }));
    } else {
      setAddformErrors((addformErrors) => ({
        ...addformErrors,
        description: "",
        borderdescription: false,
      }));
    }
    if (
      addTitle.trim() !== "" &&
      addTitle.trim().length >= 5 &&
      addDescription.trim() !== "" &&
      addDescription.trim().length > 10
    ) {
      props.adddata(data);
      setBtnLoading(true);
    } else {
      setBtnLoading(false);
    }
  };
  return (
    <div className="addform">
      <form className="form-overlay" onSubmit={addformvalidation}>
        <h3>add blog</h3>
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
            onChange={(e) => setAddTitle(e.target.value)}
            style={
              addformErrors.bordertitle
                ? { border: "2px solid red" }
                : { border: "" }
            }
            required
          />
          {addformErrors.title && (
            <p className="text-danger">{addformErrors.title}</p>
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
            placeholder="blog description"
            onChange={(e) => setAddDescription(e.target.value)}
            style={
              addformErrors.borderdescription
                ? { border: "2px solid red" }
                : { border: "" }
            }
            name="description"
            required
          ></textarea>
          {addformErrors.description && (
            <p className="text-danger">{addformErrors.description}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            image:
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={(e) => setAddimage(e.target.files[0])}
          />
        </div>
        <div className="mb-3 ms-auto">
          {btnLoading ? (
            <Buttonload />
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="add blog"
              />
              <button className="btn btn-danger" onClick={props.closeform}>
                cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddForm;