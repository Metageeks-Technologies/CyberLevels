import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
    isLnAuthIsInProgress: boolean
}

const initialState: authState = {
    isLnAuthIsInProgress: false,
}

export const lnAuthSlice = createSlice({
    name: 'lnAuth',
    initialState,
    reducers: {
        lnAuthStart: (state) => {

            state.isLnAuthIsInProgress = true;
        },
        lnAuthEnd: (state) => {
            state.isLnAuthIsInProgress = false;
        },

    },
})

// Action creators are generated for each case reducer function
export const { lnAuthEnd, lnAuthStart } = lnAuthSlice.actions

export default lnAuthSlice.reducer