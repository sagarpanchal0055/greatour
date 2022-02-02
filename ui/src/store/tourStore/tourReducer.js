import { GET_TOURS, GET_TOURS_FAIL, GET_TOURS_SUCCESS } from "./tourTypes";

const initialState = {
  toursLoading: false,
  tours: {},
  error: {
    message: "",
  },
};

export const tourReducer = (state = initialState, action) => {
  if (action.type === GET_TOURS) {
    return { ...state, toursLoading: true };
  } else if (action.type === GET_TOURS_SUCCESS) {
    return { ...state, toursLoading: false, tours: action.payload };
  } else if (action.type === GET_TOURS_FAIL) {
    return {
      ...state,
      toursLoading: false,
      error: {
        message: action.payload,
      },
    };
  } else {
    return state;
  }
};
