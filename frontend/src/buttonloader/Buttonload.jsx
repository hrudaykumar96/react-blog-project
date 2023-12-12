import React from "react";

const Buttonload = () => {
  return (
    <div>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden" role="status">
          Loading...
        </span>
      </button>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span role="status">Loading...</span>
      </button>
    </div>
  );
};

export default Buttonload;