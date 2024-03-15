import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { updatedata } from "../redux/updateblogdata";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getuserdata } from "../redux/userdata";

const UpdateBlog = ({ closeupdateform, upid, data, token, userdata }) => {
  const dispatch = useDispatch();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
      image: null,
      author: userdata.id,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title Cannot be Empty"),
      description: yup.string().required("Description Cannot be Empty"),
    }),
    onSubmit: async (values, action) => {
      await dispatch(updatedata({ upid, values, token }));
      action.resetForm();
      dispatch(getuserdata(token));
      closeupdateform();
      toast.success("Blog Updated Successfully");
    },
  });
  return (
    <div className="updateblog">
      <form className="updateblog-form" onSubmit={handleSubmit}>
        <h3>Update Blog</h3>
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
            onChange={(e) => setFieldValue("image", e.target.files[0])}
          />
        </div>

        <div className="mb-3 updateblog-btn">
          <input
            type="submit"
            className="btn btn-success"
            value="Update Blog"
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={closeupdateform}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
UpdateBlog.propTypes = {
  closeupdateform: propTypes.func,
  upid: propTypes.any,
  data: propTypes.any,
  token: propTypes.any,
  userdata: propTypes.any,
};
export default UpdateBlog;