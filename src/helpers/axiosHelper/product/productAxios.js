import { apiProcesser, rootAPI } from "../axiosHelper";

const productAPI = rootAPI + '/products';

export const fetchAllProducts = (data) => {

    return apiProcesser({
        method: 'get',
        url: data?._id ? productAPI + "/" + data._id : productAPI + "/" + data?.number,
        isPrivate: true,
        data
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
        url: productAPI + "/parentCatId/" + data.catId,
        isPrivate: true,
        data
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