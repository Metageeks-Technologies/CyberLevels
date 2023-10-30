import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICandidate } from '@/types/user-type'
import type { IJobPost } from "@/types/jobPost-type";
import { ICompany } from "@/types/company";

// Define a type for the slice state
export interface ICandidateDashboard {
    loading: boolean,
    error: null | string,
    currCandidate: ICandidate | null,
    savedJobsPage: number,
    totalNumOfSavedJobsPage: number,
    totalSavedJob: number,
    savedJobs: IJobPost[],
    savedCompanyPage: number,
    totalNumOfSavedCompaniesPage: number,
    totalSavedCompany: number,
    savedCompanies: ICompany[],
}

// Define the initial state using that type
const initialState: ICandidateDashboard = {
    loading: false,
    currCandidate: null,
    error: null,
    savedJobsPage: 1,
    totalNumOfSavedJobsPage: 1,
    totalSavedJob: 0,
    savedJobs: [],
    savedCompanyPage: 1,
    totalNumOfSavedCompaniesPage: 1,
    totalSavedCompany: 0,
    savedCompanies: [],
};

type IForGetSavedJobs = {
    totalNumOfSavedJobsPage: number,
    totalSavedJob: number,
    savedJobs: IJobPost[]
}
type IForGetSavedCompanies = {
    totalNumOfSavedCompaniesPage: number,
    totalSavedCompany: number,
    savedCompanies: ICompany[]
}

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
        getSavedJobsSuccess: (state, action: PayloadAction<IForGetSavedJobs>) => {
            state.savedJobs = action.payload.savedJobs;
            state.totalNumOfSavedJobsPage = action.payload.totalNumOfSavedJobsPage;
            state.totalSavedJob = action.payload.totalSavedJob;
            state.loading = false;
        },
        setSavedJobsPage: (state, action: PayloadAction<number>) => {
            state.savedJobsPage = action.payload;
        },
        removeSavedJobSuccess: (state) => {
            if ((state.savedJobs.length === 1) && (state.savedJobsPage !== 1)) {
                state.savedJobsPage = state.savedJobsPage - 1;
            }
        },
        getSavedCompaniesSuccess: (state, action: PayloadAction<IForGetSavedCompanies>) => {
            state.savedCompanies = action.payload.savedCompanies;
            state.totalNumOfSavedCompaniesPage = action.payload.totalNumOfSavedCompaniesPage;
            state.totalSavedCompany = action.payload.totalSavedCompany;
            state.loading = false;
        },
        setSavedCompaniesPage: (state, action: PayloadAction<number>) => {
            state.savedCompanyPage = action.payload;
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
    removeSavedJobSuccess,
    getSavedJobsSuccess,
    setSavedJobsPage,
    getSavedCompaniesSuccess,
    setSavedCompaniesPage
} = candidateDashboardSlice.actions;

export default candidateDashboardSlice.reducer;
