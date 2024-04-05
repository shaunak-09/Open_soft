import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlicer";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer:{
        AppSlice,
        userSlice
    }
})  
