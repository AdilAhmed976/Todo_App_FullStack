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

