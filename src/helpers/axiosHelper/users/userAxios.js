import { apiProcesser } from "../axiosHelper";

const rootAPI = import.meta.env.VITE_ROOT_API
const userAPI = rootAPI + '/users';

export const postNewAdmin = (data) => {
    return apiProcesser({
        method: 'post',
        url: userAPI,
        data
    })
}

export const postverifyEmail = (data) => {
    return apiProcesser({
        method: 'post',
        url: userAPI + "/verify-email",
        data
    })
}