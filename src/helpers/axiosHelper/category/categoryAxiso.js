import { apiProcesser, rootAPI } from "../axiosHelper";

const categoryAPI = rootAPI + '/categories';

export const fetchCategories = () => {
    return apiProcesser({
        method: 'get',
        url: categoryAPI,
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