import {
  GET_BOOKING_TOURS,
  GET_BOOKING_TOURS_FAIL,
  GET_BOOKING_TOURS_SUCCESS,
} from "./bookingTourTypes";

export const getBookingTours = () => {
  return {
    type: GET_BOOKING_TOURS,
  };
};

export const getBookingToursSuccess = (bookedTours) => {
  return {
    type: GET_BOOKING_TOURS_SUCCESS,
    payload: bookedTours,
  };
};

export const getBookingToursFail = (error) => {
  return {
    type: GET_BOOKING_TOURS_FAIL,
    payload: error,
  };
};
