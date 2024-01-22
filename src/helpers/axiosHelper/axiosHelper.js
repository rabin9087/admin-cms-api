import axios from 'axios'
import { featchNewAccessJWT } from './users/userAxios'

export const getAccessJWT = () => {
    return sessionStorage.getItem("accessJWT")
}

export const getRefreshJWT = () => {
    return localStorage.getItem("refreshJWT")
}

export const rootAPI = import.meta.env.VITE_SERVER_ROOT + "/api/v1"
export const apiProcesser = async ({ method, url, data, isPrivate, refreshToken }) => {
    try {
        const token = refreshToken ? getRefreshJWT() : getAccessJWT()
        const headers = {
            Authorization: isPrivate ? token : null
        }
        console.log(headers)
        const resp = await axios({
            method,
            url,
            data,
            headers
        })

        return resp.data

    } catch (error) {
        console.log(error)
        if (error.response?.data?.message.includes("jwt expired")) {
            const { accessJWT } = await featchNewAccessJWT()

        if (accessJWT) {
            sessionStorage.setItem("accessJWT", accessJWT)
            return apiProcesser({ method, url, data, isPrivate, refreshToken })
        }
        }
        return {
            status: "error",
            message: error.response.data.message
        }
    }
}