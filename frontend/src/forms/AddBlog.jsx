import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addblog } from "../redux/addblog";
import ButtonLoader from "../features/ButtonLoader";
import { toast } from "react-toastify";
import { getuserdata } from "../redux/userdata";

const AddBlog = ({ closeaddform, userdata, token }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.addblog.loading);
  const {
    setFieldValue,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
      author: userdata.id,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title Cannot be Empty"),
      description: yup.string().required("Description Cannot be Empty"),
    }),
    onSubmit: async (values, action) => {
      try {
        await dispatch(addblog({ values, token }));
        action.resetForm();
        dispatch(getuserdata(token));
        closeaddform();
        toast.success("Blog Created Successfully");
      } catch (error) {
        toast.error("Please try again after later");
      }
    },
  });
  return (
    <div className="addblog">
      <form className="createblog-form" onSubmit={handleSubmit}>
        <h3>Create Blog</h3>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <span className="text-danger">*</span>
          <input
            type="text"
            className="form-control"
            placeholder="Blog Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            style={errors.title && { border: "2px solid red" }}
          />
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <span className="text-danger">*</span>
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            placeholder="Blog Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            style={errors.description && { border: "2px solid red" }}
          ></textarea>
          {errors.description && (
            <small className="text-danger">{errors.description}</small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={(e) => setFieldValue("image", e.target.files[0])}
          />
        </div>
        <div className="mb-3 addblog-btn">
          {loading ? (
            <>
              <ButtonLoader />
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="Create Blog"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closeaddform}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
AddBlog.propTypes = {
  closeaddform: propTypes.func,
  userdata: propTypes.any,
  token: propTypes.any,
};
export default AddBlog;