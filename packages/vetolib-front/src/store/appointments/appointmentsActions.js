import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveAppointment, getAppointments } from "../../apis/appointments";

export const createAppointment = createAsyncThunk(
    '/appointments/new', async (data, thunkAPI) => {
        try {
            const response = await saveAppointment(data);
            return response;
        } catch (err) {
            throw err;
        }
    }
)

export const findAppointments = createAsyncThunk(
    '/appointments/find', async (data, thunkAPI) => {
        try {
            const response = await getAppointments(data);
            return response;
        } catch (err) {
            throw err;
        }
    }
)