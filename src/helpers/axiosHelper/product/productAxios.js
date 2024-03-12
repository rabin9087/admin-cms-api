import { apiProcesser, rootAPI } from "../axiosHelper";

const productAPI = rootAPI + '/products';

export const fetchAllProducts = (_id) => {
    return apiProcesser({
        method: 'get',
        url: _id ? productAPI + "/" + _id : productAPI,
        isPrivate: true
    })
}

export const postNewProduct = (formData) => {
    return apiProcesser({
        method: 'post',
        url: productAPI,
        data: formData,
        isPrivate: true
    })
}

export const fetchProductsByparentCatId = (data) => {
    return apiProcesser({
        method: 'get',
        url: productAPI + "/parentCatId/" + data,
        isPrivate: true,
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

export const updateAProductStatus = (data) => {
    return apiProcesser({
        method: 'patch',
        url: productAPI,
        data,
        isPrivate: true
    })
}