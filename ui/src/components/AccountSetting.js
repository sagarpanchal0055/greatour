import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/currentUserStore/currentUserActions";
import { updateUserSetting } from "../store/userSettingStore/userSettingActions";

function AccountSetting() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.currentUser);
  const { updateUserLoading, updatedUser, error } = useSelector(
    (state) => state.updatedUser
  );
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [photo, setPhoto] = useState(null);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const photoChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserSetting({ name, email, photo }));
    dispatch(getCurrentUser());
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form className="form form-user-data" onSubmit={submitHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            id="name"
            type="text"
            value={name}
            onChange={nameChangeHandler}
            required="required"
          />
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            className="form__input"
            id="email"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            required="required"
          />
        </div>
        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={`${process.env.REACT_APP_APP_URL}/img/users/${currentUser.photo}`}
            alt="User photo"
          />
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            // value={photo}
            onChange={photoChangeHandler}
            className="form__upload"
          />
          <label htmlFor="photo">Choose new photo</label>
        </div>
        <div className="form__group right">
          <button type="submit" className="btn btn--small btn--green">
            {updateUserLoading ? "Updating..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSetting;
