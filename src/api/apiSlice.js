import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = axios.create({ baseURL: "http://localhost:8080/api/points" });

baseURL.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("WebLab4_Jwt"); 
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

const initialState = {
    points: [],
    r: 1,
    isError: false,
    errorMsg: ""
};

export const postPoint = createAsyncThunk("store/postPoint", async (point) => {
    const response = await baseURL.post("/add_point", point);
    return response.data;
});

export const getPoints = createAsyncThunk("store/getPoints", async () => {
    const response = await baseURL.get("/get_points");
    return response.data;
});

export const deletePoints = createAsyncThunk("store/deletePoints", async () => {
    const response = await baseURL.delete("/delete_points");
    return response.data;
});

const apiSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        changeR   (state, action) { state.r = action.payload; },
        clearStore(state)         { state.points = []; state.r = 1;  },
        setErrorApi(state, action)   { state.isError = action.payload.isError; state.errorMsg = action.payload.errorMsg;  },
    },
    extraReducers(builder) {
        builder
            .addCase(postPoint.fulfilled, (state, action) => {
                state.points.push(action.payload);
            })
            .addCase(postPoint.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.errorMsg = "Failed to save the point";
            })
            .addCase(getPoints.fulfilled, (state, action) => {
                state.points = state.points.concat(action.payload);
            })
            .addCase(getPoints.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.errorMsg = "Failed to get the points";
            })
            .addCase(deletePoints.fulfilled, (state) => {
                state.points = [];
            })
            .addCase(deletePoints.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.errorMsg = "Failed to delete the points";
            });
    }
});

export const { changeR, clearStore, setErrorApi } = apiSlice.actions;

export const selectAllPoints = (state) => state.store.points;
export const selectPointsByR = (state) => state.store.points.slice().filter((p) => p.r === state.store.r)
export const selectR =         (state) => state.store.r;
export const selectIsError =   (state) => state.store.isError;
export const selectErrorMsg =  (state) => state.store.errorMsg;

export default apiSlice.reducer;
