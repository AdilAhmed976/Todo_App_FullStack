import axios from "axios";
import * as types from "./actionType";
import { getLocalData } from "../../utils/localStorage";
//All Data
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

//Todays Data
export const getTodayDataRequest = () => {
	return {
		type: types.GET_TODAY_DATA_REQUEST,
	};
};
export const getTodayDataSuccess = (payload) => {
	return {
		type: types.GET_TODAY_DATA_SUCCESS, payload
	};
};
export const getTodayDataFailure = () => {
	return {
		type: types.GET_TODAY_DATA_FAILURE,
	};
};

//Filtered Data
export const getFilteredDataRequest = () => {
	return {
		type: types.GET_FILTERED_DATA_REQUEST,
	};
};
export const getFilteredDataSuccess = (payload) => {
	return {
		type: types.GET_FILTERED_DATA_SUCCESS, payload
	};
};
export const getFilteredDataFailure = () => {
	return {
		type: types.GET_FILTERED_DATA_FAILURE,
	};
};

// All data Request 
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

/// todays data 
export const GettingTodaysTodosData = (payload) => (dispatch)=> {

	const date = new Date();
	let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

	dispatch(getTodayDataRequest())
	let url = `https://todobackend-asac.onrender.com/todo/today?day=${currentDate}`
	const config = {
		headers:{
			"Authorization": `Bearer ${payload}`
		}
	};
	return axios.get(url , config)
	.then((response) => {

	return	dispatch(getTodayDataSuccess(response.data))
	})  
	.catch(function (error) {
	return	dispatch(getTodayDataFailure())
	})
}

//filtered Todos Data
export const GettingFilteredTodosData = (payload) => (dispatch)=> {
	const {start,end} = payload

	dispatch(getFilteredDataRequest())
	let url = `https://todobackend-asac.onrender.com/todo/filters?start=${start}&end=${end}`
	const config = {
		headers:{
			"Authorization": `Bearer ${getLocalData("token")}`
		}
	};
	axios.get(url , config)
	.then((response) => {
		console.log("RESPONSE",response.data)
		dispatch(getFilteredDataSuccess(response.data))
	})  
	.catch(function (error) {
		dispatch(getFilteredDataFailure())
	})
}

