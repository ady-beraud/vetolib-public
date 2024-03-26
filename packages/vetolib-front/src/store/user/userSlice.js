import { createSlice } from "@reduxjs/toolkit";
import { saveAnimal, fetchInfo, savePhone } from "./userActions";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        animals: [],
        telephone: "",
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveAnimal.fulfilled, (state, action) => {
                state.animals = action.payload.animals;
                state.error = false;
            })
            .addCase(saveAnimal.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(fetchInfo.fulfilled, (state, action) => {
                state.animals = action.payload.animals;
                state.telephone = action.payload.telephone;
                state.error = false;
            })
            .addCase(fetchInfo.rejected, (state, action) =>{
                state.error = true;
            })
            .addCase(savePhone.fulfilled, (state, action) => {
                state.telephone = action.payload.telephone;
                state.error = false;
            })
            .addCase(savePhone.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default userSlice.reducer;