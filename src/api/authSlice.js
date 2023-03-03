import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = axios.create({ baseURL: "http://localhost:8080/api/auth" });

const initialState = {
    isLogged: false,
    isError:  false,
    errorMsg: ""
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
        changeIsLogged(state, action) { state.isLogged = action.payload; },
        setErrorAuth  (state, action) { state.isError = action.payload.isError; state.errorMsg = action.payload.errorMsg; },
    },
    extraReducers(builder) {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.isLogged = true;
                localStorage.setItem("WebLab4_Jwt", action.payload.token);
            })
            .addCase(authenticate.rejected, (state, action) => {
                console.log(action.error);
                state.isError = true;
                state.errorMsg = action.error.code === 'ERR_BAD_REQUEST' ? "Wrong username or password" : `Failed to authenticate: ${action.error.message}`;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLogged = true;
                localStorage.setItem("WebLab4_Jwt", action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                console.log(action.error);
                state.isError = true;
                state.errorMsg = action.error.code === 'ERR_BAD_REQUEST' ? "Username has aleready taken" : `Failed to register: ${action.error.message}`;
            });
    }
});

export const { changeIsLogged, setErrorAuth } = authSlice.actions;

export const selectIsLogged = (state) => state.auth.isLogged;
export const selectIsError =  (state) => state.auth.isError;
export const selectErrorMsg = (state) => state.auth.errorMsg;

export default authSlice.reducer;