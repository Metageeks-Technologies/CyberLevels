import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IJobPost } from '@/types/jobPost-type'

export interface jobPstState {
    jobPost: IJobPost | null;
    error: string | null,
    loading: boolean
}
const initialState: jobPstState = {
    jobPost: null,
    loading: false,
    error: null,

}

export const jobPostSlice = createSlice({
    name: 'jobPost',
    initialState,
    reducers: {
        submitJobPostStart: (state) => {
            state.loading = true;
        },
        submitJobPostSuccess: (state, action: PayloadAction<IJobPost>) => {
            state.loading = false;
            state.jobPost = action.payload;
        },
        submitJobPostFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },


    },
})

export const { submitJobPostFail, submitJobPostStart, submitJobPostSuccess } = jobPostSlice.actions

export default jobPostSlice.reducer
