import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICompany } from '@/types/company'

export interface jobPstState {
    company: ICompany | null;
    error: string | null,
    loading: boolean
}
const initialState: jobPstState = {
    company: null,
    loading: false,
    error: null,
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        submitCompanySuccess: (state, action: PayloadAction<ICompany>) => {
            state.loading = false;
            state.company = action.payload;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },


    },
})

export const { requestFail, requestStart, submitCompanySuccess } = companySlice.actions

export default companySlice.reducer
