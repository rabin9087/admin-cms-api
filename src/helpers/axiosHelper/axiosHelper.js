import axios from 'axios'

export const apiProcesser = async ({ method, url, data }) => {
    try {
        const resp = await axios({
            method,
            url,
            data,
        })
        console.log(resp)
        return resp.data

    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: error.response.data.message
        }
    }
}