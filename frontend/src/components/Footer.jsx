import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-body-tertiary">
      <div className="icons">
        <Link>
          <i className="fa-brands fa-linkedin"></i>
        </Link>
        <Link>
          <i className="fa-brands fa-facebook"></i>
        </Link>
        <Link>
          <i className="fa-brands fa-github"></i>
        </Link>
        <Link>
          <i className="fa-brands fa-telegram"></i>
        </Link>
        <Link>
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link>
          <i className="fa-brands fa-twitter"></i>
        </Link>
      </div>
      <hr />
      <div className="copyright">
        CopyRight <i className="fa-solid fa-copyright"></i> All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;