import { apiProcesser, rootAPI } from "../axiosHelper";

const categoryAPI = rootAPI + '/categories';

export const fetchCategories = () => {
    return apiProcesser({
        method: 'get',
        url: categoryAPI,
        isPrivate: true,
    })
}

export const fetchCategoriesById = (_id) => {
    return apiProcesser({
        method: 'get',
        url: categoryAPI + "/" + _id,
        isPrivate: true,
    })
}

export const updateCategories = (data) => {
    return apiProcesser({
        method: 'put',
        url: categoryAPI,
        isPrivate: true,
        data
    })
}

export const updateCategoriesStatus = (data) => {
    return apiProcesser({
        method: 'patch',
        url: categoryAPI,
        isPrivate: true,
        data
    })
}

export const deleteCategoriesById = (_id) => {
    return apiProcesser({
        method: 'delete',
        url: categoryAPI + "/" + _id,
        isPrivate: true,
    })
}

export const postCategory = (data) => {
    return apiProcesser({
        method: 'post',
        url: categoryAPI,
        isPrivate: true,
        data
    })
}