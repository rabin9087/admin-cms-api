import { apiProcesser, rootAPI } from "../axiosHelper";

const orderAPI = rootAPI + '/orders';

export const fetchAllOrders = (data) => {
    return apiProcesser({
        method: 'get',
        url: typeof (data) === "string" ? orderAPI + "/" + data : orderAPI + "/skip/" + data?.number,
        isPrivate: true
    })
}

export const updateDeliveryStatus = (orderID, data) => {
    return apiProcesser({
        method: 'put',
        url: orderAPI + "/" + orderID,
        data,
        isPrivate: true
    })
}
