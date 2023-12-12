import React from "react";
const Popup = (props) => {
  return (
    <div className="modal-fade">
      <div className="modal-dialog modal-dialog-centered bg-light">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Delete Blog</h1>
          </div>
          <div className="modal-body">
            <h3>this action cannot be undone are you sure to delete</h3>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => props.deletedata(props.num)}
            >
              delete
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={props.closepopup}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;