import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = axios.create({ baseURL: "http://localhost:8080/api" });
const pointAdapter = createEntityAdapter();

/*
const initialState = pointAdapter.getInitialState({
    status: 'idle',
    r: 1,
});
*/
const initialState = {
    points: [
        { x: 1.0, y: 0.0, r: 1, hit: "Hit"},
        //{ x: 0, y: 0, r: 1, hit: "Hit" },
        //{ x: 1, y: 0, r: 1, hit: "Hit" },
        //{ x: 0, y: 0, r: 1, hit: "Hit" },
        //{ x: 1, y: 0, r: 1, hit: "Hit" },
        //{ x: 0, y: 0, r: 1, hit: "Hit" }
    ],
    status: "idle",
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

//export const fetchPoints = () => {
//return async (dispatch) => {
//const points = await getPoints();
//dispatch(setPoints(points));
//};
//};

const apiSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        changeR(state, action) { state.r = action.payload; }
    },
    extraReducers(builder) {
        builder
            .addCase(postPoint.fulfilled, (state, action) => {
                state.status = "succeeded";
                //pointAdapter.addOne(action.payload);
                state.points.push(action.payload);
            })
            .addCase(getPoints.fulfilled, (state, action) => {
                state.status = "succeeded";
                //pointAdapter.addMany(action.payload)
                console.log(action.payload[0]);
                state.points = state.points.concat(action.payload[0]);
            })
            .addCase(deletePoints.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.points = [];
            });
    }
});

export const { changeR } = apiSlice.actions;

export const selectAllPoints = (state) => state.store.points;
export const selectPointsByR = (state) => {
    const points = state.store.points.slice();
    points.filter((point) => point.r === state.store.r);
};
export const selectR = (state) => state.store.r;

export default apiSlice.reducer;
