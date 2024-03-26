import API from './client';

export const addAnimal = async (data) => {
    try {
        const response = await API.put('user/animals', data);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

export const getInfo = async (data) => {
    try {
        const response = await API.get(`user/info/${data.id}`);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

export const addPhone = async (data) => {
    try {
        const response = await API.put('user/telephone', data);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}