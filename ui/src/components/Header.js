import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/currentUserStore/currentUserActions";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "../UI/Drawer";

function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user: currentUser } = useSelector((state) => state.currentUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
        {/* <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlink:href="img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form> */}
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>

      <div className="header__bars">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <nav className="nav nav--user">
        {currentUser.name && (
          <>
            <button className="nav__el" onClick={logoutHandler}>
              Logout
            </button>
            <Link to="/account" className="nav__el">
              <img
                src={`${process.env.REACT_APP_APP_URL}/img/users/${currentUser.photo}`}
                alt="User photo"
                className="nav__user-img"
              />
              <span>{currentUser.name}</span>
            </Link>
          </>
        )}
        {!currentUser.name && (
          <>
            <Link to={"/login"} className="nav__el">
              Log in
            </Link>
            <Link to={"/signup"} className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
        {/* <button className="nav__el">Log in</button>
        <button className="nav__el nav__el--cta">Sign up</button> */}
      </nav>
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        currentUser={currentUser}
        logoutHandler={logoutHandler}
      />
    </header>
  );
}

export default Header;
