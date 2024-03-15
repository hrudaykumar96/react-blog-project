import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupuser } from "../redux/signup";
import { useEffect, useState } from "react";
import ButtonLoader from "../features/ButtonLoader";
import { toast } from "react-toastify";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.signupuser.data);
  const [data, setData] = useState(null);
  const loading = useSelector((state) => state.signupuser.loading);

  useEffect(() => {
    setData(message);
    return () => {
      setData(null);
    };
  }, [message]);
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(4, "Name should be atleast 4 characters")
        .required("Enter your Full Name"),
      email: yup
        .string()
        .email("Enter Valid Email")
        .required("Enter your Email"),
      password: yup
        .string()
        .required("Enter your Password")
        .min(5, "Password should be atleast 5 characters")
        .max(12, "Password should not exceeds greater than 12 characters"),
      confirm_password: yup
        .string()
        .required("Enter Confirm Password")
        .oneOf(
          [yup.ref("password")],
          "Password does not match with Confirm Password"
        ),
    }),
    onSubmit: (values, action) => {
      dispatch(signupuser(values));
      action.resetForm();
    },
  });
  useEffect(() => {
    if (data === "email already registered") {
      toast.warning("Email Already Registered");
      navigate("/");
    } else if (data === "registered successfully") {
      toast.success("User Registered Successfully");
      navigate("/");
    } else {
      setData(null);
    }
  }, [data, navigate]);

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3 className="text-center">Create Account</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <span className="text-danger">*</span>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="form-control"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.name && { border: "2px solid red" }}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
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
                value="Create Account"
              />
              <Link to="/">Already Have Account</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
export default Signup;