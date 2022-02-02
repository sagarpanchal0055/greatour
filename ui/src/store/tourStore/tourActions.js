import { GET_TOURS, GET_TOURS_FAIL, GET_TOURS_SUCCESS } from "./tourTypes";

export const getTours = () => {
  return {
    type: GET_TOURS,
  };
};

export const getToursSuccess = (tours) => {
  return {
    type: GET_TOURS_SUCCESS,
    payload: tours,
  };
};

export const getToursFail = (error) => {
  return {
    type: GET_TOURS_FAIL,
    payload: error,
  };
};
