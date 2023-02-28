import { configureStore } from "@reduxjs/toolkit";

import apiReducer from "../api/apiSlice";
//import postsReducer from "../features/posts/postsSlice";

export default configureStore({
    reducer: {
        store: apiReducer
    }
});
