import { apiProcesser, rootAPI } from "../axiosHelper/axiosHelper";



const customerAPI = rootAPI + '/customers';

export const fetchAllCustomers = (_id) => {
    return apiProcesser({
        method: 'get',
        url: _id ? customerAPI + "/" + _id : customerAPI + "/user",
        isPrivate: true
    })
}

export const fetchAllAdmins = (_id) => {
    return apiProcesser({
        method: 'get',
        url: _id ? customerAPI + "/" + _id : customerAPI + "/admin",
        isPrivate: true
    })
}

export const postNewProduct = (data) => {
    return apiProcesser({
        method: 'post',
        url: customerAPI,
        data,
        isPrivate: true
    })
}

export const updateCustomerStatus = (data) => {
    return apiProcesser({
        method: 'patch',
        url: customerAPI,
        data,
        isPrivate: true
    })
}