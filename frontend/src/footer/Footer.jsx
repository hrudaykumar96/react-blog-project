import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
        <Link className="btn-floating btn m-1" to="#">
          <i className="fa-brands fa-facebook"></i>
        </Link>
        <Link to="#" className="btn-floating btn m-1">
          <i className="fa-brands fa-telegram"></i>
        </Link>
        <Link to="#" className="btn-floating btn m-1">
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link to="#" className="btn-floating btn m-1">
          <i className="fa-brands fa-linkedin"></i>
        </Link>
        <Link to="#" className="btn-floating btn m-1">
          <i className="fa-brands fa-github"></i>
        </Link>
      </div>
      <div className="copyright">
        copyright <i className="fa-solid fa-copyright"></i> hruday kumar
      </div>
    </div>
  );
};

export default Footer;