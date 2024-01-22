import { apiProcesser, rootAPI } from "../axiosHelper";

const productAPI = rootAPI + '/products';

export const fetchAllProducts = () => {
    return apiProcesser({
        method: 'get',
        url: productAPI,
        isPrivate: true
    })
}

export const postNewProduct = (data) => {
    return apiProcesser({
        method: 'post',
        url: productAPI,
        data,
        isPrivate: true
    })
}