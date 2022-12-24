import axios from "axios";
import * as types from "./actionType";

export const getDataRequest = () => {
	return {
		type: types.GET_DATA_REQUEST,
	};
};
export const getDataSuccess = (payload) => {
	return {
		type: types.GET_DATA_SUCCESS, payload
	};
};
export const getDataFailure = () => {
	return {
		type: types.GET_DATA_FAILURE,
	};
};

export const GettingTheTodosData = (payload) => (dispatch)=> {

	dispatch(getDataRequest())
	let url = `https://todobackend-asac.onrender.com/todo`
	const config = {
		headers:{
			"Authorization": `Bearer ${payload}`
		}
	};
	axios.get(url , config)
	.then((response) => {
		dispatch(getDataSuccess(response.data))
	})  
	.catch(function (error) {
		dispatch(getDataFailure())
	})
}

