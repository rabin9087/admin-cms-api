import { fetchAllOrders } from "../../helpers/axiosHelper/order/OrderAxios"
import { SetAOrder, SetAllOrders } from "./orderSlice"

export const getAllOrderAction = (data) => async (dispatch) => {
    const { orders, status } = await fetchAllOrders(data)
    if (status === 'success') {
        dispatch(SetAllOrders(orders))
    }
}

export const getAOrderAction = (_id) => async (dispatch) => {
    const { orders, status } = await fetchAllOrders(_id)
    if (status === 'success') {
        dispatch(SetAOrder(orders))
    }
}