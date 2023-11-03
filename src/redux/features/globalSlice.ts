import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalState {
    socket: any
    toggle: boolean
}
const initialState: GlobalState = {
    socket: null,
    toggle: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload;
        },
        clearSocket: (state) => {
            state.socket = null
        },
    },
})

export const { setSocket, clearSocket } = globalSlice.actions
export default globalSlice.reducer
