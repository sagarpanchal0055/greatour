import {
  GET_BOOKING_TOURS,
  GET_BOOKING_TOURS_FAIL,
  GET_BOOKING_TOURS_SUCCESS,
} from "./bookingTourTypes";

const initialState = {
  toursLoading: false,
  bookedTours: [],
  error: {
    message: "",
  },
};

export const bookedTourReducer = (state = initialState, action) => {
  if (action.type === GET_BOOKING_TOURS) {
    return { ...state, toursLoading: true };
  } else if (action.type === GET_BOOKING_TOURS_SUCCESS) {
    return { ...state, toursLoading: false, bookedTours: action.payload };
  } else if (action.type === GET_BOOKING_TOURS_FAIL) {
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
