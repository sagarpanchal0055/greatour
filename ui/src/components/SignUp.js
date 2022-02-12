import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singup } from "../store/signupStore/singupActions";

function SignUp() {
  const dispatch = useDispatch();
  const { error, user, signupLoading } = useSelector((state) => state.signup);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmChangeHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(singup({ name, email, password, passwordConfirm }));

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">
          Sign up to create your account
        </h2>
        <form className="form" onSubmit={submitHandler}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Full Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder="you@example.com"
              required="required"
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password Confirm
            </label>
            <input
              className="form__input"
              id="password Confirm"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={passwordConfirm}
              onChange={passwordConfirmChangeHandler}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">
              {signupLoading ? "Signin up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
