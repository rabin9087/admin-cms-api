import { apiProcesser, rootAPI } from "../axiosHelper";

const productAPI = rootAPI + '/products';

export const fetchAllProducts = (_id) => {
    return apiProcesser({
        method: 'get',
        url: _id ? productAPI +"/" + _id : productAPI,
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

export const updateAProduct = (data) => {
    return apiProcesser({
        method: 'put',
        url: productAPI,
        data,
        isPrivate: true
    })
   
}