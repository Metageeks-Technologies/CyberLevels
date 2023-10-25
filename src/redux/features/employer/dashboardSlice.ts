import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IEmployer } from '@/types/user-type'

// Define a type for the slice state
export interface ICandidateDashboard {
    loading: boolean,
    error: null | string,
    currEmployer: IEmployer | null;
}

// Define the initial state using that type
const initialState: ICandidateDashboard = {
    loading: false,
    currEmployer: null,
    error: null,
};

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
    },
});

export const {
    getEmployerSuccess,
    updateCurrEmployerSuccess,
    requestFailDash,
    requestStartDash,
} = candidateDashboardSlice.actions;

export default candidateDashboardSlice.reducer;
