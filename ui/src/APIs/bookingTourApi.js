import axios from "axios";
import { toast } from "react-toastify";
import { token } from "../helpers/token";

export const getBookedTours = async () => {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/bookings/getMyBookedTours`,
      headers: { Authorization: token() },
    });
    return response.data.bookedTours;
  } catch (e) {
    return e;
  }
};

export const checkoutSession = async (tourId) => {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/bookings/checkout-session/${tourId}`,
      headers: { Authorization: token() },
    });
    if (response.data.session.url) {
      window.location.assign(response.data.session.url);
    }
  } catch (e) {
    toast.error(<p>Something went wrong!</p>);
  }
};

export const addBookedTourData = async (bookingData) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/bookings/createBooking`,
      headers: { Authorization: token() },
      data: bookingData,
    });

    return response.data.status;
  } catch (e) {
    toast.error(<p>Something went wrong!</p>);
  }
};
