import Login from "./Login";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import AddBlog from "../forms/AddBlog";
import UpdateBlog from "../forms/UpdateBlog";
import DeleteBlog from "../forms/DeleteBlog";
import ChangePassword from "../forms/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteblogdata } from "../redux/deleteblogdata";
import { getuserdata } from "../redux/userdata";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [addBlog, setAddBlog] = useState(false);
  const [updateBlog, setUpdateBlog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [id, setId] = useState(null);
  const [upid, setUpid] = useState(null);
  const [data, setData] = useState(null);
  const userdata = useSelector((state) => state.data.data);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token === undefined || token === null || token === "" || token == []) {
      setAuth(false);
      navigate("/");
    } else {
      setAuth(true);
    }
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  const openaddform = () => {
    setAddBlog(true);
  };

  const openupdateform = (id, data) => {
    setUpdateBlog(true);
    setUpid(id);
    setData(data);
  };

  const opendeleteform = (blogId) => {
    setDeleteBlog(true);
    setId(blogId);
  };

  const openchangepasswordform = () => {
    setChangePassword(true);
  };

  const closeaddform = () => {
    setAddBlog(false);
  };

  const closeupdateform = () => {
    setUpdateBlog(false);
  };

  const closedeleteform = () => {
    setDeleteBlog(false);
  };

  const closechangepasswordform = () => {
    setChangePassword(false);
  };

  const deletedata = async () => {
    try {
      if (id !== null) {
        await dispatch(deleteblogdata({ id, token }));
        await dispatch(getuserdata(token));
        closedeleteform();
        toast.success("Blog Deleted Successfully");
      } else {
        toast.error("Please try again after later");
      }
    } catch (error) {
      toast.error("Please try again after later");
    }
  };
  return (
    <div>
      {auth ? (
        <>
          <Header
            openchangepasswordform={openchangepasswordform}
            userdata={userdata}
            token={token}
            logout={logout}
          />
          {addBlog && (
            <AddBlog
              closeaddform={closeaddform}
              userdata={userdata}
              token={token}
            />
          )}
          {updateBlog && (
            <UpdateBlog
              closeupdateform={closeupdateform}
              upid={upid}
              data={data}
              token={token}
              userdata={userdata}
            />
          )}
          {deleteBlog && (
            <DeleteBlog
              closedeleteform={closedeleteform}
              deletedata={deletedata}
              token={token}
            />
          )}
          {changePassword && (
            <ChangePassword
              closechangepasswordform={closechangepasswordform}
              userdata={userdata}
            />
          )}

          <Section
            openaddform={openaddform}
            openupdateform={openupdateform}
            opendeleteform={opendeleteform}
            userdata={userdata}
            token={token}
            auth={auth}
          />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};
export default Home;