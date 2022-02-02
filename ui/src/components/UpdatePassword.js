import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../store/updatePasswordStore/updatePasswordActions";

function UpdatePassword() {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const currentPasswordChangeHandler = (e) => {
    setCurrentPassword(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updatePassword({ currentPassword, password, confirmPassword }));

    setCurrentPassword("");
    setConfirmPassword("");
    setPassword("");
  };
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>
      <form className="form form-user-settings" onSubmit={submitHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>
          <input
            className="form__input"
            id="password-current"
            type="password"
            placeholder="••••••••"
            required="required"
            minLength="8"
            value={currentPassword}
            onChange={currentPasswordChangeHandler}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
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
        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>
          <input
            className="form__input"
            id="password-confirm"
            type="password"
            placeholder="••••••••"
            required="required"
            minLength="8"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
          />
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green" type="submit">
            Save password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
