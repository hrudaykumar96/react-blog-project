import { Link } from "react-router-dom";
import propTypes from "prop-types";
const Header = ({ openchangepasswordform, userdata, logout }) => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            Blog Project
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userdata.name}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={openchangepasswordform}
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
Header.propTypes = {
  openchangepasswordform: propTypes.func,
  userdata: propTypes.any,
  logout: propTypes.func,
};
export default Header;