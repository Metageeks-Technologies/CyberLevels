import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICompany } from '@/types/company'

export interface jobPstState {
    company: ICompany | null;
    error: string | null,
    loading: boolean,
    companyOfJobPost: ICompany | null,
    companies: ICompany[]
    page: number,
    totalNumOfPage: number,
    totalCompanies: number,
}
const initialState: jobPstState = {
    company: null,
    loading: false,
    error: null,
    companyOfJobPost: null,
    companies: [],
    page: 1,
    totalCompanies: 0,
    totalNumOfPage: 1,
}

type IForGetAllJobPost = {
    companies: ICompany[],
    totalNumOfPage: number,
    totalCompanies: number,
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
        getCompanyOfJobPost: (state, action: PayloadAction<ICompany>) => {
            state.loading = false;
            state.companyOfJobPost = action.payload;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCompanySuccess: (state, action: PayloadAction<IForGetAllJobPost>) => {
            state.loading = false
            state.companies = action.payload.companies;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalCompanies = action.payload.totalCompanies
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        toggleIsSaved: (state, action: PayloadAction<string>) => {
            state.companies = state.companies.map((company) => {
                if (company._id === action.payload) {
                    return { ...company, isSaved: !company.isSaved }
                } else return company;
            })

        },

    },
})

export const { requestFail, toggleIsSaved, setPage, getCompanyOfJobPost, requestStart, submitCompanySuccess, getCompanySuccess } = companySlice.actions

export default companySlice.reducer
