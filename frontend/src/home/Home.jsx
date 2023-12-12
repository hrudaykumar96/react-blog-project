import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Section from "../section/Section";
import Footer from "../footer/Footer";
import AddForm from "../forms/AddForm";
import EditForm from "../forms/EditForm";
import Loader from "../loader/Loader";
import axios from "axios";
import { useCookies } from "react-cookie";
import Popup from "../forms/Popup";
const Home = () => {
  const url = "http://127.0.0.1:8000/blogs/";
  const [token] = useCookies(["mytoken"]);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [popup, setPopup] = useState(false);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [values, setValues] = useState([]);
  const [num, setNum] = useState([]);
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      });
      setBlog(res.data);
      setLoading(false);
    } catch (err) {
      document.open();
      document.write("<h1>Something went wrong Please try again later<h1/>");
      document.close();
      setLoading(false);
    }
  };
  const adddata = async (data) => {
    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token["mytoken"]}`,
        },
      });
      setOpenAddForm(false);
      getdata();
      alert("data created successfully");
    } catch (error) {
      getdata();
      setOpenAddForm(false);
      alert("unable to add data try again aftersometime");
    }
  };
  const deletedata = async (id) => {
    try {
      await axios.delete(`${url}${id}/`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      });
      getdata();
      closepopup();
      alert("data deleted successfully");
    } catch (error) {
      getdata();
      alert("request failed try again aftersometime");
    }
  };

  const updatedata = async (id, data) => {
    try {
      await axios.put(`${url}${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token["mytoken"]}`,
        },
      });
      closeformupdate(false);
      getdata();
      alert("data updated successfully");
    } catch (error) {
      closeformupdate(false);
      getdata();
      alert("request failed try again after sometime");
    }
  };
  const alert = (msg) => {
    setMessage(msg);
  };
  setTimeout(() => {
    alert();
  }, 5000);
  const openformadd = () => {
    setOpenAddForm(true);
  };
  const closeformadd = () => {
    setOpenAddForm(false);
  };
  const openformupdate = (data) => {
    setValues(data);
    setOpenUpdateForm(true);
  };
  const closeformupdate = () => {
    setOpenUpdateForm(false);
  };
  const opensetPopup = (id) => {
    setNum(id);
    setPopup(true);
  };
  const closepopup = () => {
    setPopup(false);
  };
  return (
    <div>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <Header />
          {openAddForm && (
            <AddForm closeform={closeformadd} adddata={adddata} />
          )}
          {openUpdateForm && (
            <EditForm
              closeformupdate={closeformupdate}
              values={values}
              updatedata={updatedata}
            />
          )}
          {popup && (
            <Popup closepopup={closepopup} deletedata={deletedata} num={num} />
          )}
          <Section
            openformadd={openformadd}
            openformupdate={openformupdate}
            blog={blog}
            deletedata={deletedata}
            message={message}
            opensetPopup={opensetPopup}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;