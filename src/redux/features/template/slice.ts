import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidateSub } from '@/types/template';

export interface templateState {
    candidateSubModel: ICandidateSub | null;
    error: string | null,
    loading: boolean,
}

const initialState: templateState = {
    candidateSubModel: null,
    error: null,
    loading: false,
}

export const templateSlice = createSlice({
    name: 'template',
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
        getCandidateSubModelSuccess: (state, action: PayloadAction<ICandidateSub>) => {
            state.candidateSubModel = action.payload;
            state.loading = false;
            state.error = null;
        }

    },
})

export const {

    requestFail,
    requestStart,
    requestSuccess,
    getCandidateSubModelSuccess

} = templateSlice.actions

export default templateSlice.reducer;
