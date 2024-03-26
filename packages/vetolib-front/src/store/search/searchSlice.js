import { createSlice } from "@reduxjs/toolkit";
import { searchProfessionals, searchPropositions, searchByJob, searchByProfile, searchAllProfessionals } from "./searchActions";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchTerm: "",
        searchResults: [],
        propositions: [],
        error: false
    },
    reducers: {
        updateSearchPropositions: (state, action) => {
            state.propositions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProfessionals.fulfilled, (state, action) => {
                const { results, searchTerm } = action.payload;
                state.searchResults = results;
                state.searchTerm = searchTerm;
                state.error = false;
            })
            .addCase(searchProfessionals.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(searchPropositions.fulfilled, (state, action) => {
                state.propositions = action.payload;
                state.error = false;
            })
            .addCase(searchPropositions.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(searchByJob.fulfilled, (state, action) => {
                const { results, searchTerm } = action.payload;
                state.searchResults = results;
                state.searchTerm = searchTerm;
                state.error = false;
            })
            .addCase(searchByJob.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(searchByProfile.fulfilled, (state, action) => {
                const { results, searchTerm } = action.payload;
                state.searchResults = results;
                state.searchTerm = searchTerm;
                state.error = false;
            })
            .addCase(searchByProfile.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(searchAllProfessionals.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.searchTerm = '';
                state.error = false;
            })
            .addCase(searchAllProfessionals.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export const { updateSearchPropositions } = searchSlice.actions;
export default searchSlice.reducer;