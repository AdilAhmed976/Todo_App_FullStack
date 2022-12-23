import * as types from './actionTypes'
import axios from 'axios'

export const loginRequest = () => {
    return {
        type:types.LOGIN_REQUEST
    }
}
export const loginSuccess = (payload) => {
    return {
        type:types.LOGIN_SUCCESS,payload
    }
}
export const loginFailure = () => {
    return {
        type:types.LOGIN_FAILURE
    }
}

export const loginCheck = (payload) => (dispatch) => {

    const {email,password} = payload

    dispatch(loginRequest())
    return axios({
        method: 'post',
        url: 'https://todobackend-asac.onrender.com/user/login',
        data: {
            email: email,
            password: password
        }
    })
    .then((r) =>{
        console.log(r.data.token)
    if(r.data.token) {
       return dispatch(loginSuccess(r.data.token))
    }
    else {
       return dispatch(loginFailure())
    }    
}
    // console.log("BID",r.data.token)
     )
    .catch((e) => dispatch(loginFailure()))
    
}


