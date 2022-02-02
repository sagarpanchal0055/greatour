import axios from "axios";

export const getTours = async () => {
  try {
    const tours = await axios.get(`${process.env.REACT_APP_API_URL}/tours`);
    return tours.data;
  } catch (err) {
    return err;
  }
};

export const getTour = async (slug) => {
  try {
    const tour = await axios.get(
      `${process.env.REACT_APP_API_URL}/tours/slug/${slug}`
    );
    return tour.data;
  } catch (err) {
    return err;
  }
};
