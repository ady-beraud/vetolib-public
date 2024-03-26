import API from './client';

export const search = async (data) => {
    try {
        const response = await API.get(`search?searchTerm=${encodeURIComponent(data)}`);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}

export const propositions = async (data) => {
    try {
        const response = await API.get(`search?searchProposition=${encodeURIComponent(data)}`);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}

export const getByJob = async (data) => {
    try {
        const response = await API.get(`search?searchJob=${encodeURIComponent(data)}`);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}

export const getByProfile = async (data) => {
    try {
        const response = await API.get(`search?searchProfile=${encodeURIComponent(data)}`);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}

export const getAllProfessionals = async () => {
    try {
        const response = await API.get(`search/all`);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}
