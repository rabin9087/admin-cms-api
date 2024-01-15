import { apiProcesser, getAccessJWT, rootAPI } from "../axiosHelper";

const userAPI = rootAPI + '/users';

export const postNewAdmin = (data) => {
    return apiProcesser({
        method: 'post',
        url: userAPI,
        data
    })
}

export const postVerifyEmail = (data) => {
    return apiProcesser({
        method: 'post',
        url: userAPI + "/verify-email",
        data
    })
}

export const postSignIn = (data) => {
    return apiProcesser({
        method: 'post',
        url: userAPI + "/signIn",
        data,
    })
}

export const featchAUser = (data) => {
    return apiProcesser({
        method: 'get',
        url: userAPI,
        data,
        isPrivate: true,
    })
}

export const featchNewAccessJWT = () => {
    return apiProcesser({
        method: 'get',
        url: userAPI + "/get-accessjwt",
        isPrivate: true,
        refreshToken: true
    })
}

export const logOutUser = (_id) => {
    return apiProcesser({
        method: 'post',
        url: userAPI + "/logout",
        data: {
            _id,
            accessJWT: getAccessJWT(),
        }
    })
}
