import { createAsyncThunk } from "@reduxjs/toolkit";
import { search, propositions, getByJob, getByProfile, getAllProfessionals } from "../../apis/search";

export const searchProfessionals = createAsyncThunk(
    '/search/professionals', async (data, thunkAPI) => {
        try {
            const response = await search(data);
            return {
                results: response,
                searchTerm: data
            }
        } catch (err) {
            throw err;
        }
    }
)

export const searchPropositions = createAsyncThunk(
    '/search/propositions', async (data, thunkAPI) => {
        try {
            const response = await propositions(data);
            return response;
        } catch (err) {
            throw err;
        }
    }
)

export const searchByJob = createAsyncThunk(
    '/search/job', async (data, thunkAPI) => {
        try {
            const response = await getByJob(data);
            return {
                results: response,
                searchTerm: data
            }
        } catch (err) {
            throw err;
        }
    }
)

export const searchByProfile = createAsyncThunk(
    '/search/profile', async (data, thunkAPI) => {
        try {
            const response = await getByProfile(data);
            return {
                results: response,
                searchTerm: data
            }
        } catch (err) {
            throw err;
        }
    }
)

export const searchAllProfessionals = createAsyncThunk(
    '/search/all', async (data, thunkAPI) => {
        try {
            const response = await getAllProfessionals();
            return response;
        } catch (err) {
            throw err;
        }
    }
)