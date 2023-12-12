import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Buttonload from "../buttonloader/Buttonload";
import { useCookies } from "react-cookie";
import axios from "axios";
const Login = () => {
  const [loginemail, setEmail] = useState("");
  const [loginpassword, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();
  const [loginerr, setLoginerr] = useState({
    email: "",
    password: "",
    emailborder: false,
    passwordborder: false,
  });
  useEffect(() => {
    var user_token = token["mytoken"];
    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [token]);
  const data = {
    username: loginemail,
    password: loginpassword,
  };
  async function click(e) {
    e.preventDefault();
    setLoading(true);
    if (
      loginemail.trim() !== "" &&
      validemail.test(loginemail) &&
      loginpassword.length >= 5
    ) {
      await axios
        .post("http://127.0.0.1:8000/auth/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => setToken("mytoken", res.data.token))
        .catch((err) => setUser(err.response.statusText));
      setLoading(false);
    } else {
      setLoading(false);
    }
    if (user === "Bad Request") {
      setLoading(false);
      alert("incorrect email or password");
    } else {
      alert("");
    }
  }
  const alert = (msg) => {
    setMessage(msg);
  };
  setTimeout(() => {
    alert();
  }, 5000);
  const navigate = useNavigate();
  var validemail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const loginvalidation = async (e) => {
    e.preventDefault();
    if (loginemail.trim() === "") {
      setLoginerr((loginerr) => ({
        ...loginerr,
        email: "email address cannot be empty",
        emailborder: true,
      }));
    } else if (!validemail.test(loginemail)) {
      setLoginerr((loginerr) => ({
        ...loginerr,
        email: "enter valid email address",
        emailborder: true,
      }));
    } else {
      setLoginerr((loginerr) => ({
        ...loginerr,
        email: "",
        emailborder: false,
      }));
    }
    if (loginpassword.trim() === "") {
      setLoginerr((loginerr) => ({
        ...loginerr,
        password: "password cannot be empty",
        passwordborder: true,
      }));
    } else {
      setLoginerr((loginerr) => ({
        ...loginerr,
        password: "",
        passwordborder: false,
      }));
    }
  };
  return (
    <div className="login">
      {message && <h4 className="alert">{message}</h4>}
      <form onSubmit={loginvalidation}>
        <h3>login here</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="email address"
            name="email"
            value={loginemail}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={
              loginerr.emailborder
                ? { border: "2px solid red" }
                : { border: "" }
            }
          />
          {loginerr.email && (
            <p className="text-danger bg-dark">{loginerr.email}</p>
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
            value={loginpassword}
            style={
              loginerr.passwordborder
                ? { border: "2px solid red" }
                : { border: "" }
            }
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loginerr.password && (
            <p className="text-danger">{loginerr.password}</p>
          )}
        </div>
        <div className="mb-3">
          {loading ? (
            <Buttonload />
          ) : (
            <input
              type="submit"
              value="login"
              className="btn btn-primary"
              onClick={click}
            />
          )}
        </div>
        <Link to="/signup" className="btn btn-success">
          create account
        </Link>
      </form>
    </div>
  );
};

export default Login;