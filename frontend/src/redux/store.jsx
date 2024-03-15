import { configureStore } from "@reduxjs/toolkit";
import blogdataslice from "./blogs";
import addblogslice from "./addblog";
import deleteblogslice from "./deleteblogdata";
import updatablogslice from "./updateblogdata";
import signupuserslice from "./signup";
import loginuserslice from "./login";
import userdataslice from "./userdata";
import resetpasswordslice from "./resetpassword";

const store = configureStore({
  reducer: {
    blogs: blogdataslice,
    addblog: addblogslice,
    deleteblog: deleteblogslice,
    updateblog: updatablogslice,
    signupuser: signupuserslice,
    loginuser: loginuserslice,
    data: userdataslice,
    reset: resetpasswordslice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;