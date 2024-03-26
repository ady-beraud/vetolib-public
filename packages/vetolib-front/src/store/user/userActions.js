import { createAsyncThunk } from "@reduxjs/toolkit";
import { addAnimal, getInfo, addPhone } from "../../apis/user";

export const saveAnimal = createAsyncThunk(
    'user/animals', async(data, thunkAPI) => {
        try {
            const response = await addAnimal(data);
            return response;
        } catch (err) {
            throw err;
        }
});

export const fetchInfo = createAsyncThunk(
    'user/all_animals', async (data, thunkAPI) => {
        try {
            const response = await getInfo(data);
            return response;
        } catch (err) {
            throw err;
        }
    }
)

export const savePhone = createAsyncThunk(
    'user/telephone', async(data, thunkAPI) => {
        try {
            const response = await addPhone(data);
            return response;
        } catch (err) {
            throw err;
        }
})