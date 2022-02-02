import axios from "axios";
import { token } from "../helpers/token";
export const updateCurrentUser = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("photo", payload.photo);
    const response = await axios(
      `${process.env.REACT_APP_API_URL}/users/updateMe`,
      {
        method: "PATCH",
        headers: {
          Authorization: token(),
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      }
    );

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updatePassword = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/updateMyPassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token(),
        },
        body: JSON.stringify({
          passwordCurrent: payload.currentPassword,
          password: payload.password,
          passwordConfirm: payload.confirmPassword,
        }),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
