import { toast } from "react-toastify"
import { fetchCategories, fetchCategoriesById, postCategory, updateCategories, updateCategoriesStatus } from "../../helpers/axiosHelper/category/categoryAxiso"
import { setCatList, setCategory } from "./categorySlice"

export const getAllCategoriesAction = () => async (dispatch) => {
    const { status, categories } = await fetchCategories()
    if (status === "success") {
        dispatch(setCatList(categories))
    }
}

export const getAllCategoriesByIdAction = (_id) => async (dispatch) => {
    const { status, categories } = await fetchCategoriesById(_id)
    if (status === "success") {
        dispatch(setCategory(categories))
    }
}

export const updateCategoriesAction = (data) => async (dispatch) => {
    const { status, categories } = await updateCategories(data)
    if (status === "success") {
        dispatch(setCategory(categories))
    }
}

export const updateCategoriesStatusAction = (data) => async (dispatch) => {
    const { status } = await updateCategoriesStatus(data)
    if (status === "success") {
        dispatch(getAllCategoriesAction())
    }
}



export const postNewCategoryAction = (data) => async (dispatch) => {

    const pending = postCategory(data)
    toast.promise(pending, {
        pending: "Please wait..."
    })
    const { status, message } = await pending
    toast[status](message)
    status === "success" && dispatch(getAllCategoriesAction())
}