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

export const requestOTP = (email) => {
    return apiProcesser({
        method: 'post',
        url: userAPI + "/request-otp",
        data: {
            email
        }
    })
}

export const resetPassword = (data) => {
    return apiProcesser({
        method: 'patch',
        url: userAPI,
        data
    })
}

export const updatePassword = (data) => {
    return apiProcesser({
        method: 'patch',
        url: userAPI + "/password",
        isPrivate: true,
        data
    })
}

