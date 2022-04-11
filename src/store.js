import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Redducer/userReducer";

export default configureStore({
    reducer:{
        user: userReducer,
    }
})