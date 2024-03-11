import { toast } from "react-toastify"
import { fetchAllProducts, fetchProductsByparentCatId, postNewProduct, updateAProduct, updateAProductStatus } from "../../helpers/axiosHelper/product/productAxios"
import { setProductList, setSelectedProduct } from "./productSlice"

export const getAllProductsAction = () => async (dispatch) => {
    const { status, products } = await fetchAllProducts()
    if (status === "success") {
        dispatch(setProductList(products))
    }
}

export const getAProductsAction = (_id) => async (dispatch) => {
    const { status, products } = await fetchAllProducts(_id)
    if (status === "success") {
        dispatch(setSelectedProduct(products))
    }
}

export const postAProductAction = (data) => async (dispatch) => {
    console.log(data)
    const pending = postNewProduct(data)
    toast.promise(pending, {
        pending: " Please wait"
    })
    const { status, message } = await pending
    toast[status](message)
    if (status === "success") {
        dispatch(getAllProductsAction())
    }
}

export const updateProductStatusAction = (data) => async (dispatch) => {
    const pending = updateAProductStatus(data) //todo
    toast.promise(pending, {
        pending: " Please wait"
    })
    const { status, message } = await pending
    toast[status](message)
    if (status === "success") {
        dispatch(getAllProductsAction())
    }

}

export const updatedAProductAction = (_id, data) => async (dispatch) => {
    const pending = updateAProduct(data) //todo
    toast.promise(pending, {
        pending: " Please wait"
    })
    const { status, message } = await pending
    toast[status](message)
    if (status === "success") {
        dispatch(getAProductsAction(_id))
    }
}

export const fetchAllCategoriesByparentCatId = (data) => async (dispatch) => {
    const pending = fetchProductsByparentCatId(data)
    toast.promise(pending, {
        pending: "Please wait..."
    })
    const { status, message, products } = await pending
    toast[status](message)
    status === "success" && dispatch(setProductList(products))
}
