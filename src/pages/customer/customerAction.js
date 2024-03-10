import { fetchAllAdmins, fetchAllCustomers } from "../../helpers/customers/customers"
import { SetOrderNumberByUser } from "../order/orderSlice"
import { setCustomerList } from "./customerSlice"


export const fetchAllCustomersAction = () => async (dispatch) => {
    const { status, customers, orders } = await fetchAllCustomers()
    if (status === "success") {
        dispatch(setCustomerList(customers))
        dispatch(SetOrderNumberByUser(orders))
    }
}

export const fetchAllAdminAction = () => async (dispatch) => {
    const { status, customers, orders } = await fetchAllAdmins()
    if (status === "success") {
        dispatch(setCustomerList(customers))
        dispatch(SetOrderNumberByUser(orders))
    }
}