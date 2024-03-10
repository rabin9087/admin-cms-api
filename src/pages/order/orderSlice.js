import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  order: {},
  numberOfOrder: []
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

    SetOrderNumberByUser: (state, { payload }) => {
      state.numberOfOrder = payload;
    },

    updateDispatchedOrder: (state, { payload }) => {
      const { items, ...rest } = state.order;

      // Map over items and update dispatchedQty if _id matches
      const updatedItems = items.map(item => {
        if (item._id._id === payload._id) {
          return {
            ...item,
            dispatchedQty: payload.dispatchedQty
          };
        }
        return item;
      });

      // Return the updated state
      return {
        ...state,
        order: {
          ...rest,
          items: updatedItems
        }
      };
    }
  },
});


const { actions, reducer } = orderSlice;
export const { SetAOrder, SetAllOrders, updateDispatchedOrder, SetOrderNumberByUser } = actions;
export default reducer;
