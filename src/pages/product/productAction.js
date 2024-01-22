import { toast } from "react-toastify"
import { fetchAllProducts, postNewProduct } from "../../helpers/axiosHelper/product/productAxios"
import { setProductList } from "./productSlice"

export const getAllProductsAction = (data) => async (dispatch) => {
    const { status, products } = await fetchAllProducts(data)
    if (status === "success") {
        dispatch(setProductList(products))
    }
}

export const postAProductAction = (data) => async (dispatch) => {
    const pending = postNewProduct(data)
    toast.promise(pending, {
        pending: " Please wait"
    })
    const {status, message} = await pending
    toast[status](message)
    if (status === "success") {
        dispatch(getAllProductsAction())
    }
}