import "./section.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const Section = (props) => {
  const [currentpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastindex = currentpage * recordsperpage;
  const firstindex = lastindex - recordsperpage;
  const records = props.blog.slice(firstindex, lastindex);
  const npages = Math.ceil(props.blog.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [search, setSearch] = useState("");

  const prepage = () => {
    if (currentpage !== 1) {
      setCurrentpage(currentpage - 1);
    }
  };
  const changepage = (id) => {
    setCurrentpage(id);
  };
  const nxtpage = () => {
    if (currentpage !== npages) {
      setCurrentpage(currentpage + 1);
    }
  };
  return (
    <div className="section">
      {props.message && <h4 className="alert">{props.message}</h4>}
      <div className="form">
        <div className="mb-3">
          <input
            type="text"
            placeholder="search"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-success">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-info"
          onClick={props.openformadd}
        >
          <i className="fa-solid fa-plus"></i> create blog
        </button>
      </div>
      {props.blog.length === 0 ? (
        <p className="text-danger text-center">no data found</p>
      ) : (
        <>
          {records.map &&
            records
              .filter((data) =>
                data.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((data) => (
                <div className="card" key={data.id}>
                  <div className="card-header">
                    <h3>{data.title}</h3>
                    <div className="button">
                      <button
                        className="btn btn-success"
                        onClick={()=>props.openformupdate(data)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => props.opensetPopup(data.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <img src={data.image} className="card-img-top" alt="" />
                    <p className="card-text">{data.description}</p>
                  </div>
                </div>
              ))}
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <Link to="" onClick={prepage} className="page-link">
                  prev
                </Link>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentpage === n ? "active" : ""}`}
                  key={i}
                >
                  <Link
                    to=""
                    onClick={() => changepage(n)}
                    className="page-link"
                  >
                    {n}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <Link to="" onClick={nxtpage} className="page-link">
                  next
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
      <p className="text-light float-end ml-2">
        total blogs: {props.blog.length}
      </p>
    </div>
  );
};

export default Section;