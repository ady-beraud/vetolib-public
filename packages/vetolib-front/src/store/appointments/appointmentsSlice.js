import { createSlice } from "@reduxjs/toolkit";
import { createAppointment, findAppointments } from "./appointmentsActions";

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        date: '',
        time: '',
        professional_id: '',
        user_id: '',
        animal: '', 
        selected: false,
        appointments: []
    },
    reducers: {
        updateAppointment: (state, action) => {
            const { date, time, professional_id, user_id, animal } = action.payload;
            state.date = date || state.date;
            state.time = time || state.time;
            state.professional_id = professional_id || state.professional_id;
            state.user_id = user_id || state.user_id;
            state.animal = animal || state.animal;
        },
        selectAppointment: (state, action) => {
            const { selected } = action.payload;
            state.selected = selected;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.appointments = [...state.appointments, action.payload];
            })
            .addCase(findAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
            })
    }
});

export default appointmentSlice.reducer;
export const {updateAppointment, selectAppointment} = appointmentSlice.actions;