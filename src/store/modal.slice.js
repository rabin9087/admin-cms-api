import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    heading: '', content: '',
    data: [],
    id: ''
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            state.show = true
            state.heading = payload.heading
            state.content = payload.content
            state.data = payload.data
            state.id = payload.id
        },
        closeModal: (state) => {
            state.show = false
        },
    },
})

const { actions, reducer } = modalSlice

export const { openModal, closeModal } = actions
export default reducer