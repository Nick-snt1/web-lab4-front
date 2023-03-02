import { configureStore } from "@reduxjs/toolkit";

import apiReducer from "../api/apiSlice";
import authReducer from "../api/authSlice";
//import postsReducer from "../features/posts/postsSlice";

export default configureStore({
    reducer: {
        store: apiReducer,
        auth: authReducer
    }
});
