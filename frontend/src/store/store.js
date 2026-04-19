import  {configureStore}  from "@reduxjs/toolkit";
import  userReducer from "./userSlice";
import companyReducer  from "./companySlice";
import  applicationReducer  from "./applicationSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        companies:companyReducer,
        applications:applicationReducer,
    },
});