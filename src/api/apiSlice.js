import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = axios.create({ baseURL: "http://localhost:8080/api" });

const initialState = {
    points: [],
    r: 1
};

export const postPoint = createAsyncThunk("store/postPoint", async (point) => {
    const response = await baseURL.post("/add", point);
    return response.data;
});

export const getPoints = createAsyncThunk("store/getPoints", async () => {
    const response = await baseURL.get("/get_table");
    return response.data;
});

export const deletePoints = createAsyncThunk("store/deletePoints", async () => {
    const response = await baseURL.delete("/delete");
    return response.data;
});

const apiSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        changeR(state, action) { state.r = action.payload; }
    },
    extraReducers(builder) {
        builder
            .addCase(postPoint.fulfilled, (state, action) => {
                state.points.push(action.payload);
            })
            .addCase(getPoints.fulfilled, (state, action) => {
                state.points = state.points.concat(action.payload);
            })
            .addCase(deletePoints.fulfilled, (state, action) => {
                state.points = [];
            });
    }
});

export const { changeR } = apiSlice.actions;

export const selectAllPoints = (state) => state.store.points;
export const selectPointsByR = (state) => state.store.points.slice().filter((p) => p.r === state.store.r)

/*
{
    let points = [];
    state.store.points.slice().forEach(point => {
        if (point.r === state.store.r) points.push(point);
    });;
    //points.filter((point) => {
    //    return point.r === state.store.r
    //});
    return points;
};
*/
export const selectR = (state) => state.store.r;

export default apiSlice.reducer;
