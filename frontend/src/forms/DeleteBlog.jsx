import propTypes from "prop-types";
import ButtonLoader from "../features/ButtonLoader";
import { useSelector } from "react-redux";

const DeleteBlog = ({ closedeleteform, deletedata }) => {
  const loading = useSelector((state) => state.deleteblog.loading);
  return (
    <div className="delete-blog">
      <div className="delete">
        <div className="mb-3">
          <p>Are you sure do you really want to Delete Blog</p>
        </div>
        <div className="mb-3 delete-btn float-end">
          {loading ? (
            <>
              <ButtonLoader />
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deletedata}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closedeleteform}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
DeleteBlog.propTypes = {
  closedeleteform: propTypes.func,
  deletedata: propTypes.func,
};
export default DeleteBlog;