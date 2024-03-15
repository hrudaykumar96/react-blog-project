import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetpassword } from "../redux/resetpassword";
import ButtonLoader from "../features/ButtonLoader";
import { useEffect, useState } from "react";

const PasswordReset = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.reset.loading);
  const message = useSelector((state) => state.reset.data);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
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
    onSubmit: (values, action) => {
      dispatch(resetpassword(values));
      action.resetForm();
    },
  });
  useEffect(() => {
    setData(message);
    return () => {
      setData([]);
    };
  }, [message]);

  useEffect(() => {
    if (data === "password reset successfully") {
      toast.success("Password Changed Successfully");
      navigate("/");
    } else if (data === "email not registered") {
      toast.success("Email not Registered");
      navigate("/signup");
    } else {
      setData(null);
    }
  }, [data, navigate]);
  return (
    <div className="reset">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h3 className="text-center">Reset Password</h3>
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
        <div className="mb-3 link">
          {loading ? (
            <>
              <ButtonLoader />
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="Change Password"
              />
              <Link to="/">Back to Login</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;