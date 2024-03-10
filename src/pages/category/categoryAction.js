import { toast } from "react-toastify"
import { fetchCategories, fetchCategoriesById, postCategory } from "../../helpers/axiosHelper/category/categoryAxiso"
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

export const postNewCategoryAction = (data) => async (dispatch) => {

    const pending = postCategory(data)
    toast.promise(pending, {
        pending: "Please wait..."
    })
    const { status, message } = await pending
    toast[status](message)
    status === "success" && dispatch(getAllCategoriesAction())
}