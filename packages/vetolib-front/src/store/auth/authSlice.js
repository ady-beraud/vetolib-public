import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, loginUser, registerUser, logoutUser } from "./authActions";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        error: false,
        user: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkLoginStatus.fulfilled, (state, action) => {
                const {isAuthenticated, user} = action.payload;
                state.isAuthenticated = isAuthenticated;
                state.user = user;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const {isAuthenticated, user} = action.payload;
                state.isAuthenticated = isAuthenticated;
                state.user = user;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const {isAuthenticated, user} = action.payload;
                state.isAuthenticated = isAuthenticated;
                state.user = user;
                state.error = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                const {error} = action.payload;
                state.isAuthenticated = false;
                state.user = null;
                state.error = error;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                const {isAuthenticated, user} = action.payload;
                state.isAuthenticated = isAuthenticated;
                state.user = user;
                state.error = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default authSlice.reducer;
