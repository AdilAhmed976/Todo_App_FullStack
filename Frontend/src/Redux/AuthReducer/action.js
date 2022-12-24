import * as types from './actionTypes'
import axios from 'axios'

export const loginRequest = () => {
    return {
        type: types.LOGIN_REQUEST
    }
}
export const loginSuccess = (payload) => {
    return {
        type: types.LOGIN_SUCCESS, payload
    }
}
export const loginFailure = () => {
    return {
        type: types.LOGIN_FAILURE
    }
}

export const signupRequest = () => {
    return {
        type: types.SIGNUP_REQUEST
    }
}
export const signupSuccess = (payload) => {
    return {
        type: types.SIGNUP_SUCCESS, payload
    }
}
export const signupFailure = () => {
    return {
        type: types.SIGNUP_FAILURE
    }
}

export const logOutSuccess = () => {
    return {
        type: types.LOGOUT
    }
}

export const loginCheck = (payload) => (dispatch) => {

    const { email, password } = payload
    dispatch(loginRequest())
    return axios({
        method: 'post',
        url: 'https://todobackend-asac.onrender.com/user/login',
        data: {
            email: email,
            password: password
        }
    })
    .then((r) => {
        console.log(r.data.token)
        if (r.data.token) {
            return dispatch(loginSuccess(r.data.token))
        }
        else {
            return dispatch(loginFailure())
        }
    })
    .catch((e) => dispatch(loginFailure()))
}

export const logOutTheUser = () => (dispatch) => {
    dispatch(logOutSuccess())
    localStorage.removeItem("token");
}

export const signupCheck = (payload) => (dispatch) => {

    const { email, password } = payload

    dispatch(signupRequest())
    return axios({
        method: 'post',
        url: 'https://todobackend-asac.onrender.com/user/signup',
        data: {
            email: email,
            password: password
        }
    })
    .then((r) => {
        if (r.data.msg === "Signup Successfull") {
            return dispatch(signupSuccess())
        }
        else {
            return dispatch(signupFailure())
        }
    }
    )
    .catch((e) => dispatch(signupFailure()))
}


