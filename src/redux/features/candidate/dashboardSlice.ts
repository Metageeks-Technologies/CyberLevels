import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICandidate } from '@/types/user-type'

// Define a type for the slice state
export interface ICandidateDashboard {
    loading: boolean,
    error: null | string,
    currCandidate: ICandidate | null,
    temp: string,
}

// Define the initial state using that type
const initialState: ICandidateDashboard = {
    loading: false,
    currCandidate: null,
    error: null,
    temp: "shiva"

};

export const candidateDashboardSlice = createSlice({
    name: "candidateDashboard",
    initialState,
    reducers: {
        requestStartDash: (state) => {
            state.loading = true;
        },
        requestFailDash: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload

        },
        getCurrCandidateSuccess: (state, action: PayloadAction<ICandidate>) => {
            state.currCandidate = action.payload;
            state.loading = false,
                state.error = null;
        },
        updateCurrCandidateSuccess: (state, action: PayloadAction<ICandidate>) => {
            state.currCandidate = action.payload;
            state.loading = false;
        },
        updateEduSuccess: (state, action: PayloadAction<any>) => {
            if (state.currCandidate) {
                state.currCandidate.education = [...state.currCandidate.education, action.payload]
            }
            state.loading = false;
        },
        updateExpSuccess: (state, action: PayloadAction<any>) => {
            if (state.currCandidate)
                state.currCandidate.experience = [...state.currCandidate.experience, action.payload]
            state.loading = false;
        },

    },
});

export const {
    getCurrCandidateSuccess,
    updateEduSuccess,
    updateExpSuccess,
    updateCurrCandidateSuccess,
    requestFailDash,
    requestStartDash,
} = candidateDashboardSlice.actions;

export default candidateDashboardSlice.reducer;
