import {
  GET_TOUR_DETAILS,
  GET_TOUR_DETAILS_SUCCESS,
  GET_TOUR_DETAILS_FAIL,
} from "./tourTypes";

export const getTour = (tourId) => {
  return {
    type: GET_TOUR_DETAILS,
    payload: tourId,
  };
};

export const getTourSuccess = (tours) => {
  return {
    type: GET_TOUR_DETAILS_SUCCESS,
    payload: tours,
  };
};

export const getTourFail = (error) => {
  return {
    type: GET_TOUR_DETAILS_FAIL,
    payload: error,
  };
};
