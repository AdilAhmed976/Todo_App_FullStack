import * as types from "./actionType";

const initialState = {
	isLoading: false,
	isError: false,
	todoData: [],
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
	
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
			};

		case types.GET_DATA_FAILURE:
			return {
				...state,
				isError: false,
			};

		
		default:
			return state;
	}
};

export { reducer };
