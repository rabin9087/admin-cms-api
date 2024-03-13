import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: [],
    selectedProduct: {},
    length: 0
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductList: (state, { payload = [] }) => {
            state.productList = payload
        },
        setSelectedProduct: (state, { payload }) => {
            state.selectedProduct = payload
        },

        setProductLength: (state, { payload }) => {
            state.length = payload
        },
    },
})

const { actions, reducer } = productSlice

export const { setProductList, setSelectedProduct, setProductLength } = actions
export default reducer