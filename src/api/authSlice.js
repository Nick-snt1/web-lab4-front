import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = axios.create({ baseURL: "http://localhost:8080/api/auth" });

const initialState = {
    isLogged: false
};

export const authenticate = createAsyncThunk("auth/authenticate", async (user) => {
    const response = await baseURL.post("/authenticate", user);
    return response.data;
});

export const register = createAsyncThunk("auth/register", async (user) => {
    const response = await baseURL.post("/register", user);
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeIsLogged(state, action) { state.isLogged = action.payload; }
    },
    extraReducers(builder) {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.isLogged = true;
                console.log(action.payload.token);
                localStorage.setItem("WebLab4_Jwt", action.payload.token);
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLogged = true;
                console.log(action.payload.token);
                localStorage.setItem("WebLab4_Jwt", action.payload.token);
            });
    }
});

export const { changeIsLogged } = authSlice.actions;

export const selectIsLogged = (state) => state.auth.isLogged;

export default authSlice.reducer;