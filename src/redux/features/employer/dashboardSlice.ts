import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICandidate, IEmployer } from '@/types/user-type'

// Define a type for the slice state
export interface ICandidateDashboard {
    loading: boolean,
    error: null | string,
    currEmployer: IEmployer | null;
    savedCandidates: ICandidate[];
    page: number,
    totalNumOfPage: number,
    totalCandidate: number,
}

// Define the initial state using that type
const initialState: ICandidateDashboard = {
    loading: false,
    currEmployer: null,
    error: null,
    page: 1,
    totalNumOfPage: 1,
    totalCandidate: 0,
    savedCandidates: []
};

type IForGetSavedCandidate = {
    savedCandidates: ICandidate[]
    totalNumOfPage: number,
    totalCandidate: number,
}

export const candidateDashboardSlice = createSlice({
    name: "employerDashboard",
    initialState,
    reducers: {
        requestStartDash: (state) => {
            state.loading = true;
        },
        requestFailDash: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload

        },
        getEmployerSuccess: (state, action: PayloadAction<IEmployer>) => {
            state.currEmployer = action.payload;
            state.loading = false,
                state.error = null;
        },
        updateCurrEmployerSuccess: (state, action: PayloadAction<IEmployer>) => {
            state.currEmployer = action.payload;
            state.loading = false;
        },
        updateAvatarSuccess: (state, action: PayloadAction<string>) => {
            if (state.currEmployer) state.currEmployer.avatar = action.payload
        },
        getSavedCandidatesSuccess: (state, action: PayloadAction<IForGetSavedCandidate>) => {
            state.savedCandidates = action.payload.savedCandidates;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalCandidate = action.payload.totalCandidate;
            state.loading = false;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }
    },
});

export const {
    getEmployerSuccess,
    updateCurrEmployerSuccess,
    requestFailDash,
    requestStartDash,
    getSavedCandidatesSuccess,
    setPage,
    updateAvatarSuccess
} = candidateDashboardSlice.actions;

export default candidateDashboardSlice.reducer;
