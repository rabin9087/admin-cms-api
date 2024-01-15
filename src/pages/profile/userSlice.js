import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAdmin: (state, { payload }) => {
            state.admin = payload
        },
    },
})

const { actions, reducer } = userSlice

export const { setAdmin } = actions
export default reducer