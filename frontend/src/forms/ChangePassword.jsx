import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { resetpassword } from "../redux/resetpassword";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ChangePassword = ({ closechangepasswordform, userdata }) => {
  const dispatch = useDispatch();
  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: userdata.email,
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter Valid Email")
        .required("Enter your Email"),
      password: yup
        .string()
        .required("Password Cannot be Empty")
        .min(5, "Password should be atleast 5 characters")
        .max(12, "Password should not exceeds greater than 12 characters"),
      confirm_password: yup
        .string()
        .required("Confirm Password Cannot be Empty")
        .oneOf(
          [yup.ref("password")],
          "Password does not match with Confirm Password"
        ),
    }),
    onSubmit: async (values, action) => {
      await dispatch(resetpassword(values));
      action.resetForm();
      closechangepasswordform();
      toast.success("Password Changed Successfully");
    },
  });
  return (
    <div className="pwd-change">
      <form className="pwdchange-form" onSubmit={handleSubmit}>
        <h3 className="text-center">Change Password</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="form-control"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.email && { border: "2px solid red" }}
            disabled
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.password && { border: "2px solid red" }}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            placeholder="Enter Confirm Password"
            className="form-control"
            name="confirm_password"
            value={values.confirm_password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.confirm_password && { border: "2px solid red" }}
          />
          {errors.confirm_password && (
            <small className="text-danger">{errors.confirm_password}</small>
          )}
        </div>
        <div className="mb-3">
          <input
            type="submit"
            className="btn btn-success"
            value="Change Password"
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={closechangepasswordform}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
ChangePassword.propTypes = {
  closechangepasswordform: propTypes.func,
  userdata: propTypes.any,
};
export default ChangePassword;