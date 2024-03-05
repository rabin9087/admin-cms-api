import { fetchAllOrders } from "../../helpers/axiosHelper/order/OrderAxios"
import { SetAOrder, SetAllOrders } from "./orderSlice"

export const getAllOrderAction = () => async (dispatch) => {
    const {orders, status} = await fetchAllOrders()
    if(status === 'success'){
        dispatch(SetAllOrders(orders))
    }
}

export const getAOrderAction = (_id) => async (dispatch) => {
    const {orders, status} = await fetchAllOrders(_id)
    console.log(status, orders)
    if(status === 'success'){
        dispatch(SetAOrder(orders))
    }
}