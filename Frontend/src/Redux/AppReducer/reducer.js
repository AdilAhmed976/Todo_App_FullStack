import * as types from "./actionType";

const initialState = {
	isLoading: false,
	isError: false,
	todoData: [],
	filteredData: [],
	todayData:[]
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
	// All Data
		case types.GET_DATA_REQUEST:
			return {
				...state,
				isLoading: true,
				isError: false,
			};

		case types.GET_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				todoData: payload,
				filteredData:payload
			};

		case types.GET_DATA_FAILURE:
			return {
				...state,
				isError: false,
			};

			// Today Data 
		case types.GET_TODAY_DATA_REQUEST:
			return {
				...state,
				isLoading: true,
				isError: false,
			};

		case types.GET_TODAY_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				todayData: payload,
			};

		case types.GET_TODAY_DATA_FAILURE:
			return {
				...state,
				isError: false,
			};


			// FILTERED Data 
		case types.GET_FILTERED_DATA_REQUEST:
			return {
				...state,
				isLoading: true,
				isError: false,
			};

		case types.GET_FILTERED_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				filteredData: payload,
			};

		case types.GET_FILTERED_DATA_FAILURE:
			return {
				...state,
				isError: false,
			};

		
		default:
			return state;
	}
};

export { reducer };
