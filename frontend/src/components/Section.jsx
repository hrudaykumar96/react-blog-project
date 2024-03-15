import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../features/Loader";
import PropTypes from "prop-types";
import { getuserdata } from "../redux/userdata";
import Pagination from "../features/Pagination";

const Section = ({
  openaddform,
  openupdateform,
  opendeleteform,
  userdata,
  token,
  auth,
}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  useEffect(() => {
    if (auth===true) {
      dispatch(getuserdata(token));
    } else {
      null;
    }
  }, [dispatch, token, auth]);

  useEffect(() => {
    if (userdata && userdata.blogs) {
      setBlogs(userdata.blogs);
    }
  }, [userdata]);

  const [blogs, setBlogs] = useState([]);
  const popup = (id) => {
    opendeleteform(id);
  };
  const updatepopup = (id, data) => {
    openupdateform(id, data);
  };

  const loading = useSelector((state) => state.blogs.loading);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="section bg-dark">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className="search-form">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={openaddform}
              >
                Create Blog
              </button>
            </div>
          </form>
          {currentBlogs.length > 0 ? (
            currentBlogs.map((item) => (
              <div key={item.id}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`http://127.0.0.1:8000${item.image}`}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => updatepopup(item.id, item)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => popup(item.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <p className="card-text">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger text">No Data Found</p>
          )}

          {blogs.length > 4 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBlogs.length / blogsPerPage)}
              onPageChange={paginate}
              currentBlogs={currentBlogs}
            />
          )}
        </>
      )}
    </div>
  );
};

Section.propTypes = {
  openaddform: PropTypes.func,
  openupdateform: PropTypes.func,
  opendeleteform: PropTypes.func,
  userdata: PropTypes.any,
  token: PropTypes.any,
  auth: PropTypes.any,
};

export default Section;