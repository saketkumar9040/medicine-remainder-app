import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { reminderReducer } from "./reminderSlice";

const Store = configureStore({
    reducer:{
        auth:authReducer,
        reminder:reminderReducer
    }
});

export default Store;