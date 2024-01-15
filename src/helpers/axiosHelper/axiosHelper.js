import axios from 'axios'
import { featchNewAccessJWT } from './users/userAxios'

export const getAccessJWT = () => {
    return sessionStorage.getItem("accessJWT")
}

export const getRefreshJWT = () => {
    return sessionStorage.getItem("refreshJWT")
}

export const rootAPI = import.meta.env.VITE_ROOT_API
export const apiProcesser = async ({ method, url, data, isPrivate, refreshToken }) => {
    try {
        const token = refreshToken ? getRefreshJWT() : getAccessJWT()
        const headers = {
            Authorization: isPrivate ? token : null
        }
        const resp = await axios({
            method,
            url,
            data,
            headers
        })
        console.log(resp.data)
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