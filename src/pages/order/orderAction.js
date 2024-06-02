import { fetchAllOrders } from "../../helpers/axiosHelper/order/OrderAxios"
import { SetAOrder, SetAllOrders, setOrderLength } from "./orderSlice"

export const getAllOrderAction = (data) => async (dispatch) => {
    const { orders, status, orderLength } = await fetchAllOrders(data)
    if (status === 'success') {
        dispatch(SetAllOrders(orders))
        dispatch(setOrderLength(orderLength))
    }
}

export const getAOrderAction = (_id) => async (dispatch) => {
    const { orders, status } = await fetchAllOrders(_id)
    if (status === 'success') {
        dispatch(SetAOrder(orders))
    }
}