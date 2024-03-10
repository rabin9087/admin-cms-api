import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    customerList: [],
    selectedCustomer: {},
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomerList: (state, { payload = [] }) => {
            state.customerList = payload
        },
        setCustomer: (state, { payload }) => {
            state.customerList = payload
        },
    },
})

const { actions, reducer } = customerSlice

export const { setCustomerList, setCustomer } = actions
export default reducer