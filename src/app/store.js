import { configureStore } from "@reduxjs/toolkit";

import apiReducer from "../api/apiSlice";
import authReducer from "../api/authSlice";

export default configureStore({
    reducer: {
        store: apiReducer,
        auth: authReducer
    }
});
