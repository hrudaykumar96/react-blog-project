import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Header = (props) => {
  const [token, SetToken, removeToken] = useCookies(["mytoken"]);
  const logoutBtn = () => {
    removeToken(["mytoken"]);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary d-flex align-items-center justify-content-between">
        <Link to="/home" className="navbar-brand">
          react<span>Blog</span>
        </Link>
        <div className="dropdown">
          <button
            className="bg-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            user
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/" onClick={logoutBtn}>
                logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;