import {
  GET_TOUR_DETAILS,
  GET_TOUR_DETAILS_FAIL,
  GET_TOUR_DETAILS_SUCCESS,
} from "./tourTypes";

const initialState = {
  tourLoading: false,
  tour: {},
  error: {
    message: "",
  },
};

export const singleTourReducer = (state = initialState, action) => {
  if (action.type === GET_TOUR_DETAILS) {
    return { ...state, tourLoading: true };
  } else if (action.type === GET_TOUR_DETAILS_SUCCESS) {
    return { ...state, tourLoading: false, tour: action.payload };
  } else if (action.type === GET_TOUR_DETAILS_FAIL) {
    return {
      ...state,
      tourLoading: false,
      error: {
        message: action.payload,
      },
    };
  } else {
    return state;
  }
};
