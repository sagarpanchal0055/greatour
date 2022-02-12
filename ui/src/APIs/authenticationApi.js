import { token } from "../helpers/token";

export const loginHandler = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const signupHandler = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
          passwordConfirm: payload.passwordConfirm,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const fetchCurrentUser = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token(),
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
