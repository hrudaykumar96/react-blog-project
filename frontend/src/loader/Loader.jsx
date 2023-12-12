import React from "react";
 import './loader.css'

const Loader = () => {
  return (
    <div className="loader">
      <div className="d-flex justify-content-center">
        <strong role="status">Loading...</strong>
        <div className="spinner-border" role="status"></div>
      </div>
    </div>
  );
};

export default Loader;