import API from './client';

export const saveAppointment = async (data) => {
    try {
        const response = await API.put('appointment/new', data);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

export const getAppointments = async (data) => {
    try {
        const response = await API.get(`appointment/findById?id=${encodeURIComponent(data)}`);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}