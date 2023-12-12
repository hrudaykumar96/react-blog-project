import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Buttonload from "../buttonloader/Buttonload";
const Signup = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registercnfpassword, setRegistercnfpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [registrationerr, setRegistrationerr] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: "",
    bordername: false,
    borderemail: false,
    borderpassword: false,
    borderconfirmpassword: false,
  });
  const data = {
    email: registerEmail,
    name: registerName,
    password: registerPassword,
  };
  const alert = (msg) => {
    setMessage(msg);
  };
  setTimeout(() => {
    alert();
  }, 5000);
  function submituser() {
    if (user === "Created") {
      alert("user registered successfully");
      navigate("/");
    } else if (user === "Bad Request") {
      alert("email already registered");
    } else {
      alert("");
      navigate("/signup");
    }
  }
  const validemail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const signupvalidation = async (e) => {
    e.preventDefault();
    if (registerName.trim() === "") {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        name: "name should not be empty",
        bordername: true,
      }));
    } else if (registerName.trim().length < 5) {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        name: "name should be atleast 5 characters",
        bordername: true,
      }));
    } else {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        name: "",
        bordername: false,
      }));
    }
    if (registerEmail.trim() === "") {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        email: "email address cannot be empty",
        borderemail: true,
      }));
    } else if (!validemail.test(registerEmail)) {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        email: "enter valid email address",
        borderemail: true,
      }));
    } else {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        email: "",
        borderemail: false,
      }));
    }
    if (registerPassword.trim() === "") {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        password: "password cannot be empty",
        borderpassword: true,
      }));
    } else if (registerPassword.trim().length < 5) {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        password: "password should be atleast 5 characters",
        borderpassword: true,
      }));
    } else {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        password: "",
        borderpassword: false,
      }));
    }
    if (registercnfpassword.trim() === "") {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        cnfpassword: "confirm cannot be empty",
        borderconfirmpassword: true,
      }));
    } else if (registercnfpassword.trim() !== registerPassword.trim()) {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        cnfpassword: "password does not match",
        borderconfirmpassword: true,
      }));
    } else {
      setRegistrationerr((registrationerr) => ({
        ...registrationerr,
        cnfpassword: "",
        borderconfirmpassword: false,
      }));
    }
    if (
      registerName.length >= 5 &&
      registerEmail.trim() !== "" &&
      validemail.test(registerEmail) &&
      registerPassword.length >= 5 &&
      registercnfpassword === registerPassword
    ) {
      setLoading(true);
      await axios
        .post("http://127.0.0.1:8000/users/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => setUser(res.statusText))
        .catch((err) => setUser(err.response.statusText));
      setLoading(false);
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="signup">
      {message && <h4 className="alert">{message}</h4>}
      <form onSubmit={signupvalidation}>
        <h3>register here</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name:
          </label>
          <span className="text-danger">*</span>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            name="name"
            value={registerName}
            required
            onChange={(e) => setRegisterName(e.target.value)}
            style={
              registrationerr.bordername
                ? { border: "2px solid red" }
                : { border: "" }
            }
          />
          {registrationerr.name && (
            <p className="text-danger">{registrationerr.name}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="email"
            value={registerEmail}
            required
            onChange={(e) => setRegisterEmail(e.target.value)}
            style={
              registrationerr.borderemail
                ? { border: "2px solid red" }
                : { border: "" }
            }
          />
          {registrationerr.email && (
            <p className="text-danger">{registrationerr.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={registerPassword}
            required
            onChange={(e) => setRegisterPassword(e.target.value)}
            style={
              registrationerr.borderpassword
                ? { border: "2px solid red" }
                : { border: "" }
            }
          />
          {registrationerr.password && (
            <p className="text-danger">{registrationerr.password}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confrim password" className="form-label">
            confirm password:
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="confrim password"
            name="confirm_password"
            value={registercnfpassword}
            required
            onChange={(e) => setRegistercnfpassword(e.target.value)}
            style={
              registrationerr.borderconfirmpassword
                ? { border: "2px solid red" }
                : { border: "" }
            }
          />
          {registrationerr.cnfpassword && (
            <p className="text-danger">{registrationerr.cnfpassword}</p>
          )}
        </div>
        <div className="mb-3">
          {loading ? (
            <Buttonload />
          ) : (
            <input
              type="submit"
              value="sign up"
              className="btn btn-success"
              onClick={submituser}
            />
          )}
        </div>
        <Link to="/">already have account login here</Link>
      </form>
    </div>
  );
};

export default Signup;