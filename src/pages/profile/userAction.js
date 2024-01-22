import { featchAUser, featchNewAccessJWT } from "../../helpers/axiosHelper/users/userAxios"
import { setAdmin } from "./userSlice"

export const getUserProfile = () => async (dispatch) => {
    const resp = await featchAUser()
    if (resp?.user) {
        dispatch(setAdmin(resp.user))
    }
}

export const autoLogin = () => async (dispatch) => {
    //check if we have accessJWT, then fetch user
    const accessJWT = sessionStorage.getItem("accessJWT")
    if (accessJWT) {
        return dispatch(getUserProfile())
    }
    const refreshJWT = localStorage.getItem("refreshJWT")
    if (refreshJWT) {
        const token = await featchNewAccessJWT()
        if (token?.accessJWT) {
            sessionStorage.setItem('accessJWT', token.accessJWT)
            dispatch(getUserProfile())
        }
        //get accessJWT 

        //api call 
    }
}