import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidateSub } from '@/types/template';

export interface templateState {
    submitCandidateSub: any,
    submitEmploySub: any,
    employSub: any,
    candidateSub: any,
    error: string | null,
    loading: boolean,
}

const initialState: templateState = {
    submitCandidateSub: null,
    submitEmploySub: null,
    employSub: [],
    candidateSub: [],
    error: null,
    loading: false,
}

export const templateSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {

        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        requestSuccess: (state) => {
            state.loading = false;
        },
        getEmploySubSuccess: (state, action: PayloadAction<any>) => {
            state.employSub = action.payload;
            state.loading = false;
            state.error = null;
        },
        getCandidateSubSuccess: (state, action: PayloadAction<any>) => {
            state.candidateSub = action.payload;
            state.loading = false;
            state.error = null;
        },
        submitCandidateSubSuccess: (state, action: PayloadAction<any>) => {
            if (state.candidateSub && state.candidateSub.length > 0)
                state.candidateSub.push(action.payload)
            state.loading = false;
            state.error = null;
        },
        submitEmploySubSuccess: (state, action: PayloadAction<any>) => {
            if (state.employSub && state.employSub.length > 0)
                state.employSub.push(action.payload)
            state.loading = false;
            state.error = null;
        }

    },
})

export const {
    requestFail,
    requestStart,
    requestSuccess,
    getCandidateSubSuccess,
    getEmploySubSuccess,
    submitCandidateSubSuccess,
    submitEmploySubSuccess

} = templateSlice.actions

export default templateSlice.reducer;
