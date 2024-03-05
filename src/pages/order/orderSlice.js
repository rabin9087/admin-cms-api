import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  order: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SetAllOrders: (state, { payload }) => {
      state.orderList = payload;
    },

    SetAOrder: (state, { payload }) => {
      state.order = payload;
    },
  },
});

const { actions, reducer } = orderSlice;
export const { SetAOrder, SetAllOrders } = actions;
export default reducer;
