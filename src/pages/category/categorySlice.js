import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    catList: [],
    category: {}
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCatList: (state, { payload = [] }) => {
            state.catList = payload
        },
        setCategory: (state, { payload = [] }) => {
            state.category = payload
        },
    },
})

const { actions, reducer } = categorySlice

export const { setCatList, setCategory } = actions
export default reducer