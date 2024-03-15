import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../redux/login";
import { useEffect, useState } from "react";
import ButtonLoader from "../features/ButtonLoader";
import { toast } from "react-toastify";

const Login = () => {
  const message = useSelector((state) => state.loginuser.data);
  const loading = useSelector((state) => state.loginuser.loading);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const createaccount = () => {
    navigate("/signup");
  };
  useEffect(() => {
    setData(message);
    return () => {
      setData(null);
    };
  }, [message]);

  const dispatch = useDispatch();
  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter Valid Email")
        .required("Enter your Email"),
      password: yup
        .string()
        .required("Enter your Password")
        .min(5, "Password should be atleast 5 characters")
        .max(12, "Password should not exceeds greater than 12 characters"),
    }),
    onSubmit: (values, action) => {
      dispatch(loginuser(values));
      action.resetForm();
    },
  });
  useEffect(() => {
    if (data === "email not registered") {
      toast.warning("Email not registered");
      navigate("/signup");
      setData(null);
    } else if (data === "incorrect password") {
      toast.error("Incorrect Password");
      navigate("/reset");
      setData(null);
    } else if (data && data.blogs_token) {
      const token = message.blogs_token;
      localStorage.setItem("token", token);
      setData(null);
      navigate("/home");
    } else {
      setData(null);
    }
  }, [data, navigate]);

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="text-center">Login Here</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email Address"
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            style={errors.email ? { border: "2px solid red" } : { border: "" }}
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
            className="form-control"
            placeholder="Enter Password"
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            style={
              errors.password ? { border: "2px solid red" } : { border: "" }
            }
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        {loading ? (
          <>
            <ButtonLoader />
          </>
        ) : (
          <>
            <div className="mb-3 link">
              <input type="submit" className="btn btn-primary" value="Login" />
              <Link to="/reset">Forgot Password</Link>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={createaccount}
              >
                Create Account
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;